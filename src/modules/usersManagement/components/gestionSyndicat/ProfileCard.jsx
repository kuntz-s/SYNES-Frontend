import React from "react";
import { useNavigate } from "react-router";
import { BsPencil } from "react-icons/bs";
import StatTitle from "../../../../components/baseComponents/StatTitle";
import Profile from "../../../../assets/profile.png";

const ProfileCard = () => {
    const navigate = useNavigate()
  return (
    <div className="bg-white  p-4 rounded-xl flex flex-col justify-center text-center">
      <StatTitle title="Mon profil" />
      <div className="border-2 border-secondary rounded-full mx-auto p-1 my-2">
        <img
          src={Profile}
          alt="profile image"
          className="rounded-full w-[90px] h-[90px]  "
        />
      </div>
      <div className="text-center my-2">
        <p className="font-bold text-secondary">
          NCHOUWET MFOUAPON KUNTZ STEPHANE
        </p>
        <p className="italic">Sécrétaire congrès</p>

        <p
          className=" flex items-center text-secondary hover:cursor-pointer hover:underline justify-center my-2"
          onClick={() => navigate("/social/profil")}
        >
          <BsPencil className="mr-1" /> Editer profil
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
