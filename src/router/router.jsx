import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/home/pages/HomePage";
import Profile from "../modules/home/pages/Profile";
import { Route, createRoutesFromElements } from "react-router-dom/dist";


export const router = createBrowserRouter(
    // [
    //   {  
    //     path:"/",
    //     element:<HomePage/>
    //    // errorElement: <div>Il y'a une ereur</div>
    //   },

    //   {
    //     path:'/profile'
    //     element:<Profile />      
    //   }
    // ]

    createRoutesFromElements(
      <Route>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/profile" element={<Profile/>} />
      </Route>
    )
)