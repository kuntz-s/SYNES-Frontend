import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import {IoMdWarning} from "react-icons/io";
import { toast } from "react-toastify";
import ModalWrapper from "../../../../components/baseComponents/ModalWrapper";
import Button from "../../../../components/baseComponents/Button";

const WarningModal = ({ open, data, isLoading, addWarning, handleClose }) => {

  const [raison, setRaison] = useState("");

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
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={"Avertir  membre"}
          description={"Veuillez spécifier les raisons de votre avertissement du membre " + (data&& data.membre.noms)}
        />
        <textarea
              placeholder="Raisons de l'avertissement"
              name="description"
              value={raison}
              rows={3}
              className="w-full border border-[#D9D9D9] mt-1 rounded-md focus:outline-none  focus:border-secondary hover:border-secondary p-2"
              onChange={(e) => setRaison(e.target.value)}
            />
         <div className="mt-2">
          <Button
            title={"Avertir"}
            icon={<IoMdWarning className="mr-2 scale-[1.4]" />}
            handleClick={warnMember}
            filled={true}
            loading={isLoading}
            className="mx-auto py-2 font-semibold bg-yellow-500 border-yellow-500 hover:bg-white hover:shadow-md hover:text-yellow-500 rounded-md"
          />
        </div> 
      </div>
    </Modal>
  );
};

export default WarningModal;
