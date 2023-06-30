import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Helmet from "../../../components/Helmet/Helmet";
import Button from "../../../components/baseComponents/Button";
import noTransaction from "../../../assets/img/transaction.svg";

const GestionTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const transactions = [];
  
  return (
    <HelmetProvider>
      <Helmet
        title="Dashboard-Gestion-Transaction"
        description="dashboard synes"
      />
      <section>
        <p className="text-center uppercase text-xl text-secondary font-bold">
          {" "}
          Liste des transactions
        </p>
      

        {transactions.length === 0 ? (
          <div className="flex flex-col h-[80vh] justify-center items-center text-center">
            <img
              src={noTransaction}
              height={320}
              width={320}
              alt="event illustration"
            />
            <p className="text-lg mt-2">
              Aucune transaction pour le moment dans le système
            </p>

            <Button
              title="Nouvelle transaction"
              icon={<BsPlus className="mr-2 scale-[1.8]" />}
              handleClick={() => {alert("j")}}
              filled={true}
              className=" font-semibold bg-secondary mt-4 mx-auto border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
            />
          </div>
        ) : (
          <div>
            <p>Il y'a une transaction</p>
          </div>
        )}
      </section>
      <ToastContainer />
    </HelmetProvider>
  );
};

export default GestionTransaction;
