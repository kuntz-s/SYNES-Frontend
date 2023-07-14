import React from 'react'
import { Modal } from '@mui/material';
import ModalWrapper from './ModalWrapper';
import Button from './Button';

const DeleteModal = ({open , handleClose,handleDelete, title , description}) => {
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
     <ModalWrapper title={title? title:"pas de titre"} description ={description? description:"pas de description"}/>
     <div className="flex justify-center [&>*]:mx-4">
    <Button
            title="Supprimer"
            handleClick={handleDelete}
            filled={true}
            className=" font-semibold bg-red-600 mr-2 border-red-600 hover:bg-white hover:shadow-md hover:text-red-600 rounded-md"
          />
          <Button
            title="Annuler"
            handleClick={handleClose}
            filled={false}
            className="rounded-md font-semibold"
          />
          
    </div>
    </div>
    </Modal>
  )
}

export default DeleteModal