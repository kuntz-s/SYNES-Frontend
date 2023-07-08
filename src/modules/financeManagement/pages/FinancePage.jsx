import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getSoldeBancaire } from "../../../redux/gestionSoldeSlice";
import { getListeTransactions } from "../../../redux/gestionTransactionSlice";


const FinancePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { solde } = useSelector((state) => state.gestionSolde);
  const { transactions } = useSelector((state) => state.gestionTransaction);

  useEffect(() => {
    dispatch(getSoldeBancaire());
    dispatch(getListeTransactions());
  }, []);
  return (
    <section className="min-h-screen w-full p-8 ">
      <div className="text-center mt-8">
        <p className="text-lg">Solde bancaire</p>
        <p className="font-extrabold mt-1">
          <span className="text-6xl ">{solde}</span>
          <span className="">Frc/cfa</span>
        </p>
      </div>
      <p className="text-center uppercase  mt-6 font-medium text-lg text-slate-600">TRANSACTIONS</p>
      <div className="flex flex-col items-center justify-start w-full ">
        {transactions.map((trans, id) => {
          return (
            <div key={id} className="flex justify-start items-center shadow shadow-lg border-2 border-slate-100 rounded-md py-2 px-4 my-2 w-[400px]">
              <div className="[&>*]:scale-[1.5]  mr-3">
                <FaArrowUp
                  className={`text-green-600 ${trans.type !== "ajout" && "hidden"}`}
                />
                <FaArrowDown
                  className={`text-red-600 ${trans.type !== "retrait" && "hidden"}`}
                />
              </div>
              <div>
                <p>{trans.type === "ajout"? "Ajout" : "Retrait"} de <span className="font-medium text-lg">{trans.montant} frc</span></p>
                <p>Par <span className="font-medium text-md text-secondary hover:cursor-pointer capitalize hover:underline" onClick={() => navigate("/social/profil/"+trans.membre.id)}>{trans.membre.noms +  " "+ trans.membre.prenom}</span></p>
                <p>Pour <span className="font-medium text-lg">{trans.evenements.nom}</span></p>
                </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FinancePage;
