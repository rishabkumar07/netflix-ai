import LoginPageHeader from "./LoginPageHeader";
import { useState, useRef } from "react";
import { validateLoginOrSignUp } from "../utils/Validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInAnonymously } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import AuthComponent from "./AuthComponent";
import { ProfileLogo2, LoginPageBgImage } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative h-screen">
      <img 
          src= {LoginPageBgImage} 
          alt="bg-img"
          className="h-full w-full object-cover absolute brightness-50" 
      />
      <div className="relative z-10">
        <AuthComponent />
        <LoginPageHeader />
        
        <div className="flex items-center justify-center">
          <form 
            className="bg-black bg-opacity-70 w-full max-w-md h-auto mx-auto rounded-lg p-10 sm:mt-1 lg:mt-2 xl:mt-6 sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2" 
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input 
                ref={displayName} 
                type="text" 
                placeholder="Full Name" 
                className="p-3 sm:p-4 text-white my-2 w-full bg-white bg-opacity-20 rounded-md"
              />
            )}
            <input 
              ref={email} 
              type="text" 
              placeholder="Email Address" 
              className="p-3 sm:p-4 text-white my-2 w-full bg-white bg-opacity-20 rounded-md"
            />
            <div className="relative">
              <input 
                ref={password} 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"  
                className="p-3 sm:p-4 text-white my-2 w-full bg-white bg-opacity-20 rounded-md"
                onFocus={() => setShowTooltip(true)} 
                onBlur={() => setShowTooltip(false)} 
              />
              <button 
                type="button"
                className="absolute top-[30%] right-2 px-2 py-1" 
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color="white"/>
              </button>

                {!isSignInForm && showTooltip && (
                  <div 
                    className="absolute top-12 left-0 md:top-0 md:left-full md:ml-2 p-2 w-full md:w-64 text-sm bg-gray-800 text-white rounded-lg shadow-lg z-10"
                  >
                    Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.
                  </div>
                )}
            </div>
            <p className="text-red-400 text-xs my-2">{errorMessage}</p>
            <button 
              className="bg-red-700 hover:contrast-100 text-white w-full p-3 sm:p-4 my-2 rounded-md contrast-150 font-bold" 
              onClick={handleSubmit}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className="text-gray-400 mt-4" >
            {isSignInForm ? "New to Netflix?" : "Already registered?"}&nbsp;
              <span 
                className="text-white hover:underline cursor-pointer" 
                onClick={toggleSignInForm}
              >
              {isSignInForm ? "Sign up now." : "Sign in now."}
              </span>
            </p>
            {isSignInForm && (
              <p> 
                <span 
                  className="pt-1 text-white cursor-pointer hover:underline" 
                  onClick={loginAsGuest}
                >
                  Guest Login
                </span>
              </p>)
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;