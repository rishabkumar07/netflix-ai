import { POSTER_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({movie}) => {
  if(!movie.poster_path) {
    return (
      <div className="w-[6rem] sm:w-[8rem] md:w-[9rem] lg:w-[10rem] mx-2 bg-gray-800 rounded-md flex items-center justify-center">
        <p className="text-white text-center text-sm">No Image</p>
      </div>
    );
  }

  return (
    <Link to={`watch/${movie.id}`}>
      <div className="bg-gradient-to-r from-white w-[6rem] sm:w-[8rem] md:w-[9rem] lg:w-[10rem] mx-2 transform transition-transform duration-500 ease-in-out hover:scale-90">
        <img 
          alt={`Poster for ${movie.title}`} 
          src= {POSTER_CDN_URL + movie?.poster_path}
          className="object-cover w-full h-full rounded-md"
          loading="lazy"
        ></img>
      </div>
    </Link>
  )
}

export default MovieCard;