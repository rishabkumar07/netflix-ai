import MainHeader from "./MainHeader";
import AuthComponent from "./AuthComponent";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGPTSearchView = useSelector((store) => store.gpt.showGPTSearchView);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <AuthComponent />
      <MainHeader />
      {showGPTSearchView ? <GPTSearch/> : (
        <div>
          <MainContainer />
          <SecondaryContainer />
        </div>
      )} 
    </div>
  )
}

export default Browse