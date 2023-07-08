import React from "react";
import {BsPerson} from "react-icons/bs"
import {FaUniversity} from "react-icons/fa";
import {FiMail} from "react-icons/fi";
import { dateInFrench } from "../../../../components/Constant";
import noProfile from "../../../../assets/img/profile1.png";



const ProfileInfo = ({ data }) => {
  const {membre} = data;
  const inscription = dateInFrench(new Date(membre.dateInscription));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  return (
    <div className="w-full  flex grid grid-cols-3 gap-8">
      <div className=" w-full flex justify-center">
        <img
          src={membre.photo ? membre.photo : noProfile}
          alt="profile pic"
          className="rounded-full w-[150px] h-[150px] object-cover"
        />
      </div>
      <div className="col-span-2 w-full">
       <div>
       <div className="flex items-center">
       <p className="font-medium text-xl uppercase">
          {membre.noms + " "+ membre.prenom}
        </p>
        <button className={`${membre.id !== userInfo.membre.id && "hidden"} ml-8 text-[15px] bg-slate-100 py-1 px-3 font-medium text-primary rounded-lg hover:cursor-pointer hover:bg-slate-200`}> Modifier profil</button>
       </div>
        <p className="italic text-base text-secondary font-medium">{membre.role.nom}</p>
       </div>
       <div className="my-2 flex [&>*]:mr-8">
        <p><span className="font-bold">{data.annonceList.length}</span> annonces</p>
        <p><span className="font-bold">{data.transactionList.length}</span> transactions</p>
        <p><span className="font-bold">{data.avertissementList.length}</span> avertissements</p>
       </div>
        <div className="[&>*]:flex [&>*]:items-center [&>*]:my-1">
        <p><FiMail className="mr-2"/> <span>{membre.email}</span></p>
        <p><FaUniversity className="mr-2"/> <span>{membre.universite.nom}</span></p>
        <p><BsPerson className="mr-2 scale-[1.2]"/> <span>Membre depuis le {inscription.jour +  " " + inscription.moisComplet + " "+inscription.année}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
