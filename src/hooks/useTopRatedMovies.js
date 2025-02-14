
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async() => {
    try{
      const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addTopRatedMovies(json?.results));
    }
    catch(error) {
      console.log("Unable to fetch top rated movies: " + error)
    };
  }

  useEffect(() => {
    getPopularMovies();
  }, []);
}

export default useTopRatedMovies;