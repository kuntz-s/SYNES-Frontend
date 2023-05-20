import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const SidebarMenu = () => {
    
  const mdScreen = useMediaQuery("(min-width:768px)");
  const lgScreen = useMediaQuery("(min-width:1024px)");
  return (
    <section className="flex min-h-screen">
      <Sidebar mdScreen={mdScreen} lgScreen={lgScreen}/>
      <div className="w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default SidebarMenu;
