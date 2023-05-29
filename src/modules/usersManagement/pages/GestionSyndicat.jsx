import React from "react";
import { HelmetProvider } from "react-helmet-async";
import Helmet from "../../../components/Helmet/Helmet";
import GestionSyndicatComponent from "../components/gestionSyndicat/GestionSyndicatComponent";

const GestionSyndicat = () => {
  return (
    <HelmetProvider>
      <Helmet
        title="Dashboard-Gestion-Syndicat"
        description="dashboard synes"
      />
      <section className="w-full ">
        <div className="text-center md:text-start">
          <p className="font-roboto text-slate-700 text-md">
            Bienvenue{"  "}
            <span className="capitalize text-xl font-semibold text-secondary leading-5 tracking-wide">
              Nchouwet Stephane
            </span>
          </p>
          <p className="text-slate-700 text-md mt-1">Vous ètes connectés en tant que <span className="text-secondary font-bold"> sécrétaire section synes</span></p>
        </div>
        <GestionSyndicatComponent />
      </section>
    </HelmetProvider>
  );
};

export default GestionSyndicat;
