import React from "react";
import CardsList from "./CardsList";
import ChartsList from "./ChartsList";
import UniversitiesList from "./universités/UniversitiesList";
import OrgansList from "./organes/OrgansList";
import RolesList from "./roles/RolesList";

const GestionSyndicatComponent = ({universities, organs}) => {
  return (
    <div className="my-6  [&>*]:mb-6">
        <CardsList universités={universities.length} organes={organs.length} membres={50} />
        <ChartsList  />
        <UniversitiesList universities={universities} />
        
        <OrgansList organs={organs}/>
        <RolesList/> 
    </div>
  );
};

export default GestionSyndicatComponent;
