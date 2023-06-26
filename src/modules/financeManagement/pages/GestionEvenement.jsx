import React, { useEffect, useState } from "react";
import {BsPlus} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getListeEvenements } from "../../../redux/gestionEvenementSlice";
import { HelmetProvider } from "react-helmet-async";
import { transformDate } from "../../../components/Constant";
import EventModal from "../components/gestionEvenements/EventModal";
import Button from "../../../components/baseComponents/Button";
import Helmet from "../../../components/Helmet/Helmet";
import noEvent from "../../../assets/img/event.svg";

const GestionEvenement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {events} = useSelector(state => state.gestionEvenement);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [open, setOpen ] = useState(false);
  const [eventInfo , setEventInfo] = useState({
    nom:"",
    description:"",
    dateDebut:"",
    dateFin:"",
    photo:"",
  })


  useEffect(() => {
    const verify = user.listPermission.find((perm) => perm === "Gestion Evènement")
    if(!verify){
      navigate("/social")
    } else {
      dispatch(getListeEvenements());
      const temp = transformDate(new Date());
      setEventInfo({...eventInfo, dateDebut:temp, dateFin:temp})
    }
  },[])

  const handleClose = () => {
    setOpen(false);
    setEventInfo({
      nom:"",
      description:"",
      dateDebut:"",
      dateFin:"",
      photo:"",
    });
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEventInfo({...eventInfo, [name]:value})
  }

  return (
    <HelmetProvider>
      <Helmet
        title="Dashboard-Gestion-Evenements"
        description="dashboard synes"
      />
      <section>
        <p className="text-center uppercase text-xl text-secondary font-bold">
          {" "}
          Liste des évènements
        </p>
        {/*  <p className="text-center text-md pt-1 ">
          Liste des évènements re du SYNES
        </p> */}
        
        {events.length === 0 ? (
          <div className="flex flex-col h-[80vh] justify-center items-center text-center">
            <img src={noEvent} height={350} width={350} alt="event illustration"/>
            <p className="text-lg mt-2">Aucun évènement pour le moment dans le système</p>
         
        <Button
            title="Nouvel évènement"
            icon={<BsPlus className="mr-2 scale-[1.8]" />}
            handleClick={() =>setOpen(true)}
            filled={true}
            className=" font-semibold bg-secondary mt-4 mx-auto border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
          />
          </div>
        ) : (
          <div>
            <p> il y'a quelquechse</p>
          </div>
        )}
      </section>
      <EventModal open={open} data={eventInfo} handleChange={handleChange} handleClose={handleClose} />
    </HelmetProvider>
  );
};

export default GestionEvenement;
