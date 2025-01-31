import Login from "./Login"; 
import Browse from "./Browse";
import WatchPage from "./WatchPage";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/browse",
      element: <Browse />
    },
    {
      path: "/browse/watch/:id",
      element: <WatchPage />,
    }
  ]);
  return (
  	<div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body