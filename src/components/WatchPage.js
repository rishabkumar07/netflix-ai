import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../utils/constants";
import {ClipLoader} from "react-spinners";

const WatchPage = () => {
  const { id } = useParams();
  const [movieKey, setMovieKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(id) {
      getMovieTrailer(id);
    }
  }, [id]);

  const getMovieTrailer = async(movieId) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );

      const json = await data.json();
      const trailerData = json.results.filter((video) => video.type === "Trailer");
      const trailer = trailerData.length > 0 ? trailerData[0] : json.results[0];
      setMovieKey(trailer?.key || "");
    }
    catch (error) {
      console.log("Error fetching movie videos:", error);
    }
    finally {
      setLoading(false);
    }
  }

  return(
    <div className="bg-black">
      <div className="flex flex-between justify-between items-center w-full bg-black absolute py-4 z-10">
        <Link to="/browse">
          <img 
            className="w-[7rem] lg:w-[10rem] brightness-100 contrast-150 ml-10" 
            src= {Logo} 
            alt="Netflix Logo"
          />
        </Link>
        <Link to="/browse">
          <button className="text-white text-md hover:border hover:rounded-lg mt-[1rem] py-1 px-3 mr-10">
            Back
          </button>
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="white" size={50} />
        </div>
      ) : movieKey ? (
        <iframe
        className="w-screen h-screen"
        src={`https://www.youtube.com/embed/${movieKey}?rel=0&autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        ></iframe>
      ) : (
        <div className="flex justify-center items-center h-screen text-white">
          No trailer available
        </div>
      )}
    </div>
  )
};

export default WatchPage;
