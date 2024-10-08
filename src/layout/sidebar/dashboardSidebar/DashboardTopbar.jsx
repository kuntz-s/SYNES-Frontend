import React from 'react';
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
  } from "react-icons/bs";
  import { BiBell } from "react-icons/bi";
import noProfile from "../../../assets/img/profile1.png";

const DashboardTopbar = ({shrink, changeShrink}) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  return (
    <div
          className="w-full shadow-lg bg-white flex justify-end py-2 px-3 md:px-5 sticky top-0 "
          style={{ zIndex: 50 }}
        >
          <div className="absolute left-[-10px] top-5 hover:cursor-pointer z-50 rounded-full bg-white ">
            <BsFillArrowRightCircleFill
              className={shrink ? `text-secondary text-xl  ` : "hidden"}
              onClick={changeShrink}
            />
            <BsFillArrowLeftCircleFill
              className={!shrink ? `text-secondary text-xl  ` : "hidden"}
              onClick={changeShrink}
            />
          </div>
          <div className="flex items-center pr-4 border-r border-slate-300 hover:cursor-pointer">
            <BiBell className="text-slate-600 text-4xl rounded-full border-2 border-slate-300 p-1" />
          </div>
          <div className="flex items-center pl-4">
            <p
              className={`${
                !shrink ? "hidden md:block" : "block"
              } text-sm md:text-[16px] text-slate-600 font-medium mr-3 capitalize`}
            >
              {userInfo.membre.noms} {userInfo.membre.prenom}
            </p>
            <img
              src={userInfo.membre.photo ? userInfo.membre.photo:noProfile}
              className="shrink-0 rounded-full  h-[30px] w-[30px] md:h-[40px] md:w-[40px] object-cover"
            />
          </div>
        </div>
  )
}

export default DashboardTopbar