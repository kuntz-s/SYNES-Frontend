import { Outlet } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/home/pages/HomePage";
import LoginPage from "../modules/authentication/pages/LoginPage";
import SidebarMenu from "../layout/sidebar/SidebarMenu";

export const router = createBrowserRouter(
    [
      {  
        path:"/",
        element:<HomePage/>,
        errorElement: <div>Il y'a une ereur</div>
      },
      {
        path:"/login",
        element:<LoginPage/>
      },
      { 
          path:"/social",
          element:<SidebarMenu/>,
          errorElement:<SidebarMenu/>,
          children:[
              {
                path:"/social/dashboard",
                element:<div><p>Stephane</p><Outlet/></div>,
                children:[
                  {
                    path:"/social/dashboard",
                    element:<div>stephane dashboard</div>
                  }
                ]
              },
              {
                path:"/social/*",
                element:<div>Accueil</div>
              }
          ]
      }
    ]
)