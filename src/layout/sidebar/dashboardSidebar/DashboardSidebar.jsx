import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaChalkboardTeacher, FaArrowRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  {
    title: "Gestion syndicat",
    link: "/dashboard/gestion-syndicat",
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "Gestion membres",
    link: "/dashboard/gestion-membres",
    icon: <HiOutlineUserGroup />,
  },
  {
    title: "A propos",
    link: "/dashboard/a-propos",
    icon: <AiOutlineInfoCircle />,
  },
  { title: "Retour accueil", link: "/accueil", icon: <FaArrowRight /> },
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
          return (
            <Link to={"/social"+item.link} key={id} className="relative">
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
