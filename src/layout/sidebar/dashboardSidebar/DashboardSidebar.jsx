import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { FaChalkboardTeacher, FaArrowLeft } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";

const sidebarItems = [
  {
    title: "Gestion syndicat",
    permission: "Gestion Syndicat",
    link: "/dashboard/gestion-syndicat",
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "Gestion membres",
    permission: "Création membre",
    link: "/dashboard/gestion-membres",
    icon: <HiOutlineUserGroup />,
  },

  {
    title: "Gestion évènements",
    permission: "Gestion Evènement",
    link: "/dashboard/gestion-evenements",
    icon: <BsCalendar2Date />,
  },
  {
    title: "Gestion Transaction",
    permission: "Gestion transaction",
    link: "/dashboard/gestion-transaction",
    icon: <GrTransaction />,
  },
  {
    title: "Retour accueil",
    permission: null,
    link: "/actualite",
    icon: <FaArrowLeft />,
  },
];

const sidebarContainerVariants = {
  normal: {
    width: "230px",
  },
  reduced: {
    width: "68px",
  },
};

const DashboardSidebar = ({ shrink }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/connexion");
    } else {
      if (userInfo.listPermission.length === 0) {
        alert("vous n'avez pas le droit d'accéder à cette section");
        navigate("/social/actualite");
      }
    }
  });

  const verifyPermission = (perm) => {
    if (!perm) {
      return true;
    } else {
      const res = userInfo.listPermission.find((permission)=> permission.includes(perm));
      if(res){
        return true
      } else {
        return false
      }
    }
  };

  return (
    <motion.div
      variants={sidebarContainerVariants}
      animate={!shrink ? "normal" : "reduced"}
      className=" h-screen overflow-y-none shrink-0 sticky top-0 p-3 "
    >
      <div className="flex justify-center items-center my-2">
        <MdDashboard className="scale-[1.4] text-secondary" />
        <p
          className={`${
            shrink
              ? "hidden"
              : "text-secondary text-lg uppercase font-bold ml-2 text-md tracking-wide"
          }`}
        >
          dashboard
        </p>
      </div>
      <div className="mt-[6vh]">
        {sidebarItems.map((item, id) => {
          const verifyAccess = verifyPermission(item.permission)
          return (
            <Link to={"/social" + item.link} key={id} className={` relative ${!verifyAccess && "hidden"}`}>
              <p
                key={id}
                className={`${
                  location.pathname === "/social" + item.link
                    ? " text-secondary "
                    : " text-slate-600 bg-transparent hover:text-secondary hover:bg-secondary/10 "
                } flex items-center my-1 p-3 rounded-md  `}
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`${
                    shrink ? "hidden" : "text-md font-medium ml-4"
                  }`}
                >
                  {item.title}
                </span>
              </p>
              <div
                className={`${
                  location.pathname === "/social" + item.link &&
                  "absolute top-0 left-[-10px] h-full w-1 bg-secondary py-2"
                }`}
              ></div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DashboardSidebar;
