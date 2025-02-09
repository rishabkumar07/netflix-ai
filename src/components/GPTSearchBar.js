import { useSelector, useDispatch } from "react-redux";
import language from "../utils/languageConstants";
import { useState, useRef, useEffect } from "react";
import { addGptMovies, showError } from "../utils/gptSlice";
import { API_OPTIONS, LoginPageBgImage } from "../utils/constants";
import GPTLoader from "./GPTLoader";

const GPTSearchBar = ()=> {
  const selectedLangKey = useSelector((store) => store.config.lang);
  const errorMessage = useSelector((store) => store.gpt.error);
  const movieResults = useSelector((store) => store.gpt.movieResults);
  const searchText = useRef(null);
  const resultsRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  useEffect(() => {
    if (hasResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [hasResults]);

  const handleSubmit = (e) => {
    e.preventDefault();
    gptSearchClickHandler();
  };

  const getMoviesTMDB = async (movie) => {
    try 
    {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    }
    catch (error)
    {
      console.error("Error fetching from TMDB:", error);
      return [];
    }
  };

  const fetchMovieNamesAI = async (prompt) => {
    try
    {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/generate-movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userQuery: prompt
        }),
      });

      if (!response.ok) 
        throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const rawText = data.movies?.generations[0].text;
      const lines = rawText.split('\n');

      const movieList = lines
      .map(line => {
        const trimmedLine = line.replace(/^\d+[\.\:\-]?\s*/, "").trim();
        if (trimmedLine.length > 2 && !trimmedLine.match(/^\d+$/)) {
          return trimmedLine;
        }
        return null;
      })
      .filter(title => title !== null)
      .slice(0, 5);
      return movieList;
    } 
    catch (error) 
    {
      console.error("Error fetching movie suggestions:", error);
      return [];
    }
  }

  const gptSearchClickHandler = async () => {
    try {
      dispatch(showError(""));
      setLoading(true);
      setHasResults(false);

      const userQuery = searchText.current.value.trim();
      if (!userQuery) 
      {
        dispatch(showError("Please enter a search query"));
        return;
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
        Movie 5: Movie Name`

      const gptResult = await fetchMovieNamesAI(prompt);
      if (gptResult.length !== 5) 
        throw new Error("Invalid response format from AI");

      const cleanedMovieTitles = gptResult.map((title) => {
        return title.replace(/^Movie\s*\d+:\s*/i, "").trim();
      });

      const promiseArray = cleanedMovieTitles.map(async (movieName) => {
        const results = await getMoviesTMDB(movieName);
        const exactMatch = results.find((movie) =>
          movie.title.toLowerCase() === movieName.toLowerCase()
        );

        return exactMatch ? [exactMatch] : results.slice(0, 3);
      });

      const tmdbResults = await Promise.all(promiseArray);
      dispatch(
        addGptMovies({ 
          movieNames: cleanedMovieTitles, 
          movieResults: tmdbResults 
        })
      );
      setHasResults(true);
    } 
    catch (error) {
      console.error("Error: ", error);
      dispatch(showError(error.message || "Failed to get recommendations"));
    } 
    finally {
      setLoading(false);
    }
  };


  return (
    <div 
      className="text-white pt-[10rem] min-h-screen bg-cover relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${LoginPageBgImage})`,
      }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-8 px-4 text-center">
        {language[selectedLangKey].gptHeading}
      </h1>
      <form 
        className="m-1 lg:m-2 p-1 lg:p-2 flex justify-center mb-[2rem] lg:mb-[5rem]"
        onSubmit={handleSubmit}
      >
        <input 
          ref={searchText}
          type="text" 
          placeholder={language[selectedLangKey].gptSearchPlaceholder}
          className="p-4 text-white placeholder-white text-md sm:text-md md:text-lg lg:text-2xl m-1 w-[65%] sm:w-[50%] md:w-[50%] lg:w-[45%] bg-blue-300 bg-opacity-20 rounded-md border-2"
        />
        <button 
          type="submit"
          className="bg-red-700 hover:contrast-100 contrast-150 font-bold p-4 m-1 text-lg lg:text-2xl rounded-md text-white content-center"
          disabled={loading}
        >
          {language[selectedLangKey].search}
        </button>
      </form>

      {loading && (
        <div className="flex justify-center mt-4">
        <GPTLoader />
        </div>
      )}

      {!movieResults && errorMessage && (
        <div className="flex justify-center">
          <h1 className="text-white p-2 m-2 w-fit text-center font-bold items-center text-md lg:text-xl">
            {language[selectedLangKey].gptError}
          </h1>
        </div>
      )}

      <div ref={resultsRef}></div>
    </div>
  )
};

export default GPTSearchBar;