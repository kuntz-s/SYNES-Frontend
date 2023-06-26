import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { RxUpdate } from "react-icons/rx";
import { toast } from "react-toastify";
import ModalWrapper from "../../../../components/baseComponents/ModalWrapper";
import RadioInput from "../../../../components/baseComponents/RadioInput";
import Button from "../../../../components/baseComponents/Button";

const ModifyRoleModal = ({ open, data, isLoading , userRoleId, updateRole, handleClose }) => {
  const [radioInput, setRadioInput] = useState("");

  useEffect(() => {
    if (data.length > 0 && userRoleId) {
      const defaultId = data.find((role) => role.value === userRoleId);
      setRadioInput(parseInt(defaultId.value));
    }
  }, [data]);

  const handleUpdate = () => {
    if(userRoleId=== radioInput){
      toast.error(" L'utilisateur possède déjà ce role")
    } else {
      updateRole(radioInput)
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
          title={"Attribuer un nouveau role"}
          description="Veuillez selectionner le nouveau role à attribuer"
        />
        <div className="flex justify-center">
          <RadioInput
            name="radioInput"
            color="#06655E"
            labelClassName=""
            radioClassName=""
            value={radioInput}
            data={data}
            handleChange={(e) => {
              setRadioInput(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <Button
            title={"Mettre à jour"}
            icon={<RxUpdate className="mr-2 scale-[1.2]" />}
            handleClick={handleUpdate}
            filled={true}
            loading={isLoading}
            className="mx-auto py-2 font-semibold bg-secondary border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModifyRoleModal;
