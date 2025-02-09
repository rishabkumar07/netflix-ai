import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userQuery } = req.body;

  if (!userQuery) {
    return res.status(400).json({ error: "Query is required" });
  }

  const prompt = `You are a movie recommendation system. Respond strictly with ONLY 5 well-known, complete movie titles related to: "${userQuery}". 
      Note       
      - DO NOT include any extra text or explanations, hyphens or bullet points.
      - Ensure ALL titles are complete and accurate without truncation.
      - Strictly list only 5 movies without any explanation;
      
      Format your response EXACTLY like this:
        Movie 1: Movie Name
        Movie 2: Movie Name
        Movie 3: Movie Name
        Movie 4: Movie Name
        Movie 5: Movie Name`;

  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-light",
        prompt: prompt,
        max_tokens: 50,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      throw new Error(`Cohere API Error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({ movies: data });
  } 
  catch (error) {
    console.error("Error fetching movie suggestions:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};
