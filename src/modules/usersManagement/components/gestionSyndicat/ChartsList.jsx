import React from "react";
import StatTitle from "../../../../components/baseComponents/StatTitle";
import PieChart from "../../../../components/baseComponents/charts/PieChart";
import BarChart from "../../../../components/baseComponents/charts/BarChart";

const ChartsList = () => {

    const data = [
        { name: "Université de yaoundé 1", value: 20 },
        { name: "Université de Soa", value: 15 },
        { name: "Université de dschand", value: 5 },
        { name: "Université de douala", value: 5 }
      ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 my-6">
      <div className="bg-white p-4 rounded-xl h-fit overflow-auto">
        <StatTitle title="Nombre de membres par université" />
        <BarChart data={data}/>
      </div>
      <div className="bg-white p-4 rounded-xl h-fit overflow-auto">
        <StatTitle title="Pourcentage de membres par université" />
        <PieChart data={data}/>
      </div>
    </div>
  );
};

export default ChartsList;
