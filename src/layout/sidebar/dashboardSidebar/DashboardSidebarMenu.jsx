import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

const DashboardSidebarMenu = () => {
  const [shrink, setShrink] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/");
    }
  }, [location, navigate]);

  const changeShrink=() => {
    setShrink(!shrink);
  }

  return (
    <section className="flex min-h-screen  ">
      {/**sidebar */}
      <div className="relative shadow-xl border-r border-slate-300">
        <DashboardSidebar shrink={shrink} />
      </div>

      <div className="bg-[#EAEDEF] w-full relative min-h-screen ">
        <DashboardTopbar shrink={shrink} changeShrink={changeShrink}/>

        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardSidebarMenu;
