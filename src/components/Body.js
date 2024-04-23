import Login from "./Login"; 
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
// import { useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { useDispatch } from "react-redux";
// import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  //const dispatch = useDispatch();

  // useEffect(()=> {
  //   onAuthStateChanged(auth, (user) => {
  //     if(user){
  //       //user is signed In
  //       const { uid, email, displayName } = user;
  //       dispatch(addUser({ uid, email, displayName }));
  //     }
  //     else {
  //       //user is signed out
  //       dispatch(removeUser());
  //     }
  //   });
  // }, []);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/browse",
      element: <Browse />
    },
  ]);
  return (
  	<div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body