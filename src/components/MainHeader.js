import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Logo, ProfileLogo1 } from "../utils/constants";
import { toggleGPTSearch } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGE } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
import searchAiLogo from "../assets/icons/gemini-icon.png";
import { LinkedInProfile } from "../utils/constants";

const MainHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearchView);
  const currentLang = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
    });
  }

  const handleGptSearchClick = () => {
    dispatch(toggleGPTSearch());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return user && (
    <div 
      className={`flex justify-between items-start absolute z-10 w-full bg-black lg:bg-transparent pb-2 lg:pb-0 lg:pt-4 ${
        showGPTSearch ? "gpt-header" : "default-header"
      }`}
    >
      <img 
        className="w-[5rem] lg:w-[10rem] brightness-100 contrast-150 ml-3 mt-1 lg:mt-0 lg:ml-10" 
        src= {Logo} 
        alt="Netflix Logo"
      />

      <div 
        className="flex items-center mt-4 mr-2 lg:mr-10 lg:mt-0 space-x-0 lg:space-x-3 pt-2 lg:pr-4">
        {!showGPTSearch && (
          <>
            <h1 className="hidden lg:inline-block text-white text-sm px-4">
              Hello, {user && user.displayName ? 
                user.displayName.split(" ")?.filter((word) => word)[0]
                : "Guest User"}
            </h1>
                
            <button 
              className="text-xs lg:text-sm mx-6 p-1 lg:p-2 text-white hover:border hover:rounded-lg"
              onClick={handleGptSearchClick}
            >
              <img className="w-4 lg:w-6 inline-flex" src={searchAiLogo} alt="aiLogo" />{" "}
                AI Search
            </button>

            <button 
              onClick={handleSignOut} 
              className="text-xs lg:text-sm  hover:border hover:rounded-lg py-1 lg:py-2 px-2 lg:px-4 -mt-1  text-white">
              {user.isAnonymous ? "Log In" : "Log Out"}
            </button>

            <div className="flex items-center px-2 ml-1 mr-1 hover:cursor-pointer">
              <a href={LinkedInProfile} target="_blank" rel="noopener noreferrer">
                <img className="w-12 h-12 rounded" alt="usericon" src={user && user.photoURL ? user.photoURL : ProfileLogo1} />
              </a>
            </div>
          </>
        )}

        {showGPTSearch && (
          <>
            <select 
              className="text-white p-1 lg:p-2 bg-transparent hover:border hover:rounded-lg mr-5 lg:mr-10 text-xs lg:text-[1rem] cursor-pointer" 
              onChange={handleLanguageChange}
              value={currentLang}
            >
              {SUPPORTED_LANGUAGE.map((lang) => 
                <option 
                  value={lang.identifier} 
                  key={lang.identifier}
                  className="text-black text-xs lg:text-[1rem] cursor-pointer"
                >
                  {lang.name}
                </option>
              )}
            </select>

            <button
              onClick={handleGptSearchClick}
              className="text-white text-xs lg:text-[1rem] hover:border hover:rounded-lg py-1 lg:py-2 px-3"
            >
              Home
            </button>
          </>
        )}        
      </div>
    </div>
  )
}

export default MainHeader;