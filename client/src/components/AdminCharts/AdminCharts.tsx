import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { appConfig } from "../../utils/appConfig";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AdminCharts: React.FC = () => {
  const [chartData, setChartData] = useState<any>({});
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(appConfig.vacationUrl + "/chartdata");
            const responseData = await response.json();
            
            const chartLabels = responseData.map((entry: any) => entry.destination);
            const chartDataPoints = responseData.map((entry: any) => entry.count);
            
            const canvasContext = document.createElement("canvas").getContext("2d");
            let gradient: CanvasGradient | null = null;
            if (canvasContext) {
                gradient = canvasContext.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, "rgba(243, 68, 53, 1)");  // Bright Red
                gradient.addColorStop(1, "rgba(243, 159, 53, 1)"); // Orange
            }
            
            setChartData({
                labels: chartLabels,
                datasets: [
                    {
                        label: "How many people following this",
                        data: chartDataPoints,
                        backgroundColor: gradient ? gradient : "rgba(243, 159, 53, 1)",
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    fetchData();
}, []);
;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: "40px" }}>
      </Typography>
      
      <Box sx={{ width: "70%", height:"80%" }}>  {/* Increase chart width */}
        <Typography variant="h5" sx={{ marginBottom: "24px" }}>

        </Typography>

        {chartData.labels ? (
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of Followers",
                    font: {
                      size: 24,  // Increase font size
                    },
                  },
                  grid: {
                    color: "rgba(255, 255, 255, 0.04)",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "the vacations",
                    font: {
                      size: 18,  // Increase font size
                    },
                  },
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AdminCharts;
