import React  from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import BottomSidebar from "./BottomSidebar";


const SidebarMenu = () => {
  const smScreen = useMediaQuery("(max-width:767px)");
  const mdScreen = useMediaQuery("(min-width:768px)");
  const lgScreen = useMediaQuery("(min-width:1024px)");

  return (
    <section className="flex min-h-screen relative">
      <Sidebar smScreen={smScreen} mdScreen={mdScreen} lgScreen={lgScreen} />
      <div className="w-full ">
        <Outlet />
      </div>{/* 
      <BottomSidebar/> */}
    </section>
  );
};

export default SidebarMenu;
