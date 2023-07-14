import React,{useState} from "react";
import { useNavigate } from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {BsPerson, BsCameraFill} from "react-icons/bs";
import {FaUniversity} from "react-icons/fa";
import {FiMail} from "react-icons/fi";
import { dateInFrench } from "../../../../components/Constant";
import { updateUserProfile } from "../../services/userProfileService";
import ProfileModal from "./ProfileModal";;
import noProfile from "../../../../assets/img/profile1.png";



const ProfileInfo = ({ data }) => {
  const {membre} = data;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [photo,setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const inscription = dateInFrench(new Date(membre.dateInscription));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleChange = (e) => {
    const image = e.target.files[0];
    setPhoto(image);
  }
  
  const handleUpdate =async () => {
    if(!photo){
      setPhoto("");
      setOpenModal(false)
    } else {
      setIsLoading(true);
      var formData = new FormData();
      formData.append("file", photo);
      try{
        const res = await updateUserProfile(formData);

        if(res.status === 200){
          toast.success("mise à jour réussie");
          setTimeout(() => {
            navigate(0);
          },2000)
        } else {
          toast.error("une erreur est survenue lors de la mise à jour");
        }
        
        localStorage.setItem("fileType", false);
        setIsLoading(false)
        setOpenModal(false);
        setPhoto("");
      } catch(error){
        toast.error("une erreur est survenue lors de la mise à jour");
        setIsLoading(false);
        setOpenModal(false);
        setPhoto("");
      }
    }
  }
  return (
    <div className="w-full  flex grid grid-cols-3 gap-8">
      <div className=" w-full flex justify-center relative">
        <img
          src={membre.photo ? membre.photo : noProfile}
          alt="profile pic"
          className="rounded-full w-[150px] h-[150px] object-cover "
        />
        <BsCameraFill className={`absolute right-[95px] bottom-12 scale-[1.5] hover:cursor-pointer  ${membre.id !== userInfo.membre.id && "hidden"}`} onClick={() => setOpenModal(true)} />
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
      <ToastContainer/>
      <ProfileModal open={openModal} data={photo} isLoading={isLoading} handleUpdate={handleUpdate} handleClose={() => {setOpenModal(false); setPhoto("")}} handleChange={handleChange}/>
    </div>
  );
};

export default ProfileInfo;
