import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../AuthContext/AuthContext";

export const TourCard: React.FC<{
  tour: { startOn: Date, name: string; image: string; description: string; price: string };
}> = ({ tour }) => {
  const user = useAuth();
  console.log(typeof tour.startOn);


  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "250px",
        height: "340",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
      }}

    >
      <Typography variant="caption" sx={{ position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)" }}>
        {tour.startOn.toISOString().split('T')[0]} {/* Add this line */}
      </Typography>
      <IconButton
        sx={{ position: "absolute", top: "8px", right: "8px" }}
        color="error"
        aria-label="Add to favorites"
      >
        <FavoriteIcon />
      </IconButton>

      <IconButton
        sx={{ position: "absolute", top: "8px", left: "8px" }}
        color="primary"
        aria-label="Edit"
      >
        <EditIcon />
      </IconButton>

      <IconButton
        sx={{ position: "absolute", bottom: "8px", right: "8px" }}
        color="error"
        aria-label="Delete"
      >
        <DeleteIcon />
      </IconButton>
      

      <img
        src={tour.image}
        alt={tour.name}
        style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
      />
      <Typography variant="h5" sx={{ marginTop: "16px" }}>
        {tour.name}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "8px" }}>
        {tour.description}
      </Typography>
      <Typography variant="h6" sx={{ marginTop: "8px" }}>
        {tour.price}
      </Typography>
    </Box>
  );
};
