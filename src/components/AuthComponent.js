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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        //user is signed In
        const { uid, email, displayName, photoURL, isAnonymous } = user;
        dispatch(addUser({ uid, email, displayName, photoURL, isAnonymous }));
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

    //The AuthComponent can be called multiple times and each time it will add this event listener.
    // Let's unsubscribe to this event listener when the component unmounts

    //When the component is unmounted or removed from the DOM, the useEffect hook's cleanup 
    //function is called. This cleanup function is returned by the callback function passed to 
    //useEffect. In this case, the cleanup function simply calls unsubscribe(), which removes 
    //the authentication state change listener previously registered with onAuthStateChanged.
    //So, unsubscribe() removes the event listener, ensuring that there are no memory leaks or 
    //unnecessary computations when the AuthComponent is no longer needed or rendered.
    
    return () => unsubscribe();
  }, []);

  return (
    <div>
    </div>
  )
};

export default AuthComponent;