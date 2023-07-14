import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { BsPerson, BsPlus } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../../../components/baseComponents/Input";
import RadioInput from "../../../../components/baseComponents/RadioInput";
import Button from "../../../../components/baseComponents/Button";
import { AutoComplete } from "../../../../components/baseComponents/Autocomplete";
import ModalWrapper from "../../../../components/baseComponents/ModalWrapper";


const TransactionModal = ({
  open,
  data,
  isLoading,
  listEvenements,
  listMembre,
  addTransaction,
  handleChange,
  handleClose,
}) => {
  const handleAdd = () => {
    if(data.montant < 1000 ){
        toast.error("le montant dois ètre supérieur ou égal à 1000")
    } else if (!data.raison || !data.membre || !data.evenement){
        toast.error("veuillez remplir correctement tous les champs")
    } else {
        addTransaction()
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={"Nouvelle transaction"}
          description={"Veuillez remplir les champs çi-dessous "}
        />
        <div className="[&>*]:mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              title="Montant"
              name="montant"
              value={data.montant}
              handleChange={handleChange}
              color="#06655E"
              type="number"
              required={true}
            />
            <Input
              title="Raison"
              name="raison"
              value={data.raison}
              handleChange={handleChange}
              color="#06655E"
              required={true}
            />
            <AutoComplete
              icon={<BsPerson />}
              color="#06655E"
              dataList={listMembre.map((elt) => elt.membre.email)}
              value={data.membre}
              handleChange={(e) => {
                handleChange({ target: { name: "membre", value: e } });
              }}
              style={{ height: "50px", marginTop: "8px" }}
              placeholder="Membre"
            />
            <AutoComplete
              icon={<BsPerson />}
              color="#06655E"
              dataList={listEvenements.map((elt) => elt.nom)}
              value={data.evenement}
              handleChange={(e) => {
                handleChange({ target: { name: "evenement", value: e } });
              }}
              style={{ height: "50px", marginTop: "8px" }}
              placeholder="Evènement"
            />
          </div>
          <div className="flex justify-center">
            <RadioInput
              title=""
              name="type"
              color="#06655E"
              horizontal={true}
              value={data.type}
              data={[{ name: "+ Ajout", value: "ajout" },
              { name: "- Retrait", value: "retrait" }]}
              handleChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="w-full mt-4">
            <Button
              title={"Ajouter"}
              icon={<BsPlus className="mr-2 scale-[1.8]" />}
              handleClick={() => {
                handleAdd();
              }}
              filled={true}
              loading={isLoading}
              className="mx-auto py-2 font-semibold bg-secondary border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
