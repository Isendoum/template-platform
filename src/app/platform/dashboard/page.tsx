"use client";
import XYGraph from "@/components/core/graphs/XYGraph";

import { useCallback, useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState<any>([]);

  const fetchData = useCallback(() => {
    const data1 = [
      { x: "2023-04-15", y: 6 },
      { x: "2023-05-19", y: 15 },
      { x: "2023-06-09", y: 20 },
      { x: "2023-07-09", y: 30 },
      // ... add more data points as needed
    ];

    setTimeout(() => {
      setData(data1);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-[100%] max-h-[100%]">
      <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased mb-4">
        Dashboard
      </h1>
      <XYGraph
        data={data}
        width={400}
        height={400}
        xAxisLabel="Date"
        yAxisLabel="Price"
        graphTitle="Prices"
      />
    </div>
  );
};
export default Dashboard;
