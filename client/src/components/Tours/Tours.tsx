import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { FilterType, VacationType } from "../../types/VacationType";
import {
  getAllActiveVacations,
  getAllFavVacations,
  getAllFutureVacations,
  getAllVacations,
} from "../../services/vacationsServices";
import { useAuth } from "../AuthContext/AuthContext";
import '../Home/style.css'
import { appConfig } from "../../utils/appConfig";
import DestinationCard from "../Home/DestinationCard";
import { useNavigate } from "react-router-dom";


const Tours: React.FC = () => {

  const navigate = useNavigate()
  const [vacations, setVacations] = useState<VacationType[] | null>(null);
  const [filterType, setFilterType] = useState<FilterType>("All");
  const user = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const vacationsPerPage = 10;
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCardRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      alert('you must logged in first');
      navigate('/home')
      return;  // exit the useEffect early
    }
    const fetchData = async () => {
      try {
        let response: VacationType[] = [];

        if (filterType === "All") {
          response = await getAllVacations();
        } else if (filterType === "Fav" && user && user.user) {
          response = await getAllFavVacations(+user?.user?.id);
        } else if (filterType === "Active") {
          response = await getAllActiveVacations();
        }else if (filterType === "Future") {
          response = await getAllFutureVacations();
        }

        setVacations(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filterType, user, refreshKey]);

  const constructImageUrl = (imageName: string) => {
    if (imageName.startsWith("http")) return imageName;
    return `${appConfig.baseUrl}/assets/${imageName}`;
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacations?.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const totalPages = Math.ceil((vacations?.length || 0) / vacationsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "32px", fontFamily: 'Crafter, sans-serif' }}>
        Welcome {user.user?.username}</Typography>

      <Typography variant="h2" sx={{ marginBottom: "32px", fontFamily: 'Crafter, sans-serif' }}>
        Check out Our Tours</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
        }}
      >
        

        {user && user.user?.role === "user" &&        <Typography variant="h6" sx={{ marginBottom: "32px", fontFamily: 'Crafter, sans-serif' }}>
        Show only My Favorites 
        <Checkbox
          color="secondary"
          sx={{ marginRight: "80px" }}
          checked={filterType === "Fav"}
          onChange={() => setFilterType(filterType === "Fav" ? "All" : "Fav")}
        />
        </Typography>}

        <Typography variant="h6" sx={{ marginBottom: "32px", fontFamily: 'Crafter, sans-serif' }}>
          Show only active vacations 
        <Checkbox
          color="secondary"
          sx={{ marginRight: "8px" }}
          checked={filterType === "Active"}
          onChange={() => setFilterType(filterType === "Active" ? "All" : "Active")}
        />
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: "32px", fontFamily: 'Crafter, sans-serif' }}>
          Show only future vacations 
        <Checkbox
          color="secondary"
          sx={{ marginRight: "8px" }}
          checked={filterType === "Future"}
          onChange={() => setFilterType(filterType === "Future" ? "All" : "Future")}
        />
        </Typography>

      </Box>

      {/* Render popular destinations */}
      <Box>
        {currentVacations ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {currentVacations.map((item) => (
              <DestinationCard
                key={item.id}
                id={item.id}
                startOn={item.startOn}
                endOn={item.endOn}
                name={item.destination}
                price={item.price}
                image={constructImageUrl(item.imageFile)}
                description={item.description}
                onFavoriteClick={handleCardRefresh}
                setRefreshKey={setRefreshKey}

              />
            ))}
          </Box>
        ) : (
          <p>Loading...</p>
        )}

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Button
                key={page}
                variant={page === currentPage ? "contained" : "outlined"}
                onClick={() => handlePageChange(page)}
                sx={{ margin: "0 4px" }}
              >
                {page}
              </Button>
            )
          )}
        </Box>
      </Box>
    </Box>

  );
};

export default Tours;
