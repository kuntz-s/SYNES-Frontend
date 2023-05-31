import React, { useState , useEffect} from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { GiHamburgerMenu } from "react-icons/gi";
import { MdHomeFilled, MdDashboard, MdOutlineDashboard ,MdOutlineHome} from "react-icons/md";
import { IoPersonCircleOutline, IoPersonCircleSharp } from "react-icons/io5";
import { logoutUser } from "../../../redux/userSlice";
import logo from "../../../assets/img/logo.png";

const sidebarItems = [
  {
    id:1,
    title: "Accueil",
    link: "accueil",
    icon: <MdOutlineHome className="translate-y-[-2px] scale-[1.6]" />,
    iconHover: <MdHomeFilled className="translate-y-[-2px] scale-[1.6]" />,
  },
  {
    
    id:2,
    title: "Recherche",
    link: "recherche",
    icon: <BsSearch className="scale-[1.1] translate-y-[-2px]" />,
    iconHover: <FaSearch className="scale-[1.1] translate-y-[-2px]" />,
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
    
    id:7,
    title: "Profil",
    link: "profil",
    icon: <IoPersonCircleOutline className="scale-[1.3] translate-y-[-2px]" />,
    iconHover: (
      <IoPersonCircleSharp className="scale-[1.3] translate-y-[-2px]" />
    ),
  },
  {
    
    id:8,
    title: "Plus",
    link: "plus",
    icon: <GiHamburgerMenu className="scale-[1.2] translate-y-[-1px]" />,
    iconHover: <GiHamburgerMenu className="scale-[1.2] translate-y-[-1px]" />,
  },
];

const hoverButtonVariants = {
  hover: {
    scale: 1.05,
    margin:"8px 5px",
  },
  hoverShrink:{
    scale: 1.05,
  }
};

const sidebarContainerVariants = {
  hidden:{
    width:"0px",
    padding:"0px"
  },
  normal:{
    width:"230px",
  },
  reduced:{
    width:"68px",
  }
}




const Sidebar = ({smScreen,mdScreen, lgScreen}) => {
  const dispatch = useDispatch();
  const [shrink, setShrink] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    
    if(!token){
      navigate("/login")
    } 

  },[])

  const verifyResponsive = () => {
    if(shrink || (mdScreen && !lgScreen)){
      return true
    } else {
      return false;
    }
  }

  const handleNavigation = (id, link)=> {
   if(id===8){
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    dispatch(logoutUser());
    navigate("/");
    navigate(0);
   }
   else {
    navigate("/social/"+link);
   }
  }

  return (
    <section className={`${location.pathname.includes("/dashboard")&& "hidden"}`}>
      <motion.div
        variants={sidebarContainerVariants}
        animate={smScreen ? "hidden" : verifyResponsive()? "reduced":"normal"}
        className="h-screen overflow-y-auto shrink-0 sticky top-0 p-3 border-r border-[#d1d5db]   md:block"
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
          {sidebarItems.map((item) => {
            return (
              <motion.div
                variants={hoverButtonVariants}
                whileHover={verifyResponsive() ? "hoverShrink":"hover"}
                key={item.id}
                className="bg-white text-primary relative hover:cursor-pointer  flex items-center my-2 p-3 rounded-md "
                onClick={() => handleNavigation(item.id, item.link)}
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
      </motion.div>
    </section>
  );
};

export default Sidebar;
