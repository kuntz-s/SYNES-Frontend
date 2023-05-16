import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Helmet from "../components/documentHeader/Helmet"

export const router = createBrowserRouter(
    [
      {  
        path:"/",
        element:<section><div >Je veux juste tester quelquechose</div><Outlet/></section>,
        children:[
          {
            path:"/",
            element:<div >steph</div>
          }
        ]
       // errorElement: <div>Il y'a une ereur</div>
    }
    ]
)