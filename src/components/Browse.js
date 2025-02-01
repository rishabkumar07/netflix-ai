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
import ErrorPage from "./ErrorPage";

const Browse = () => {
  const showGPTSearchView = useSelector((store) => store.gpt.showGPTSearchView);
  const isLoadingOrErrorState = useSelector((store) => store.movies.loadingOrErrorState);
  
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  if (isLoadingOrErrorState) return <ErrorPage />;

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