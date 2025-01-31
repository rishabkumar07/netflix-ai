import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlaying);
  if (!movies)
    return <div>Loading...</div>;

  if (movies.length === 0) {
    return <div>No movies available</div>;
  }

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  return (
    <div>
      <VideoTitle title = {original_title} overview = {overview} id={id} />
      <VideoBackground id = {id}/>
    </div>
  )
}

export default MainContainer