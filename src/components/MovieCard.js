import { POSTER_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({movie}) => {
  if(!movie.poster_path)
    return null;

  return (
    <Link to={`watch/${movie.id}`}>
      <div className="bg-gradient-to-r from-white w-[6rem] sm:w-[8rem] md:w-[9rem] lg:w-[10rem] mx-2 transform transition-transform duration-500 ease-in-out hover:scale-90">
        <img 
          alt="MoviePoster" 
          src= {POSTER_CDN_URL + movie?.poster_path}
          className="object-cover w-full h-full rounded-md"
        ></img>
      </div>
    </Link>
  )
}

export default MovieCard;