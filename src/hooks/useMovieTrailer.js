import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (id) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
      const movieURL = "https://api.themoviedb.org/3/movie/"+id+"/videos?language=en-US";
      const data = await fetch(movieURL, API_OPTIONS);
      const json = await data.json();
      console.log("Movies Videos: ", json.results);
      const videos = json.results.filter((video) => video.type === "Trailer");
      const trailer = videos.length > 0 ? videos[0] : json.results[0];
      dispatch(addMovieTrailer(trailer));
    }
    catch(error) {
      console.log("Error fetching movie trailer:", error);
    }
  };

  
  useEffect(() => {
    getMovieVideos();
  }, []);
}

export default useMovieTrailer;