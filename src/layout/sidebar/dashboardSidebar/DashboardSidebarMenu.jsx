import react, { useState , useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import DashboardSidebar from "./DashboardSidebar";

const DashboardSidebarMenu = () => {
  const [shrink, setShrink] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if(location.pathname === "/dashboard"){
      navigate('/dashboard/')
    }
  },[location ,navigate])
  return (
    <section className="flex min-h-screen  ">

      {/**sidebar */}
      <div className="relative shadow-xl border-r border-slate-300">
        <DashboardSidebar shrink={shrink} />
      </div>

      <div className="bg-white w-full relative ">
          <div className="absolute bg-transparent left-[-10px] top-7 hover:cursor-pointer z-50 rounded-full ">
            <BsFillArrowRightCircleFill
              className={shrink ? `text-secondary text-xl  ` : "hidden"}
              onClick={() => setShrink(!shrink)}
            />
            <BsFillArrowLeftCircleFill
              className={!shrink ? `text-secondary text-xl  ` : "hidden"}
              onClick={() => setShrink(!shrink)}
            />
          </div>
        <div className=" w-full min-h-screen bg-[#EAEDEF] px-6 py-4 ">
        <Outlet/>
        </div>
      </div>
    </section>
  );
};

export default DashboardSidebarMenu;
