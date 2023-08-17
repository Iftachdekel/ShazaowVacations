import React, { useEffect, useState } from "react";
import {Box, TextField, TextareaAutosize, Button,Typography} from "@mui/material";
import { VacationType } from "../../types/VacationType";
import { getOneVacation, updatVacation } from "../../services/vacationsServices";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/userSlice";


const UpdateVacation = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const onCancel = () => {navigate("/tours")};
  const {register,handleSubmit} = useForm<VacationType>();
  const [currentVacation , setCurrentVacatin] = useState<VacationType>()
  const {id} = useParams()
  const handleUpdateVacation = async (vacation:VacationType) => {
    if(id && user && user.token){
      try {
        console.log(vacation);
        console.log(id)
          await updatVacation(vacation, +id,user.token).then(()=>{navigate('/home')});
      
      } catch (error) {
        console.error("Error updating vacation:", error);
      }
    }
    }
    
  useEffect(() =>{
    const fetchVac = async () =>{
      if(id){
        await getOneVacation(+id).then(vac => setCurrentVacatin(vac) )
        .catch(err => console.log(err))
      }
    }
    fetchVac()
  }, [])

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
        Update Vacation
      </Typography>
      <Box onSubmit={handleSubmit(handleUpdateVacation)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="Destination"
          variant="outlined"
          type="text"
          {...register("destination")}
          required
        />
        <TextareaAutosize
          aria-label="Description"
          placeholder="Description"
          minRows={3}
          {...register("description")}
          required
        />
        <TextField
          label="Starts On"
          type="date"
          variant="outlined"
          {...register("startOn")}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Ends On"
          type="date"
          variant="outlined"
          {...register("endOn")}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          {...register("price")}
          required
        />
        <input type="file" accept="image/*" {...register("imageFile")} />
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Button
              type="submit"
            variant="contained"
            color="primary">
            Update
          </Button>
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateVacation;
