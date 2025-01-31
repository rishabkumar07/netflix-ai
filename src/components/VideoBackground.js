import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({id}) => {
  useMovieTrailer(id);
  const movieTrailer = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div className="pt-10 lg:pt-0">
      <iframe  
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${movieTrailer?.key}
          ?rel=0
          &autoplay=1
          &controls=0
          &mute=1
          &disablekb=1
          &loop=1
          &modestbranding=1
          &playlist=${movieTrailer?.key}
          &iv_load_policy=3
          &fs=0
        `.replace(/\s+/g, "")}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default VideoBackground;