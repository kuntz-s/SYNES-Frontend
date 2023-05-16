import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/home/pages/HomePage";


export const router = createBrowserRouter(
    [
      {  
        path:"/",
        element:<HomePage/>
       // errorElement: <div>Il y'a une ereur</div>
      }
    ]
)