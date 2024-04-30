import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Logo, ProfileLogo1 } from "../utils/constants";

const MainHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
    });
  }
  return user && (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-36" src= {Logo} alt="Netflix Logo"/>
        <div className="flex p-2">
          <img className="w-12 h-12" alt="usericon" src={user && user.photoURL ? user.photoURL : ProfileLogo1} />
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
        </div>
    </div>
  )
}

export default MainHeader;