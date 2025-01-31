import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black pt-5 lg:pt-0 lg:-mt-[14rem] w-full">
      <MovieList title = {"Now Playing"} list= {movies?.nowPlaying}/>
      <MovieList title = {"Popular"} list= {movies?.popular}/>
      <MovieList title = {"Top Rated"} list= {movies?.topRated}/>
      <MovieList title = {"Upcoming"} list= {movies?.upcoming}/>      
    </div>
  )
}

export default SecondaryContainer