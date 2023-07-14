import React from "react";
import { toast } from "react-toastify";
import {BsPersonFill, BsCalendar2DateFill, BsPlus} from "react-icons/bs";
import {FaUniversity} from "react-icons/fa";
import {FiEdit3} from "react-icons/fi";
import {HiIdentification, HiMail} from "react-icons/hi";
import Modal from "@mui/material/Modal";
import ModalWrapper from "../../../../components/baseComponents/ModalWrapper";
import {AutoComplete} from "../../../../components/baseComponents/Autocomplete";
import Button from "../../../../components/baseComponents/Button";
import Input from "../../../../components/baseComponents/Input";
const MemberModal = ({
  open,
  data,
  addMember,
  isLoading,
  universities,
  handleClose,
  handleChange
}) => {
    const modify ={
        modifyStatus:false
    }

    const isCorrect = (param) => {
      if(!param.nom || !param.prenom || !param.universite || !param.matricule || !param.email || !param.dateInscription){
        return false;
      } 
      return true
    }

    const handleAdd = () => {
      if(isCorrect(data)){
        addMember()
      } else {
        toast.error("Veuillez remplir tous les champs ")
      }
    }
    const handleModify = () => {alert("modify")}
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={!modify.modifyStatus ? "Ajouter un membre" : "Modifier un membre"}
          description="Veuillez remplir les informations çi dessous"
        />
        <div className="[&>*]:mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <Input
              title="Nom"
              name="nom"
              value={data.nom}
              handleChange={handleChange}
              color="#06655E"
              required={true}
              icon={<BsPersonFill />}
              iconStart
            />
            <Input
            title="Prenom"
            name="prenom"
            value={data.prenom}
            handleChange={handleChange}
            color="#06655E"
            required={true}
            icon={<BsPersonFill />}
            iconStart
          />
          <Input
              title="Matricule"
              name="matricule"
              value={data.matricule}
              handleChange={handleChange}
              color="#06655E"       
              required={true}
              icon={<HiIdentification className="scale-[1.2]" />}
              iconStart
            />
            <Input
              title="Email"
              name="email"
              type="email"
              required={true}
              value={data.email}
              handleChange={handleChange}
              color="#06655E"
              icon={<HiMail  className="scale-[1.2]" />}
              iconStart
            />
            <Input
              title="Date inscription"
              name="dateInscription"
              type="date"
              value={data.dateInscription}
              handleChange={handleChange}
              color="#06655E"
              required={true}
              icon={<BsCalendar2DateFill />}
              iconStart
            />
            <AutoComplete
              icon={<FaUniversity />}
              color="#06655E"
              dataList={universities.map((elt) => elt.nom)}
              value={data.universite}
              handleChange={(e) =>
                handleChange({ target: { name: "universite", value: e } })
              }
              placeholder="Université"
              style={{ height: "50px", marginTop: "8px" }}
              title="Université"
            />
          </div>
          <div className="w-full mt-4">
            <Button
              title={!modify.modifyStatus ? "Ajouter" : "Modifier"}
              icon={
                !modify.modifyStatus ? (
                  <BsPlus className="mr-2 scale-[1.8]" />
                ) : (
                  <FiEdit3 className="mr-2 scale-[1.2]" />
                )
              }
              handleClick={() => {
                !modify.modifyStatus ? handleAdd() : handleModify();
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

export default MemberModal;
