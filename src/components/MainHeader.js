import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Logo, ProfileLogo1 } from "../utils/constants";
import { useState } from "react";
import { toggleGPTSearch } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGE } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const MainHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearchView);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src= {Logo} alt="Netflix Logo"/>
      <div className="relative flex p-2 justify-between">
        {showGPTSearch && (
          <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGE.map((lang) => 
              <option value={lang.identifier} key={lang.identifier}>{lang.name}</option>
            )}
          </select>
        )}
          <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
             onClick={handleGptSearchClick}
          >{showGPTSearch ? "Home" : "GPT Search"}</button>
        <div className="flex items-center p-2 ml-1 mr-1 cursor-pointer" onMouseEnter={() => setIsDropdownOpen(true)}>
          <img className="w-12 h-12 rounded" alt="usericon" src={user && user.photoURL ? user.photoURL : ProfileLogo1} />
          <svg className={`w-5 h-5 ml-2 text-white transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div onMouseLeave={()=> setIsDropdownOpen(false)}  className={`absolute right-0 mt-16 w-48 bg-black text-white rounded-lg shadow-lg transition-opacity duration-200 
          ${isDropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className="px-4 py-2 border-b border-gray-700">
            {user && user.displayName ? user.displayName : "Guest User"}
          </div>
          <button onClick={handleSignOut} className="w-full text-left px-4 py-2 hover:bg-gray-700">
            {user.isAnonymous ? "Sign In" : "Sign Out"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainHeader;