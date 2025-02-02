import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestion from "./GPTMovieSuggestion";
import { LoginPageBgImage } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div className="bg-black">
      <GPTSearchBar/>
      <GPTMovieSuggestion/>
    </div>
  )
}

export default GPTSearch;