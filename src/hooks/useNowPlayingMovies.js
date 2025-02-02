
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies, addLoadingOrErrorState } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async() => {
    try{
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addNowPlayingMovies(json?.results));
      dispatch(addLoadingOrErrorState(false));
    }
    catch(error) {
      console.log("Unable to fetch now playing movies: " + error);
      dispatch(addLoadingOrErrorState(true));
    };
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
}

export default useNowPlayingMovies;