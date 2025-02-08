import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/generate-movies", async (req, res) => {
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
    res.json({ movies: data });
  } 
  catch (error) {
    console.error("Error fetching movie suggestions:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
