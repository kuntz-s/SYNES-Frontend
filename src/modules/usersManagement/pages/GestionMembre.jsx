import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router";
import Helmet from "../../../components/Helmet/Helmet";
import { getMembersList } from "../../../redux/gestionMembreSlice";
import MembersListTable from "../components/gestionMembres/MembersListTable";
import { getUniversitiesList, getRolesList } from "../../../redux/gestionSyndicatSlice";

const acceptedPermissions = [
  "Attributtion role systeme",
  "Attributtion role organe",
  "Création membre"
];

const GestionMembre = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { members } = useSelector((state) => state.gestionMembre);
  const { universities, roles } = useSelector((state) => state.gestionSyndicat);
  const [restrictMembers, setRestrictMembers] = useState(true);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const list = user.listPermission;
      const systemRole = list.find((elt) => elt === acceptedPermissions[0]);
      const organRole = list.find((elt) => elt === acceptedPermissions[1]);
      const memberRole = list.find((elt) => elt === acceptedPermissions[2])
      if (!systemRole && !organRole && !memberRole) {
       navigate("/social");
      } else {
        dispatch(getMembersList(members));
         systemRole  && setRestrictMembers(false);
        if(universities.length === 0){
          dispatch(getUniversitiesList())
        }
        if(roles.length === 0){
          dispatch(getRolesList())
        }
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
            {!restrictMembers ? "tout le système" : "votre organe"}
          </span>{" "}
        </p>
        <MembersListTable
          listeMembres={
            !restrictMembers
              ? members
              : members.filter(
                  (elt) =>
                    user.membre.universite.id ===
                    elt.membre.role.organe.universite.id
                )
          }
          restrict={restrictMembers}
          universities ={universities}
          roles={roles}
          user={user}
        />
      </section>
    </HelmetProvider>
  );
};

export default GestionMembre;
