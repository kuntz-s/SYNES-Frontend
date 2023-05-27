import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BarChart as RechartBarChart, Bar, Tooltip, XAxis, YAxis,Legend } from "recharts";



const BarChart = ({data}) => {
  
  const smScreen = useMediaQuery("(max-width:767px)");
  return (
    <RechartBarChart width={smScreen?250:300} height={350} data={data}>
      <XAxis dataKey="name" textAnchor="end" angle={-30} height={70} style={{fontSize:"11px"}}/>
      <YAxis />
      <Bar dataKey="value" fill="#8884d8" />
      <Tooltip />
    </RechartBarChart>
  );
}

export default BarChart;
