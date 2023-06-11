import { Outlet } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import CountUp from "react-countup";
import HomePage from "../modules/home/pages/HomePage";
import LoginPage from "../modules/authentication/pages/LoginPage";
import SidebarMenu from "../layout/sidebar/socialSidebar/SidebarMenu";
import DashboardSidebarMenu from "../layout/sidebar/dashboardSidebar/DashboardSidebarMenu";
import GestionSyndicat from "../modules/usersManagement/pages/GestionSyndicat";
import GestionMembre from "../modules/usersManagement/pages/GestionMembre";

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
                element:<DashboardSidebarMenu/>,
                children:[
                  {
                    path:"/social/dashboard/gestion-syndicat",
                    element:<GestionSyndicat/>
                  },
                  {
                    path:"/social/dashboard/gestion-membres",
                    element:<GestionMembre/>
                  },
                  {
                    path:"/social/dashboard/*",
                    element:<div>autre gestion</div>
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