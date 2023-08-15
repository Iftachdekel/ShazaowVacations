import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addUserFavoriteVacation, getUserFavoriteVacationStatus, removeUserFavoriteVacation } from "../../services/usersServices";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/userSlice";
import { deleteVacation } from "../../services/vacationsServices";
import { useAuth } from "../AuthContext/AuthContext";

interface User {
  role: "user" | "admin";
  username: string;
}


type DestinationCardProps = {
  name: string;
  image: string;
  description: string;
  id: number;
  onFavoriteClick: any;
  startOn: Date
  endOn: Date
  setRefreshKey: (value: React.SetStateAction<number>) => void
};


const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  image,
  description,
  id,
  onFavoriteClick,
  startOn,
  endOn,
  setRefreshKey
}) => {

  const user = useAuth()
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate()

  // const { user, logout } = useAuth();

  useEffect(() => {


    const fetchFavoriteStatus = async () => {
      try {
        if (user?.user?.id && user.token) {
          let userID = +user?.user.id;
          const token = user.token
          const favoriteStatus = await getUserFavoriteVacationStatus(userID, id, token);
          setIsFavorite(favoriteStatus);
        }
      } catch (err) {
        console.log(err);
      }
    };

    user.user?.role === "user" && fetchFavoriteStatus();
  }, []); // Run the effect when user or id changes

  const handleEditClick = (id: number) => {
    navigate(`/edit/${id}`);

  }
  const handleDelete = (id: number) => {
    
    console.log("Trying to delete id:", id);
    // const token = user.token;
      deleteVacation(id);
      setRefreshKey(prev => prev + 1)
      


  }




  const toggleFavorite = () => {
    setIsFavorite((prevFavorite) => {
      let newState = !prevFavorite
      try {
        if (user.user?.id && user.token) {
          let userID = user.user?.id
          if (newState) {
            addUserFavoriteVacation(+userID, id, user.token)
          }
          else {
            removeUserFavoriteVacation(+userID, id, user.token)
          }
        }
        onFavoriteClick();
      }
      catch (err) {
        console.log(err)
      }

      return newState
    }
    );
  };

  return (
    <Box sx={{ border: "1px solid #ccc", padding: "16px", position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        {user?.user?.role === "user" && (
          <><Typography variant="h6" className="date">
            {startOn.toString().split('T')[0]}    -    {endOn.toString().split('T')[0]}
          </Typography>

            <IconButton
              color="error"
              aria-label="Add to favorites"
              onClick={toggleFavorite}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton></>
        )}
        {user?.user?.role === "admin" && (
          <div>
            <Typography display={"inline-flex"} variant="h6" className="date">
              {startOn.toString().split('T')[0]}    -    {endOn.toString().split('T')[0]}
            </Typography>
            <IconButton
            sx={{marginRight:'auto'}}
              color="primary"
              aria-label="Edit"
              onClick={() => handleEditClick(id)}
              className="editIcon"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              className="deleteIcon"
              color="error"
              aria-label="Delete"
              onClick={() => handleDelete(id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </Box>
      <img src={image} alt={name} style={{ width: "100%" }} />
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginTop: "8px" }}>
        {name}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
};

export default DestinationCard;
