import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const VideoTitle = ({title, overview, id}) => {
  const handleScroll = () => {
    window.scrollBy({ 
      top: window.innerHeight, 
      behavior: "smooth" 
    });
  };

  return (
    <div className="ml-2 lg:ml-10 mt-[19%] sm:mt-[16%] md:mt-[15%] lg:mt-[11%] absolute z-10">
      <h1 className="font-bold text-lg sm:text-2xl md:text-4xl lg:text-5xl m-3 text-white">
        { title }
      </h1>
      <p className="text-[7px] sm:text-[12px] md:text-[14px] lg:text-lg w-[50%] lg:w-[35%] 
          text-justify m-3 text-white line-clamp-4 overflow-hidden">
        {overview}
      </p>
        <Link to={`/browse/watch/${id}`}>
          <button className="bg-white w-[3rem] sm:w-[5rem] md:w-[7rem] lg:w-32 p-1 md:p-2 lg:p-3 mx-3 my-0 lg:my-4 font-bold rounded text-xs sm:text-md md:text-lg lg:text-lg hover:bg-opacity-80">
            <FontAwesomeIcon
              icon={faPlay}
              className="mr-1 sm:mr-2 md:mr-2 lg:mr-3 text-xs sm:text-md md:text-lg lg:text-xl"
            />
            Play
          </button>
        </Link>
        <button 
          className="bg-zinc-600 w-[5rem] sm:w-[5rem] md:w-[8rem] lg:w-[9rem] p-1 md:p-2 lg:p-3 my-0 sm:my-2 md:my-2 lg:my-4 font-bold text-white rounded text-xs sm:text-md md:text-lg lg:text-lg bg-opacity-70 hover:bg-opacity-50"
          onClick={handleScroll}
        >
          See More
          <FontAwesomeIcon
            icon={faAngleDown}
            className="pl-1 lg:pl-2 text-xs sm:text-md md:text-lg lg:text-xl"
          />
        </button>
    </div>
  )
}

export default VideoTitle;