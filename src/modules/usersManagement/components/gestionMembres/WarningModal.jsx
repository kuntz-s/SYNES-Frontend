import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import {IoMdWarning} from "react-icons/io";
import { toast } from "react-toastify";
import RadioInput from "../../../../components/baseComponents/RadioInput";
import ModalWrapper from "../../../../components/baseComponents/ModalWrapper";
import Button from "../../../../components/baseComponents/Button";

const warnings = [
  {
    value:1,
    name:"Non respect des statuts du SYNES"
  },
  {
    value:2,
    name:"Absence repetée aux réunions"
  },
  {
    value:3,
    name:"Non paiement des cotisations"
  },
  {
    value:4,
    name:"Comportement indécent en déhors du Syndicat"
  },
  {
    value:5,
    name:"Autre"
  }
]

const WarningModal = ({ open, data, isLoading, addWarning, handleClose }) => {

  const [raison, setRaison] = useState(1);

    const warnMember = () => {
        if(!raison){
            toast.error("veuillez spécifier une raison")
        } else {
            addWarning(raison)
        }
    }

  return (
    <Modal
      open={open}
      onClose={() => {handleClose(); setRaison(1)}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={"Avertir  membre"}
          description={"Veuillez choisir la raison de l'avertissement du membre " + (data&& data.membre.noms)}
        />
       <div className="flex justify-center">
       <RadioInput
            name="radioInput"
            color="#06655E"
            labelClassName=""
            radioClassName=""
            value={raison}
            data={warnings}
            handleChange={(e) => {
              setRaison(e.target.value);
            }}
          />
      </div>
         <div className="flex justify-center [&>*]:mx-4 mt-2">
          <Button
            title={"Avertir"}
            icon={<IoMdWarning className="mr-2 scale-[1.4]" />}
            handleClick={warnMember}
            filled={true}
            loading={isLoading}
            className="mx-auto py-2 font-semibold bg-yellow-500 border-yellow-500 hover:bg-white hover:shadow-md hover:text-yellow-500 rounded-md"
          />
            <Button
            title="Annuler"
            handleClick={() => {handleClose(); setRaison(1)}}
            filled={false}
            className="rounded-md font-semibold border border-red-700 text-red-700 hover:bg-white hover:text-red-800 hover:border-red-800"
          />
        </div> 
      </div>
    </Modal>
  );
};

export default WarningModal;
