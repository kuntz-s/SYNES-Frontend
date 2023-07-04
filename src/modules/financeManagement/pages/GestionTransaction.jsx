import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMembersList } from "../../../redux/gestionMembreSlice";
import { getListeEvenements } from "../../../redux/gestionEvenementSlice";
import { getListeTransactions , postTransaction, resetTransaction} from "../../../redux/gestionTransactionSlice";
import Helmet from "../../../components/Helmet/Helmet";
import Button from "../../../components/baseComponents/Button";
import TransactionListTable from "../components/gestionTransactions/TransactionListTable";
import TransactionModal from "../components/gestionTransactions/TransactionModal";
import noTransaction from "../../../assets/img/transaction.svg";

const GestionTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [open, setOpen] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState({
    montant: 0,
    type: "ajout",
    raison: "",
    membre: "",
    evenement: "",
  });
  const { members } = useSelector((state) => state.gestionMembre);
  const { events } = useSelector((state) => state.gestionEvenement);
  const { transactions , transactionLoading, transactionError, transactionSuccess} = useSelector((state) => state.gestionTransaction);

  useEffect(() => {
    const verify = user.listPermission.find(
      (perm) => perm === "Gestion transaction"
    );
    if (!verify) {
      navigate("/social/actualite");
    } else {
      dispatch(getListeTransactions());
    }
  }, []);

  useEffect(() => {
    if (transactionError && !transactionSuccess) {
      handleClose();
      setTimeout(() => {
        toast.error("Une erreur est survenue lors de l'ajout de la transaction", {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }, 200);
      dispatch(resetTransaction());
    } else if (transactionSuccess && !transactionError) {
      handleClose();
      setTimeout(() => {
        toast.success("Transaction ajouté avec succès", {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }, 200);
      dispatch(getListeTransactions());
      dispatch(resetTransaction());
    }
  }, [transactionError, transactionSuccess]);


  const handleOpen = () => {
    dispatch(getMembersList());
    dispatch(getListeEvenements());
    setOpen(true);
  };
  const handleClose = () => {
    setTransactionInfo({
      montant: 0,
      type: "ajout",
      raison: "",
      membre: "",
      evenement: "",
    })
    setOpen(false);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTransactionInfo({ ...transactionInfo, [name]: value });
  };

  const handleAdd = () => {
    const membre = members.find((elt) => elt.membre.email === transactionInfo.membre);
    const evenement = events.find((elt) => elt.nom === transactionInfo.evenement);
    let data = {montant:parseInt(transactionInfo.montant), type:transactionInfo.type, raison:transactionInfo.raison,membre:{id:membre.id}, evenements:{id:evenement.id}}
    dispatch(postTransaction(data))
  }

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
              handleClick={handleOpen}
              filled={true}
              className=" font-semibold bg-secondary mt-4 mx-auto border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
            />
          </div>
        ) : (
          <div>
            <TransactionListTable data={transactions} handleOpen={handleOpen} />
          </div>
        )}
      </section>
      <TransactionModal
        open={open}
        data={transactionInfo}
        isLoading = {transactionLoading}
        listEvenements={events}
        listMembre={members}
         addTransaction={handleAdd} 
        handleChange={handleChange}
        handleClose={handleClose}
      />
      <ToastContainer />
    </HelmetProvider>
  );
};

export default GestionTransaction;
