import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import {BsPlus} from "react-icons/bs";
import { toast } from "react-toastify";
import Input from "../../../../components/baseComponents/Input";
import ModalWrapper from "../../../../components/baseComponents/ModalWrapper";
import Button from "../../../../components/baseComponents/Button";

const EventModal = ({ open, data, isLoading, handleChange, handleClose }) => {

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
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={"Nouvel évènement"}
          description={"Veuillez remplir les champs çi-dessous " }
        />
         <div className="[&>*]:mt-2 grid md:grid-cols-2 gap-4">
            {inputsList.map((input, id) => {
              return (
               
                input.type !== "textarea"? (
                    <Input
                    key={id}
                    
                color="#06655E"
                    title={input.title}
                    name={input.name}
                    type={input.type}
                    value={input.value}
                    handleChange={handleChange}
                  />
                ):(
                    <textarea
                    key={id}
                    placeholder={input.title}
                    name={input.name}
                    value={input.value}
                    rows={3}
                    className="w-full border border-[#D9D9D9] mt-1 rounded-md focus:outline-none  focus:border-secondary hover:border-secondary p-2"
                    onChange={handleChange}
                  />
                )
               
              );
            })}
          </div>
         <div className="mt-2">
          <Button
            title={"Ajouter évènement"}
            icon={<BsPlus className="mr-2 scale-[1.4]" />}
            handleClick={() => {alert("clicked")}}
            filled={true}
            loading={false}
            className="mx-auto py-2 font-semibold bg-secondary border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
          />
        </div> 
      </div>
    </Modal>
  );
};

export default EventModal;
