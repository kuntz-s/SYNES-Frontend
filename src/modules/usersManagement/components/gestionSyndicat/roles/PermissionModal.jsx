import React from "react";
import Modal from "@mui/material/Modal";
import { BiEditAlt } from "react-icons/bi";
import ModalWrapper from "../../../../../components/baseComponents/ModalWrapper";
import PermissionCheckbox from "./PermissionCheckbox";

const PermissionModal = ({
  open,
  permissions,
  selectedRole,
  handleClose,
  modify,
  handleModify,
  isLoading,
  openModification,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" border-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={
            modify
              ? `Modification des permissions du role ${selectedRole.nom}`
              : `Liste des permissions du role ${selectedRole.nom}`
          }
          description={
            modify
              ? "Veuillez selectionner la liste des permissions pour ce role"
              : "çi dessous la liste des permissions"
          }
        />
        {!modify ? (
          <div>
            <div className={`${selectedRole.permissions.length === 0 && "hidden"}`}>
              <div className="grid grid-cols-3  text-center bg-secondary/50 py-2">
                <p className="col-span-1">Permission</p>
                <p className="col-span-2">Description</p>
              </div>
              {selectedRole.permissions.map((permission) => {
                return (
                  <div
                    key={permission.id}
                    className="grid grid-cols-3  text-center my-4 "
                  >
                    <p className="col-span-1">{permission.nom}</p>
                    <p className="col-span-2">{permission.description}</p>
                  </div>
                );
              })}
            </div>

            <div className={`${selectedRole.permissions.length > 0 && "hidden"} text-center text-lg text-red-600`}>
                Auncune permissions pour ce role pour le moment
              </div>

            <div
              className="mt-6 font-bold text-lg flex justify-center items-center hover:underline hover:cursor-pointer text-secondary"
              onClick={openModification}
            >
              <BiEditAlt className="scale-[1.2] mr-2 " />
              <span>Modifier</span>
            </div>
          </div>
        ) : (
          <PermissionCheckbox
            rolePermissions={selectedRole.permissions}
            permissions={permissions}
            handleModify={handleModify}
            isLoading={isLoading}
          />
        )}
      </div>
    </Modal>
  );
};

export default PermissionModal;
