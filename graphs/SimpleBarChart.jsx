import { sampleData } from "@/utils/constants";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



const Rectangle = (props) => {
  const { x, y, width, height, fill, stroke } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
    />
  );
};

export default function SimpleBarChart({ data }) {
  const chartData = data ? data : sampleData;
  return (
    <ResponsiveContainer width={'50%'} height={100} >
      <BarChart data={chartData} >
      <Tooltip />
        <Bar dataKey="pv" fill="#E8AA33" shape={<Rectangle />} />
        <Bar dataKey="uv" fill="#808080" shape={<Rectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
}
