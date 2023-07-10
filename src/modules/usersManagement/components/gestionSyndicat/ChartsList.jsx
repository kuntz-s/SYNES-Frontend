import React,{useEffect,useState} from "react";
import StatTitle from "../../../../components/baseComponents/StatTitle";
import PieChart from "../../../../components/baseComponents/charts/PieChart";
import BarChart from "../../../../components/baseComponents/charts/BarChart";

const ChartsList = ({universities, members}) => {
  const [chartData, setChartData] = useState([]);
  const getMembersPerUniversities = (universities,members) => {
        let res = [];
        for(let uni of universities){
          res.push(
            {
              id:uni.id,
              name:uni.nom,
              value:0
            }
          )
        }
      
      
        for(let member of members){
            const ind = res.findIndex((elt) => elt.id === member.membre.universite.id);
            res[ind] = {...res[ind], value:res[ind].value+1}
        }
        return res;
      
  }

  useEffect(() => {
   if(universities.length > 0){
    const res = getMembersPerUniversities(universities, members);
    
    setChartData(res);
   }
  },[universities,members])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 ">
      <div className="bg-white p-4 rounded-xl h-fit overflow-auto">
        <StatTitle title="Nombre de membres par université" />
        <BarChart data={chartData}/>
      </div>
      <div className="bg-white p-4 rounded-xl h-fit overflow-auto">
        <StatTitle title="Pourcentage de membres par université" />
        <PieChart data={chartData}/>
      </div>
    </div>
  );
};

export default ChartsList;
