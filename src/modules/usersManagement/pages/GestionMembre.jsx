import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router";
import Helmet from "../../../components/Helmet/Helmet";
import { getMembersList } from "../../../redux/gestionMembreSlice";
import MembersListTable from "../components/gestionMembres/MembersListTable";

const acceptedPermissions = [
  "Attributtion role systeme",
  "Attributtion role organe",
];

const GestionMembre = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {members} = useSelector(state => state.gestionMembre);
  const [permCirconscription, setPermCirconscription] = useState("");
  const [restrictMembers, setRestrictMembers] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const list = user.listPermission;
      const systemRole = list.find((elt) => elt === acceptedPermissions[0]);
      const organRole = list.find((elt) => elt === acceptedPermissions[1]);
      if (!systemRole && !organRole) {
        navigate("/social");
      } else {
        systemRole
          ? setPermCirconscription(systemRole)
          : setPermCirconscription(organRole);
          dispatch(getMembersList(members))
          user.membre.role.organe.universite.id !== 0 && setRestrictMembers(true);
      }
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet title="Dashboard-Gestion-Membres" description="dashboard synes" />
      <section>
        <p className="text-center uppercase text-xl text-secondary font-bold">
          {" "}
          Liste des membres
        </p>
        <p className="text-center text-md pt-1 ">
          Liste des membres présent dans{" "}
          <span className="font-bold text-secondary">
            {!restrictMembers
              ? "tout le système"
              : "votre organe"}
          </span>{" "}
        </p>
        <MembersListTable listeMembres={!restrictMembers? members : members.filter(elt => elt.membre.universite.id === user.membre.role.organe.universite.id)} restrict ={restrictMembers}/>
      </section>
    </HelmetProvider>
  );
};

export default GestionMembre;
