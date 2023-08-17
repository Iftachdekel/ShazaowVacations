import React, { useRef, useState } from "react";
import { TextField, TextareaAutosize, Button, Box } from "@mui/material";
import { VacationType } from "../../types/VacationType";
import { addNewVacation } from "../../services/vacationsServices";
import { useNavigate } from "react-router-dom";

const AddTourForm = () => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedOnDate, setSelectedOnDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const [tour, setTour] = useState<VacationType>({
    id: 0,
    destination: "",
    description: "",
    startOn: new Date(),
    endOn: new Date(),
    price: 0,
    imageFile: "",
    imageName: "",
  });

  const handleOnDateChange = (e: any) => {
    setSelectedOnDate(e.target.value);
    setTour((prevTour) => ({
      ...prevTour,
      startOn: e.target.value,
    }));
  };

  const handleEndDateChange = (e: any) => {
    setSelectedEndDate(e.target.value);
    setTour((prevTour) => ({
      ...prevTour,
      endOn: e.target.value,
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTour((prevTour) => ({
      ...prevTour,
      [name]: value,
    }));
  };
  
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Perform any necessary form validation or data submission here
    console.log(tour);
    addNewVacation(tour)
      .then((res) => {
                navigate('/tours'); 
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setTour((prevTour) => ({
      ...prevTour,
      imageFile: file,
      imageName: file.name,
    }));
  };
  const handleOpenFileInput = () => {
    fileInputRef !== null &&
      fileInputRef.current !== null &&
      fileInputRef.current.click();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Destination"
          name="destination"
          value={tour.destination}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextareaAutosize
          // label="Description"
          name="description"
          value={tour.description}
          onChange={handleChange}
          minRows={3}
          placeholder="Enter description"
          style={{ width: "100%", marginTop: 10 }}
        />
        <TextField
          label="From Date"
          name="fromDate"
          value={tour.startOn}
          onChange={handleOnDateChange}
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="To Date"
          name="toDate"
          value={tour.endOn}
          onChange={handleEndDateChange}
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Price"
          name="price"
          value={tour.price}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <TextField
          label="Image"
          name="image"
          value={tour.imageName}
          InputProps={{
            readOnly: true,
            onClick: handleOpenFileInput,
          }}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Tour
        </Button>
      </form>
    </Box>
  );
};

export default AddTourForm;
