import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PieChart as RechartPieChart, Pie, Sector, Tooltip, Cell } from "recharts";
import COLORS from "../../colorsList/colors.json";
import ChartLegend from "./ChartLegend";



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

 const PieChart = ({data}) => {
  
  const smScreen = useMediaQuery("(max-width:767px)");
  return (
    <div>
      <RechartPieChart width={smScreen?250:330} height={250}>
      
      <Pie
        data={data}
        cx={smScreen?100:200}
        cy={120}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length].hex} />
        ))}
      </Pie>
      <Tooltip />
    </RechartPieChart>
    <ChartLegend data={data} colors={COLORS}/>
    </div>
  );
}

export default PieChart;