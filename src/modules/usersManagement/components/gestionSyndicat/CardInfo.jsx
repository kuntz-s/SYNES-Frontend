import React from "react";
import CountUp from "react-countup";

const CardStat = ({data}) => {
  return (
    <div className="bg-white p-4 flex items-center" style={{backgroundColor:data.backgroundColor}}>
        <div className="p-3 rounded-full text-xl mr-4 text-white" style={{ backgroundColor:data.color}}>
            {data.icon}
        </div>
        <div className=" break-word">
        <p className="text-primary font-bold text-2xl"><CountUp end={data.value}/></p>
        <p className="text-md text-gray leading-5">{data.name}</p>
        </div>
    </div>
  );
};

export default CardStat;
