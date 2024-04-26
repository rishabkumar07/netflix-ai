import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const AuthComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if(user){
        //user is signed In
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        //auth passed redirect to browse page
        navigate("/browse");
      }
      else {
        //user is signed out
        dispatch(removeUser());
        //auth failed redirect to login page
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
    </div>
  )
};

export default AuthComponent;