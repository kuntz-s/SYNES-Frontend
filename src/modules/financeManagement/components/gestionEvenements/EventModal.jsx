import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { BsPlus } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../../../components/baseComponents/Input";
import ModalWrapper from "../../../../components/baseComponents/ModalWrapper";
import Button from "../../../../components/baseComponents/Button";
import event from "../../../../assets/img/event.svg";
import event1 from "../../../../assets/img/event1.jpg";
import event2 from "../../../../assets/img/event2.jpg";

const EventModal = ({ open, data, isLoading,addEvent, handleChange, handleClose }) => {
  const [step, setStep] = useState(1);

  const inputsList = [
    {
      title: "Nom",
      name: "nom",
      type: "text",
      value: data.nom,
    },
    {
      title: "Description",
      name: "description",
      type: "textarea",
      value: data.description,
    },
    {
      title: "Date début",
      name: "dateDebut",
      type: "date",
      value: data.dateDebut,
    },
    {
      title: "Date fin",
      name: "dateFin",
      type: "date",
      value: data.dateFin,
    },
  ];

  const imgList = [
    {
      id: 0,
      img: event,
    },
    {
      id: 1,
      img: event1,
    },
    {
      id: 2,
      img: event2,
    },
  ];

  const handleNext = () => {
    if (step === 1) {
      if (!data.nom || !data.description) {
        toast.error("Veuillez remplir les champs correctement");
      } else {
        setStep(2);
      }
    } else {
      if(!data.photo){
        toast.error("veuillez selectionner au moins une image")
      } else {
        addEvent()
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setStep(1);
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={"Nouvel évènement"}
          description={
            step === 1
              ? "Veuillez remplir les champs çi-dessous "
              : "Selectionnez une image pour votre évènement"
          }
        />
        {step === 1 ? (
          <div className="[&>*]:mt-2 grid md:grid-cols-2 gap-4">
            {inputsList.map((input, id) => {
              return input.type !== "textarea" ? (
                <Input
                  key={id}
                  color="#06655E"
                  title={input.title}
                  name={input.name}
                  type={input.type}
                  value={input.value}
                  handleChange={handleChange}
                />
              ) : (
                <textarea
                  key={id}
                  placeholder={input.title}
                  name={input.name}
                  value={input.value}
                  rows={3}
                  className="w-full border border-[#D9D9D9] mt-1 rounded-md focus:outline-none  focus:border-secondary hover:border-secondary p-2"
                  onChange={handleChange}
                />
              );
            })}
          </div>
        ) : (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {imgList.map((elt) => {
                return (
                  <img
                    key={elt.id}
                    src={elt.img}
                    onClick={() =>
                      handleChange({
                        target: { name: "photo", value: elt.id.toString() },
                      })
                    }
                    alt="event illustration"
                    className={`rounded-md w-[150px] h-[150px] object-contain  ${
                      parseInt(data.photo) === elt.id
                        ? "border-2 border-secondary"
                        : " border border-slate-400"
                    }  hover:cursor-pointer hover:border-secondary`}
                  />
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-2 flex justify-center">
          {step === 2 && (
            <Button
              title={"Précedent"}
              handleClick={() => setStep(1)}
              filled={false}
              loading={false}
              className=" py-2 font-semibold rounded-md mr-6"
            />
          )}
          <Button
            title={step === 1 ? "Suivant" : "Ajouter évènement"}
            icon={step === 2 && <BsPlus className="mr-2 scale-[1.4]" />}
            handleClick={handleNext}
            filled={true}
            loading={isLoading}
            className=" py-2 font-semibold bg-secondary border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
          />
        </div>

        <ToastContainer />
      </div>
    </Modal>
  );
};

export default EventModal;
