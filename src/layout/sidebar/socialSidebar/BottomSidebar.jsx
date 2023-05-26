import React from "react";

import {
    BsSearch,
    BsBellFill,
    BsBell,
    BsCreditCard,
    BsCreditCardFill,
    BsCalendar2Day,
    BsCalendar2DayFill,
  } from "react-icons/bs";
  import { FaSearch } from "react-icons/fa";
  import { GrHomeRounded } from "react-icons/gr";
  import { GiHamburgerMenu } from "react-icons/gi";
  import { MdHomeFilled, MdDashboard, MdOutlineDashboard } from "react-icons/md";
  import { IoPersonCircleOutline, IoPersonCircleSharp } from "react-icons/io5";

const sidebarItems = [
    {
      id:1,
      title: "Accueil",
      link: "accueil",
      icon: <GrHomeRounded className="translate-y-[-2px] scale-[1.1]" />,
      iconHover: <MdHomeFilled className="translate-y-[-2px] scale-[1.6]" />,
    },
    {
      
      id:3,
      title: "Evènements",
      link: "evenement",
      icon: <BsCalendar2Day className="scale-[1.1] translate-y-[-2px]" />,
      iconHover: <BsCalendar2DayFill className="scale-[1.1] translate-y-[-2px]" />,
    },
    {
      
      id:4,
      title: "Notifications",
      link: "notification",
      icon: <BsBell className="scale-[1.2] translate-y-[-2px]" />,
      iconHover: <BsBellFill className="scale-[1.2] translate-y-[-2px]" />,
    },
    {
      
      id:5,
      title: "Finances",
      link: "finance",
      icon: <BsCreditCard className="scale-[1.1] translate-y-[-1px]" />,
      iconHover: <BsCreditCardFill className="scale-[1.1] translate-y-[-1px]" />,
    },
    {
      
      id:6,
      title: "Dashboard",
      link: "dashboard",
      icon: <MdOutlineDashboard className="scale-[1.2] translate-y-[-2px]" />,
      iconHover: <MdDashboard className="scale-[1.2] translate-y-[-1px]" />,
    },
    {
      
      id:8,
      title: "Plus",
      link: "plus",
      icon: <GiHamburgerMenu className="scale-[1.2] translate-y-[-1px]" />,
      iconHover: <GiHamburgerMenu className="scale-[1.2] translate-y-[-1px]" />,
    },
  ];

const BottomSidebar = () => {
  return (
    <div className="w-full p-2 bg-secondary block md:hidden fixed left-0 bottom-0 ">
      BottomSidebar
    </div>
  );
};

export default BottomSidebar;
