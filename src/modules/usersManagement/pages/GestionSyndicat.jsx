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
          <p className="font-roboto text-slate-500 text-md">Bienvenue</p>
          <p className="capitalize text-2xl font-semibold text-slate-800 leading-5 tracking-wide">
            Nchouwet Stephane
          </p>
        </div>
       <GestionSyndicatComponent/>
      </section>
    </HelmetProvider>
  );
};

export default GestionSyndicat;
