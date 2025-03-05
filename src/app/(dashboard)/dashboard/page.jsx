"use client";
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { NetworkServices } from "@/network";

const Dashboard = () => {
  const [state, setState] = useState({
    count: {},
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboard = async () => {
      const {
        data: { data },
      } = await NetworkServices.Dashboard.Index();
      console.log(data);
      setState({ count: data });
      setLoading(false);
    };
    fetchDashboard();
  }, []);
  const [flipped, setFlipped] = useState(false);
  const userCountData = state?.count;
  return (
    <div>
      <div className="grid w-[200px] rounded-md border-[3px] border-[#555a57] transition-all duration-400 bg-gradient-radial from-[#ede6bf] shadow-md to-[#4e779a] hover:scale-105 hover:shadow-[7px_7px_green] hover:duration-200 p-2">
        <span className="font-bold text-xl">Count</span>

        {loading ? (
          <div className="space-y-2">
            {/* Skeleton Loader */}
            {[1, 2, 3, 4, 5].map((item, i) => (
              <div
                className="flex justify-between items-center p-2 mb-1 animate-pulse"
                key={i}
              >
                <div className="h-5 bg-gray-300 w-1/3 rounded-md"></div>
                <div className="h-5 bg-gray-300 w-1/4 rounded-md"></div>
              </div>
            ))}
          </div>
        ) : (
          Object.entries(userCountData).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center py-1 border-b last:border-none"
            >
              <span className="text-lg font-semibold text-gray-700">{key}</span>
              <span
                className={`text-xl font-bold ${value >= 1 ? "text-green-500" : "text-red-500"}`}
              >
                {value}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
