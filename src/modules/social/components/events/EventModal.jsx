import React from 'react';
import { useNavigate } from 'react-router';
import { Modal } from '@mui/material';
import ModalWrapper from '../../../../components/baseComponents/ModalWrapper';
import noProfile from "../../../../assets/img/profile1.png";

const EventModal = ({open , handleClose,data}) => {
    const navigate = useNavigate();
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="outline-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
     <ModalWrapper title="Contributions" description ={"Liste des membres ayant contribué"}/>
     <div className="grid grid-cols-3 gap-4 mt-4">
   
          {
            data.map((participant) => {
                console.log("part",participant)
                return(
                    <div key={participant.id} className="border border-slate-100 shadow shadow-md rounded-md p-2 hover:cursor-pointer hover:shadow-lg" onClick={() => navigate("/social/profil/"+participant.id)}>
                                    <img src={participant.photo ? participant.photo : noProfile} className="rounded-full w-[100px] h-[100px] object-cover mx-auto" />
                                    <div className="text-[15px] text-center font-medium text-slate-800 ">
                                    <p className="uppercase">{participant.noms}</p>
                                    <p className="lowercase">{participant.prenom}</p>
                                    </div>
                                </div>
                )
            })
          }
    </div>
    </div>
    </Modal>
  )
}

export default EventModal