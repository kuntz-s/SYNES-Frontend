import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import { BsX, BsPlus, BsCash } from "react-icons/bs";
import { FaUniversity } from "react-icons/fa";
import ModalWrapper from "../../../../../components/baseComponents/ModalWrapper";
import Input from "../../../../../components/baseComponents/Input";
import Button from "../../../../../components/baseComponents/Button";

const OrgansModal = ({
  open,
  handleClose,
  data,
  handleChange,
  addOrgan,
  isLoading,
}) => {

    const handleAdd = () => {
        if(data.nom && data.description && data.fondAlloue && data.fondAlloue > 0){
          addOrgan()
        } else {
          toast.error("Veuillez renseigner tous les champs", {
            position: "top-center",
            autoClose: 3000,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
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
          title="Ajouter un organe"
          description="Veuillez remplir les informations çi dessous"
        />
        <div className="[&>*]:mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              title="Nom de l'organe"
              name="nom"
              value={data.nom}
              handleChange={handleChange}
              color="#06655E"
              icon={<FaUniversity />}
              iconStart
            />

            <Input
              title="Fond alloué"
              name="fondAlloue"
              value={data.fondAlloue}
              handleChange={handleChange}
              color="#06655E"
              icon={<BsCash />}
              iconStart
              type="number"
            />
            <textarea
              placeholder="Description de l'organe"
              name="description"
              value={data.description}
              className="w-full border border-[#D9D9D9] mt-2 rounded-md focus:outline-none  focus:border-secondary hover:border-secondary p-2"
              onChange={handleChange}
            />
          </div>
          <div className="w-full mt-4">
            <Button
              title="Ajouter"
              icon={<BsPlus className="mr-2 scale-[1.8]" />}
              handleClick={handleAdd}
              filled={true}
              loading={isLoading}
              className="mx-auto py-2 font-semibold bg-secondary border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default OrgansModal;
