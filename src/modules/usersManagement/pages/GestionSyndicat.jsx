import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { getUniversitiesList, getOrgansList, getRolesList, getPermissionsList } from "../../../redux/gestionSyndicatSlice";
import Helmet from "../../../components/Helmet/Helmet";
import GestionSyndicatComponent from "../components/gestionSyndicat/GestionSyndicatComponent";

const GestionSyndicat = () => {
  const dispatch = useDispatch();
  const { universities, organs, roles, permissions } = useSelector(
    (state) => state.gestionSyndicat
  );
  useEffect(() => {
    dispatch(getUniversitiesList());
    dispatch(getOrgansList());
    dispatch(getRolesList());
    dispatch(getPermissionsList())
  }, [dispatch]);
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
          <p className="text-slate-700 text-md mt-1">
            Vous ètes connectés en tant que{" "}
            <span className="text-secondary font-bold">
              {" "}
              sécrétaire section synes
            </span>
          </p>
        </div>
        <GestionSyndicatComponent universities={universities} organs={organs} roles = {roles} permissions={permissions} />
      </section>
    </HelmetProvider>
  );
};

export default GestionSyndicat;
