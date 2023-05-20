import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
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
import logo from "../../assets/logo.png";

const sidebarItems = [
  {
    title: "Accueil",
    link: "accueil",
    icon: <GrHomeRounded className="translate-y-[-2px] scale-[1.1]" />,
    iconHover: <MdHomeFilled className="translate-y-[-2px] scale-[1.6]" />,
  },
  {
    title: "Recherche",
    link: "recherche",
    icon: <BsSearch className="scale-[1.1] translate-y-[-2px]" />,
    iconHover: <FaSearch className="scale-[1.1] translate-y-[-2px]" />,
  },
  {
    title: "Evènements",
    link: "evenement",
    icon: <BsCalendar2Day className="scale-[1.1] translate-y-[-2px]" />,
    iconHover: <BsCalendar2DayFill className="scale-[1.1] translate-y-[-2px]" />,
  },
  {
    title: "Notifications",
    link: "notification",
    icon: <BsBell className="scale-[1.2] translate-y-[-2px]" />,
    iconHover: <BsBellFill className="scale-[1.2] translate-y-[-2px]" />,
  },
  {
    title: "Finances",
    link: "finance",
    icon: <BsCreditCard className="scale-[1.1] translate-y-[-1px]" />,
    iconHover: <BsCreditCardFill className="scale-[1.1] translate-y-[-1px]" />,
  },
  {
    title: "Dashboard",
    link: "dashboard",
    icon: <MdOutlineDashboard className="scale-[1.2] translate-y-[-2px]" />,
    iconHover: <MdDashboard className="scale-[1.2] translate-y-[-1px]" />,
  },
  {
    title: "Profil",
    link: "profil",
    icon: <IoPersonCircleOutline className="scale-[1.3] translate-y-[-2px]" />,
    iconHover: (
      <IoPersonCircleSharp className="scale-[1.3] translate-y-[-2px]" />
    ),
  },
  {
    title: "Plus",
    link: "plus",
    icon: <GiHamburgerMenu className="scale-[1.2] translate-y-[-1px]" />,
    iconHover: <GiHamburgerMenu className="scale-[1.2] translate-y-[-1px]" />,
  },
];

const hoverButtonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#F2F2F2",
    margin:"8px 5px",
  },
  hoverShrink:{
    scale: 1.05,
    backgroundColor: "#F2F2F2",
  }
};



const Sidebar = ({mdScreen, lgScreen}) => {
  const [shrink, setShrink] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const verifyResponsive = () => {
    if(shrink || (mdScreen && !lgScreen)){
      return true
    } else {
      return false;
    }
  }
  return (
    <section>
      <div
        className={`${
          !verifyResponsive() ? "w-[230px]" : "w-[65px]"
        } h-screen overflow-y-auto shrink-0 sticky top-0 p-3 border-r border-[#d1d5db]  hidden md:block`}
      >
        <div className="flex justify-center items-center my-2 ">
          <img
            src={logo}
            alt="dossier medical"
            width={60}
            height={60}
            className="hover:cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="mt-[6vh] ">
          {sidebarItems.map((item, id) => {
            return (
              <motion.div
                variants={hoverButtonVariants}
                whileHover={verifyResponsive() ? "hoverShrink":"hover"}
                key={id}
                className="relative hover:cursor-pointer text-primary bg-white  flex items-center my-2 p-3 rounded-md "
                onClick={() => navigate("/social/"+item.link)}
              >
                <span className="text-xl">
                  {!location.pathname.includes(item.link)
                    ? item.icon
                    : item.iconHover}
                </span>
                <span
                  className={`${
                    verifyResponsive()
                      ? "hidden"
                      : `${
                          location.pathname.includes(item.link)
                            ? "font-extrabold"
                            : "font-regular"
                        } text-base ml-4`
                  }`}
                >
                  {item.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
