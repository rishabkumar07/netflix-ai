import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Logo, ProfileLogo1 } from "../utils/constants";
import { useState } from "react";

const MainHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
    });
  }
  return user && (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between mt-28">
      <img className="w-36" src= {Logo} alt="Netflix Logo"/>
      <div className="relative">
        <div className="flex items-center p-2 ml-1 mr-1 cursor-pointer" onMouseEnter={() => setIsDropdownOpen(true)}>
          <img className="w-12 h-12 rounded" alt="usericon" src={user && user.photoURL ? user.photoURL : ProfileLogo1} />
          <svg className={`w-5 h-5 ml-2 text-white transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div onMouseLeave={()=> setIsDropdownOpen(false)}  className={`absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg transition-opacity duration-200 
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