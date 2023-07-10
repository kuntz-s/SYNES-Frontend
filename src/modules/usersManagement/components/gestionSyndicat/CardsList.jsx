import React from "react";
import CardInfo from "./CardInfo";
import { FaSchool } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { TbHierarchy3 } from "react-icons/tb";
import StatTitle from "../../../../components/baseComponents/StatTitle";

const CardsList = ({ members, universités, organes, membres }) => {
  const dataCardList = [
    {
      name: "Nombre de membres du SYNES",
      value: members,
      icon: <MdGroups className="scale-[1.3]" />,
      color: "#0ea5e9",
      backgroundColor: "#bae6fd",
    },
    {
      name: "Nombre d'universités du SYNES",
      value: universités,
      icon: <FaSchool />,
      color: "#f97316",
      backgroundColor: "#ffedd5",
    },
    {
      name: "Nombre d'organes du SYNES",
      value: organes,
      icon: <TbHierarchy3 />,
      color: "#a855f7",
      backgroundColor: "#f3e8ff",
    },
  ];
  return (
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  [&>*]:rounded-lg">
          {dataCardList.map((card, id) => {
            return <CardInfo key={id} data={card} />;
          })}
        </div>
  );
};

export default CardsList;
