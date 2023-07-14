import React from "react";
import CardsList from "./CardsList";
import ChartsList from "./ChartsList";
import UniversitiesList from "./universités/UniversitiesList";
import OrgansList from "./organes/OrgansList";
import RolesList from "./roles/RolesList";

const GestionSyndicatComponent = ({members,universities, organs, roles, permissions}) => {
  return (
    <div className="my-6  [&>*]:mb-6">
        <CardsList members={members.length} universités={universities.length} organes={organs.length} membres={50} />
        <ChartsList universities={universities} members={members} />
        <UniversitiesList universities={universities} />
        
        <OrgansList organs={organs}/>
        <RolesList roles = {roles} organs={organs} permissions={permissions}/> 
    </div>
  );
};

export default GestionSyndicatComponent;
