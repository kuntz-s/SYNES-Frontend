import { Outlet } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import CountUp from "react-countup";
import HomePage from "../modules/home/pages/HomePage";
import LoginPage from "../modules/authentication/pages/LoginPage";
import SidebarMenu from "../layout/sidebar/socialSidebar/SidebarMenu";
import DashboardSidebarMenu from "../layout/sidebar/dashboardSidebar/DashboardSidebarMenu";
import GestionSyndicat from "../modules/usersManagement/pages/GestionSyndicat";
import GestionMembre from "../modules/usersManagement/pages/GestionMembre";
import GestionEvenement from "../modules/financeManagement/pages/GestionEvenement";
import EventsPage from "../modules/social/pages/EventsPage";
import GestionTransaction from "../modules/financeManagement/pages/GestionTransaction";
import UserProfile from "../modules/social/pages/UserProfile";
import FinancePage from "../modules/financeManagement/pages/FinancePage";
import Test from "../components/Test";


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
        path:"/test",
        element:<Test />
      },
      { 
          path:"/social",
          element:<SidebarMenu/>,
          errorElement:<SidebarMenu/>,
          children:[
              {
                path:"/social/evenement",
                element:<EventsPage/>
              },
              {
                path:"/social/finance",
                element:<FinancePage/>
              },
              {
                path:"/social/profil/:profileId",
                element:<UserProfile/>
              },
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
                    path:"/social/dashboard/gestion-evenements",
                    element:<GestionEvenement/>
                  },
                  
                  {
                    path:"/social/dashboard/gestion-transaction",
                    element:<GestionTransaction/>
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