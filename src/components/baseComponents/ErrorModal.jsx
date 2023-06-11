import React from 'react'
import { Modal } from '@mui/material';
import {AiFillWarning} from "react-icons/ai";

const ErrorModal = ({open , handleClose}) => {
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
      <div className='flex flex-col items-center  text-center'>
        <AiFillWarning className='text-2xl text-red-500 '/>
        <p className='mt-1 font-medium text-lg text-primary'>Vous ne pouvez pas effectuer cette action car la donnée est générée automatiquement par le système</p>
      </div>
    </div>
    </Modal>
  )
}

export default ErrorModal