
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async() => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addUpcomingMovies(json?.results));
    }
    catch(error) {
      console.log("Error fetching upcoming movies: " + error);
    }
  }

  useEffect(() => {
    getPopularMovies();
  }, []);
}

export default useUpcomingMovies;