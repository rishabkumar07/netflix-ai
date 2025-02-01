import { Logo } from "../utils/constants";
import { useSelector } from "react-redux";
import { ProfileLogo1 } from "../utils/constants";

const ErrorPage = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <div 
        className={`flex justify-between items-start absolute z-10 w-full bg-black lg:bg-transparent pb-2 lg:pb-0 lg:pt-4`}
      >
        <img 
          className="w-[5rem] lg:w-[10rem] brightness-100 contrast-150 ml-3 mt-1 lg:mt-0 lg:ml-10" 
          src= {Logo} 
          alt="Netflix Logo"
        />
        <div className="flex items-center mr-2 lg:mr-10 mt-0 lg:mt-4 space-x-0 lg:space-x-3 pt-2 lg:pr-4">
          <img className="w-12 h-12 rounded" alt="usericon" src={user && user.photoURL ? user.photoURL : ProfileLogo1} />
        </div>
      </div>

      <div className="bg-black text-white h-screen text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold flex flex-col justify-center items-center p-4">
        <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
        <h2 className="text-center">
          Switch networks or use a VPN, then reload the page...😊
        </h2>
      </div>
    </div>
  );
};

export default ErrorPage;