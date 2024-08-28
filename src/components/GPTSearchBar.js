import { useSelector } from "react-redux";
import language from "../utils/languageConstants";

const GPTSearchBar = ()=> {
  const selectedLangKey = useSelector((store) => store.config.lang);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className=" w-1/2 bg-black grid grid-cols-12">
        <input type="text" placeholder={language[selectedLangKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9"></input>
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">{language[selectedLangKey].search}</button>
      </form>
    </div>
  )
};

export default GPTSearchBar;