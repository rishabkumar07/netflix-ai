import MainHeader from "./MainHeader";
import AuthComponent from "./AuthComponent";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <AuthComponent />
      <MainHeader />
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse