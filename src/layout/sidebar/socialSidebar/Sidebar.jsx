import React, { useState , useEffect} from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import {
  BsSearch,
  BsBellFill,
  BsBell,
  BsCreditCard,
  BsCreditCardFill,
  BsCalendar2Day,
  BsCalendar2DayFill,
} from "react-icons/bs";
import {BiLogOut} from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { IoNewspaperOutline, IoNewspaperSharp } from "react-icons/io5";
import { MdHomeFilled, MdDashboard, MdOutlineDashboard ,MdOutlineHome} from "react-icons/md";
import { IoPersonCircleOutline, IoPersonCircleSharp } from "react-icons/io5";
import { logoutUser } from "../../../redux/userSlice";
import logo from "../../../assets/img/logo.png";

const sidebarItems = [
  {
    id:1,
    title: "Actualités",
    link: "actualite",
    icon: <IoNewspaperOutline className="translate-y-[-1px] scale-[1.2]" />,
    iconHover: <IoNewspaperSharp className="translate-y-[-1px] scale-[1.2] text-secondary" />,
  },
  {
    
    id:2,
    title: "Recherche",
    link: "recherche",
    icon: <BsSearch className="scale-[1.1] translate-y-[-2px]" />,
    iconHover: <FaSearch className="scale-[1.1] translate-y-[-2px] text-secondary" />,
  },
  {
    
    id:3,
    title: "Evènements",
    link: "evenement",
    icon: <BsCalendar2Day className="scale-[1.1] translate-y-[-2px]" />,
    iconHover: <BsCalendar2DayFill className="scale-[1.1] translate-y-[-2px] text-secondary" />,
  },
  {
    
    id:4,
    title: "Notifications",
    link: "notification",
    icon: <BsBell className="scale-[1.2] translate-y-[-2px]" />,
    iconHover: <BsBellFill className="scale-[1.2] translate-y-[-2px] text-secondary" />,
  },
  {
    
    id:5,
    title: "Finances",
    link: "finance",
    icon: <BsCreditCard className="scale-[1.1] translate-y-[-1px]" />,
    iconHover: <BsCreditCardFill className="scale-[1.1] translate-y-[-1px] text-secondary" />,
  },
  {
    
    id:6,
    title: "Dashboard",
    link: "dashboard",
    icon: <MdOutlineDashboard className="scale-[1.2] translate-y-[-2px]" />,
    iconHover: <MdDashboard className="scale-[1.2] translate-y-[-1px] text-secondary" />,
  },
  {
    
    id:7,
    title: "Profil",
    link: "profil",
    icon: <IoPersonCircleOutline className="scale-[1.3] translate-y-[-2px]" />,
    iconHover: (
      <IoPersonCircleSharp className="scale-[1.3] translate-y-[-2px] text-secondary" />
    ),
  },
  {
    
    id:8,
    title: "Deconnexion",
    link: "Deconnexion",
    icon: <BiLogOut className="scale-[1.2] translate-y-[-1px]" />,
    iconHover: <BiLogOut className="scale-[1.2] translate-y-[-1px]" />,
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




const Sidebar = ({smScreen,mdScreen, lgScreen,shrink, handleOpen,openNotif, handleClose}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {unreadNotif,unreadPrivateNotif} = useSelector((state) => state.gestionNotification);
  const token = localStorage.getItem("userToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  useEffect(() => {
    
    if(!token){
      navigate("/login")
    } else {
      if(location.pathname==="/social"){
          navigate("/social/actualite");
          navigate(0)
      }
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
    handleClose();
   }
   else if (id === 4){
    handleOpen();
   } else if (id === 7){
    navigate("/social/"+link+ "/"+ userInfo.membre.id);
    handleClose();
   }
   else {
    navigate("/social/"+link);
    handleClose();
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
                className={`bg-white text-primary relative hover:cursor-pointer  flex items-center my-2 p-3 rounded-md ${item.id ===6 && userInfo.listPermission.length ===0 ? "hidden" :"flex"}`}
                onClick={() => handleNavigation(item.id, item.link)}
              >
                <span className="text-xl">
                  {(location.pathname.includes(item.link) && !openNotif) || (openNotif && item.id === 4)
                    ? item.iconHover
                    : item.icon}
                </span>
                <span className={`${(item.id !== 4 || (unreadNotif + unreadPrivateNotif) < 1 ) && "hidden"} absolute top-1 left-6 px-1 text-[12px] text-white bg-red-600  rounded-lg`} >{unreadNotif + unreadPrivateNotif}</span>
                <span
                  className={`${
                    verifyResponsive()
                      ? "hidden"
                      : `${
                          (location.pathname.includes(item.link) && !openNotif) || (openNotif && item.id === 4)
                            ? "font-extrabold text-secondary"
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
