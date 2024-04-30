import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div>
      <MovieList title = {"Now Playing"} list= {movies?.nowPlaying}/>
      <MovieList title = {"Popular"} list= {movies?.nowPlaying}/>
      <MovieList title = {"Top Rated"} list= {movies?.nowPlaying}/>
      <MovieList title = {"Upcoming"} list= {movies?.nowPlaying}/>
    </div>
  )
}

export default SecondaryContainer