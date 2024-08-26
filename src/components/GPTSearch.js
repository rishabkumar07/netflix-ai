import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestion from "./GPTMovieSuggestion";
import { LoginPageBgImage } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src={LoginPageBgImage} alt="bg-pic"></img>
      </div>
      <GPTSearchBar/>
      <GPTMovieSuggestion/>
    </div>
  )
}

export default GPTSearch;