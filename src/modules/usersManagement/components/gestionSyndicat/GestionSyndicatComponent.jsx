import React from "react";
import CardsList from "./CardsList";
import ProfileCard from "./ProfileCard";
import ChartsList from "./ChartsList";
import UniversitiesList from "./UniversitiesList";
import OrgansList from "./OrgansList";
import RolesList from "./RolesList";

const GestionSyndicatComponent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
      <div className="md:col-span-3 [&>*]:mb-6">
        <CardsList universités={10} organes={5} membres={50} />
        <ChartsList />
        <UniversitiesList />
        <OrgansList />
        <RolesList/>
      </div>
      <div>
        <ProfileCard />
      </div>
    </div>
  );
};

export default GestionSyndicatComponent;
