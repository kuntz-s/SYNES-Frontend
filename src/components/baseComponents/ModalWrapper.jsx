import React from "react";
import Logo from "../../assets/img/logo.png";

const ModalWrapper = ({ title, description }) => {
  return (
    <div className="text-center mb-4">
      <img src={Logo} alt="logo" width={80} height={80} className="mx-auto" />
      <p className="font-bold text-secondary text-lg mt-1 uppercase">{title}</p>
      {
        description && (
            <p className="text-md text-slate-600 leading-5">{description}</p>
        )
      }
    </div>
  );
};

export default ModalWrapper;
