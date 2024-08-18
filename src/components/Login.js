import LoginPageHeader from "./LoginPageHeader";
import { useState, useRef } from "react";
import { validateLoginOrSignUp } from "../utils/Validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInAnonymously } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import AuthComponent from "./AuthComponent";
import { ProfileLogo2, LoginPageBgImage } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const displayName = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  }

  const SignInUserOperation = (uid, email, displayName, photoURL) => {
    dispatch(addUser(
      { uid, 
        email, 
        displayName, 
        photoURL 
      }));
  }

  const handleSubmit = () => {
    const message = validateLoginOrSignUp(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) 
      return;

    if (!isSignInForm)
    {//Sign up form logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value).then((userCredential) => 
      {//takes email & pass only, we use updateProfile to add name & profile pic(for test)
        const user = userCredential.user;
        console.log(user);
        updateProfile(user, {
          displayName: displayName.current.value, 
          photoURL: ProfileLogo2
        }).then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          SignInUserOperation(uid, email, displayName, photoURL );
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
      })
      .catch((error) => 
      {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }
    else {
      //Sign in form logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value).then((userCredential) => 
      {
        // Signed in 
        const user = userCredential.user;
        const { uid, email, displayName, photoURL } = user;
        console.log(user);
        SignInUserOperation(uid, email, displayName, photoURL);
      }).catch((error) => 
      {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }
  }

  const loginAsGuest = () => {
    signInAnonymously(auth).then(() => {
    // Signed in..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage);
    });
  }

  return (
    <div>
      <AuthComponent />
      <LoginPageHeader />
      <div className="absolute">
        <img src= {LoginPageBgImage} alt="bg-img" />
      </div>
      <form className="w-[30%] absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80" onSubmit={(e) => e.preventDefault()}>
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && <input ref={displayName} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700"/>}
        <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700"/>
        <div className="relative">
          <input ref={password} type="password" placeholder="Password"  className="p-4 my-4 w-full bg-gray-700"
            onFocus={() => setShowTooltip(true)} onBlur={() => setShowTooltip(false)} />
            {!isSignInForm && showTooltip && (
              <div className="absolute top-0 left-full ml-2 p-2 w-64 text-sm bg-gray-800 text-white rounded-lg shadow-lg z-10">
                Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.
              </div>
            )}
        </div>
        <p className="text-red-500">{errorMessage}</p>
        <button className="p-2 my-6 bg-red-700 w-full rounded-lg" onClick={handleSubmit}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 text-white text-opacity-70" >
        {isSignInForm ? "New to Netflix?" : "Already registered?"}&nbsp;
          <span className="cursor-pointer text-white" onClick={toggleSignInForm}>
          {isSignInForm ? "Sign up now." : "Sign in now."}
          </span>
        </p>
        {isSignInForm && (
          <p> 
            <span className="pt-1 pl-[0%] text-white cursor-pointer" onClick={loginAsGuest}>Guest Login</span>
          </p>)
        }
      </form>
    </div>
  )
}

export default Login;