import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { getMembersList } from "../../../redux/gestionMembreSlice";
import { getUniversitiesList, getOrgansList, getRolesList, getPermissionsList } from "../../../redux/gestionSyndicatSlice";
import Helmet from "../../../components/Helmet/Helmet";
import GestionSyndicatComponent from "../components/gestionSyndicat/GestionSyndicatComponent";

const GestionSyndicat = () => {
  const dispatch = useDispatch();
  const { universities, organs, roles, permissions } = useSelector(
    (state) => state.gestionSyndicat
  );
  const { members } = useSelector((state) => state.gestionMembre);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  useEffect(() => {
    dispatch(getUniversitiesList());
    dispatch(getOrgansList());
    dispatch(getRolesList());
    dispatch(getPermissionsList());
    dispatch(getMembersList())
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
              {userInfo.membre.noms + " "+userInfo.membre.prenom}
            </span>
          </p>
          <p className="text-slate-700 text-md mt-1">
            Vous ètes connectés en tant que{" "}
            <span className="text-secondary font-bold">
              {" "}
              {userInfo.membre.role.nom}
            </span>
          </p>
        </div>
        <GestionSyndicatComponent members={members} universities={universities} organs={organs} roles = {roles} permissions={permissions} />
      </section>
    </HelmetProvider>
  );
};

export default GestionSyndicat;
