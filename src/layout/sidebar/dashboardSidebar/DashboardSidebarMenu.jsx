import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
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
    <section className="flex min-h-screen relative  ">
      {/**sidebar */}
      <div className="relative shadow-xl border-r border-slate-300">
        <DashboardSidebar shrink={shrink} />
        <div className="absolute right-[-10px] top-5 hover:cursor-pointer z-50 rounded-full bg-white ">
            <BsFillArrowRightCircleFill
              className={shrink ? `text-secondary text-xl  ` : "hidden"}
              onClick={changeShrink}
            />
            <BsFillArrowLeftCircleFill
              className={!shrink ? `text-secondary text-xl  ` : "hidden"}
              onClick={changeShrink}
            />
          </div>
      </div>

      <div className="bg-[#f0fdfa] w-full min-h-screen overflow-hidden ">
        <DashboardTopbar shrink={shrink} changeShrink={changeShrink}/>

        <div className="w-full p-4 ">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardSidebarMenu;
