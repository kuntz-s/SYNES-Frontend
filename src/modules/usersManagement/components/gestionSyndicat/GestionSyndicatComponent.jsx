import React from "react";
import CardsList from "./CardsList";
import ChartsList from "./ChartsList";
import UniversitiesList from "./universités/UniversitiesList";
import OrgansList from "./organes/OrgansList";
import RolesList from "./roles/RolesList";

const GestionSyndicatComponent = () => {
  return (
    <div className="my-6  [&>*]:mb-6">
        <CardsList universités={10} organes={5} membres={50} />
        <ChartsList />
        <UniversitiesList />
        
        <OrgansList />
        <RolesList/> 
    </div>
  );
};

export default GestionSyndicatComponent;
