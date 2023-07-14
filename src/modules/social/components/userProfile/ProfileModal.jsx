import React from 'react'
import { Modal } from '@mui/material';
import {AiFillEdit} from "react-icons/ai";
import {BsX} from "react-icons/bs";
import ModalWrapper from '../../../../components/baseComponents/ModalWrapper';
import Button from '../../../../components/baseComponents/Button';

const ProfileModal = ({open , data, isLoading, handleUpdate, handleClose,handleChange}) => {
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="outline-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
     <ModalWrapper title={"Modifier photo de profil"} description ={"Vous ètes sur le point de modifier votre photo de profil"}/>
     <div className="[&>*]:mx-4">
     <div className="flex items-center justify-center w-full mt-4">
            {
             !data ? (
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
                    Cliquer pour uploader une image (optionnel)
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
                name="image"
                className="hidden"
                onChange={(e) => handleChange(e)}
                accept="image/png , image/jpg , image/jpeg, image/webp"
              />
            </label>
              ):
              (
                <div className="relative">
                  <BsX className="absolute top-1 right-0 origin-right scale-[1.8] hover:text-white hover:cursor-pointer" onClick={() => handleChange({target:{name:"image", value:""}})}/>
                  <img src={URL.createObjectURL(data)} alt="image annonce" className="mx-auto w-[170px] h-[170px] object-cover rounded-md"/>
                </div>
              )
            }
          </div>
          <div className="w-full flex justify-center mt-4">
          <Button
            title={"Mettre à jour"}
            icon={ <AiFillEdit className="mr-2 scale-[1.4]" />}
            handleClick={handleUpdate}
            filled={true}
            loading={isLoading}
            className=" py-2 font-semibold bg-secondary border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
          />
          </div>
    </div>
    </div>
    </Modal>
  )
}

export default ProfileModal