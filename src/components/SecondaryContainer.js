import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black">
      <div className="-mt-56 pl-12 relative z-20">
        <MovieList title = {"Now Playing"} list= {movies?.nowPlaying}/>
        <MovieList title = {"Popular"} list= {movies?.popular}/>
        <MovieList title = {"Top Rated"} list= {movies?.topRated}/>
        <MovieList title = {"Upcoming"} list= {movies?.upcoming}/>
      </div>
      
    </div>
  )
}

export default SecondaryContainer