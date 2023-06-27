import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getListeEvenements,
  postEvenement,
  resetEvent,
} from "../../../redux/gestionEvenementSlice";
import { deleteEvenement } from "../services/gestionEvenementService";
import { transformDate } from "../../../components/Constant";
import EventListTable from "../components/gestionEvenements/EventListTable";
import EventModal from "../components/gestionEvenements/EventModal";
import DeleteModal from "../../../components/baseComponents/DeleteModal";
import Button from "../../../components/baseComponents/Button";
import Helmet from "../../../components/Helmet/Helmet";
import noEvent from "../../../assets/img/event.svg";

const GestionEvenement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, eventLoading, eventError, eventSuccess } = useSelector(
    (state) => state.gestionEvenement
  );
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [eventInfo, setEventInfo] = useState({
    nom: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    photo: "",
  });

  useEffect(() => {
    const verify = user.listPermission.find(
      (perm) => perm === "Gestion Evènement"
    );
    if (!verify) {
      navigate("/social");
    } else {
      dispatch(getListeEvenements());
    }
  }, []);

  useEffect(() => {
    if (eventError && !eventSuccess) {
      handleClose();
      setTimeout(() => {
        toast.error("Une erreur est survenue lors de l'ajout de l'évènement", {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }, 200);
      dispatch(resetEvent());
    } else if (eventSuccess && !eventError) {
      handleClose();
      setTimeout(() => {
        toast.success("Evènement ajouté avec succès", {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }, 200);
      dispatch(getListeEvenements());
      dispatch(resetEvent());
    }
  }, [eventError, eventSuccess]);

  const handleOpen = () => {
    setEventInfo({
      ...eventInfo,
      dateDebut: transformDate(new Date()),
      dateFin: transformDate(new Date()),
    });
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setEventInfo({
      nom: "",
      description: "",
      dateDebut: "",
      dateFin: "",
      photo: "",
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  const handleEvent = () => {
    dispatch(postEvenement(eventInfo))
  };

  const handleRemove = async ()=> {
    try {
      const res = await deleteEvenement(deleteId);
      if(res.status === 200){
        dispatch(getListeEvenements());
        setOpenDelete(false);
        setDeleteId(null);
        setTimeout(() => {
          toast.success("Evènement supprimé avec succès", {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }, 200);
      } else {
        toast.error("une erreur est survenue lors de la suppression de cet évènement")
      }
    } catch(error){
      toast.error("une erreur est survenue lors de la suppression de cet évènement")
    }
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
            <img
              src={noEvent}
              height={350}
              width={350}
              alt="event illustration"
            />
            <p className="text-lg mt-2">
              Aucun évènement pour le moment dans le système
            </p>

            <Button
              title="Nouvel évènement"
              icon={<BsPlus className="mr-2 scale-[1.8]" />}
              handleClick={handleOpen}
              filled={true}
              className=" font-semibold bg-secondary mt-4 mx-auto border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
            />
          </div>
        ) : (
          <div>
            <EventListTable data={events} handleOpen={handleOpen} handleDelete={(row,id) => {setDeleteId(row.id); setOpenDelete(true)}}/>
          </div>
        )}
      </section>
      <EventModal
        open={open}
        data={eventInfo}
        isLoading={eventLoading}
        addEvent={handleEvent}
        handleChange={handleChange}
        handleClose={handleClose}
      />
       <DeleteModal
        open={openDelete}
        handleClose={() => {setOpenDelete(false); setDeleteId(null)}}
        title="Supprimer un évènement"
        description="la suppression de cet évènement impactera sur les transactions qui y ont été effectué sur celui-ci , voulez-vous tout de même supprimer ?"
        handleDelete = {handleRemove}
     />
      <ToastContainer />
    </HelmetProvider>
  );
};

export default GestionEvenement;
