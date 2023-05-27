import React from "react";
import { BsX, BsPlus } from "react-icons/bs";
import { FaUniversity } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import ModalWrapper from "../../../../components/baseComponents/ModalWrapper";
import Input from "../../../../components/baseComponents/Input";
import Button from "../../../../components/baseComponents/Button";

const UniversityModal = ({ open, handleClose, data, handleChange, addUniversity, isLoading }) => {

  const handleAdd = () => {
    if(data.nom && data.localisation){
      addUniversity()
    } else {
      toast.error("Veuillez renseigner les champs obligatoires", {
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
          title="Ajouter une université"
          description="Veuillez remplir les informations çi dessous"
        />
        <div className="[&>*]:mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              title="Nom de l'université"
              name="nom"
              value={data.nom}
              handleChange={handleChange}
              color="#06655E"
              icon={<FaUniversity />}
              iconStart
            />
            <Input
              title="Localisation"
              name="localisation"
              value={data.localisation}
              handleChange={handleChange}
              color="#06655E"
              icon={<GoLocation />}
              iconStart
            />
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            {
             !data.logo ? (
                <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                  <span className="font-semibold">
                    Cliquer pour uploader un logo (optionnel)
                  </span>{" "}
                  ou faites drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="logo"
                className="hidden"
                onChange={(e) => handleChange(e)}
                accept="image/png , image/jpg , image/jpeg, image/webp"
              />
            </label>
              ):
              (
                <div className="relative">
                  <BsX className="absolute top-1 right-0 origin-right scale-[1.8] hover:text-white hover:cursor-pointer" onClick={() => handleChange({target:{name:"logo", value:""}})}/>
                  <img src={data.logo} alt="university logo" className="mx-auto w-[170px] h-[170px] object-cover rounded-md"/>
                </div>
              )
            }
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
        
      <ToastContainer/>
      </div>
    </Modal>
  );
};

export default UniversityModal;
