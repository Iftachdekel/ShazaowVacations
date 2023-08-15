import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";

const AdminCharts: React.FC = () => {
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/chartData");
        const data = await response.json();

        // Process the data into the format expected by the chart library
        const chartLabels = data.map((entry: any) => entry.destination);
        const chartDataPoints = data.map((entry: any) => entry.followersCount);

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Number of Followers",
              data: chartDataPoints,
              backgroundColor: "rgba(75, 192, 192, 0.6)", // Set the chart bar color
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "32px" }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ maxWidth: "800px" }}>
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          Number of Users Following Each Tour
        </Typography>

        {/* Render the chart */}
        <Bar
          data={chartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Followers",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Tours",
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AdminCharts;
