import React, { useState } from "react";
import {
  Box,
  TextField,
  TextareaAutosize,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const AddVacation: React.FC = () => {
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [startsOn, setStartsOn] = useState("");
  const [endsOn, setEndsOn] = useState("");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestination(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleStartsOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartsOn(event.target.value);
  };

  const handleEndsOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndsOn(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setCoverImage(event.target.files[0]);
    }
  };

  const handleAddVacation = async (event: React.FormEvent) => {
    event.preventDefault(); 
    
    const vacationUrl = "http://localhost:3003/api/vacations";
  
    const formData = new FormData();
    formData.append("destination", destination);
    formData.append("description", description);
    formData.append("startsOn", startsOn);
    formData.append("endsOn", endsOn);
    formData.append("price", price);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
  
    try {
      const response = await axios.post(vacationUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
      });
      
      console.log(response.data);
      

      setDestination("");
      setDescription("");
      setStartsOn("");
      setEndsOn("");
      setPrice("");
      setCoverImage(null);
  
    } catch (error) {
      console.error("There was an error adding the vacation:", error);
    }
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
      <Typography variant="h4" sx={{ marginBottom: "32px" }}>
        Add Vacation
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
        onSubmit={handleAddVacation}
      >
        <TextField
          label="Destination"
          variant="outlined"
          value={destination}
          onChange={handleDestinationChange}
          required
        />
        <TextareaAutosize
          aria-label="Description"
          placeholder="Description"
          minRows={3}
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <TextField
          label="Starts On"
          type="date"
          variant="outlined"
          value={startsOn}
          onChange={handleStartsOnChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Ends On"
          type="date"
          variant="outlined"
          value={endsOn}
          onChange={handleEndsOnChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          value={price}
          onChange={handlePriceChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleCoverImageChange} />
        <Button variant="contained" color="primary" type="submit">
          Add Vacation
        </Button>
      </Box>
    </Box>
  );
};

export default AddVacation;
