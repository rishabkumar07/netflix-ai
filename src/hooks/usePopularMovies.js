
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async() => {
    try{
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=2', API_OPTIONS);
      const json = await data.json();
      console.log(json);
      dispatch(addPopularMovies(json?.results));
    }
    catch(error) {
      console.log("Unable to fetch popular movies: " + error);
    };
  }

  useEffect(() => {
    getPopularMovies();
  }, []);
}

export default usePopularMovies;