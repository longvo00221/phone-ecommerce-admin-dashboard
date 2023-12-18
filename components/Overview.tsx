import { priceFormat } from "@/lib/utils";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface OverviewProps {
  data: any[];
}

const Overview = ({ data }: OverviewProps) => {
  // Group orders by month and calculate total for each month
  const monthlyData = data?.reduce((acc, order) => {
    const month = new Date(order.created_date).toLocaleString('en-US', { month: 'numeric' });
    acc[month] = (acc[month] || 0) + order.total;
    return acc;
  }, {});

  // Convert grouped data to an array for the bar chart
  const chartData = Object.keys(monthlyData).map(month => ({
    name: `Month ${month}`,
    total: monthlyData[month],
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${priceFormat.format(value)}`}
        />
        <Tooltip formatter={(value) => priceFormat.format(Number(value))} />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
