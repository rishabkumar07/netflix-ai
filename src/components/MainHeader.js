import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      navigate("/error");
    });
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-36" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
        alt="Netflix Logo"/>
        <div className="flex p-2">
          <img className="w-12 h-12" alt="usericon" src={user && user.photoURL ? user.photoURL : "https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABdFu41cMXRWNK1EkDj_yH1bxeh9a0udswBpkyBNBYFsgcCEANkojvc63RsB56mXTPWhSqhDnWfJQOH9V7BymHd5Jj8XGwUJ-eQ.png?r=e6e"} />
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
        </div>
    </div>
  )
}

export default MainHeader;