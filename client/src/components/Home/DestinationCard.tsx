import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
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
  price:number
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
  price,
  setRefreshKey
}) => {

  const user = useAuth()
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate()

  

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
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    
    if (isConfirmed) {
      deleteVacation(id);
      setRefreshKey(prev => prev + 1)

      console.log("Item deleted!");
    } else {
      console.log("Delete operation was cancelled.");
    }    

    // const token = user.token;
      


  }




  const toggleFavorite = () => {
    setIsFavorite((prevFavorite) => {
      let newState = !prevFavorite
      
      try {
        if (user.user?.id && user.user.token) {
          let userID = user.user?.id
          if (newState) {
            console.log('hi')
            addUserFavoriteVacation(+userID, id, user.user.token)
          }
          else {
            removeUserFavoriteVacation(+userID, id, user.user.token)
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
      <div className="boxContainer"><Chip className="priceChip" color="secondary" label={price+'$'}></Chip></div>
      
    </Box>
  );
};

export default DestinationCard;
