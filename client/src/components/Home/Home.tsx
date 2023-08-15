
import { Box, Button, Typography } from "@mui/material";


import '../Home/style.css'
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate()
const aeroplane = (<div className="cloud cloud1">
  <div className="light"></div>
<img  src="https://images.vexels.com/media/users/3/145795/isolated/preview/05cd33059a006bf49006097af4ccba98-plane-in-flight-by-vexels.png" /></div>)

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
<Typography variant="h2" sx={{ marginBottom: "32px", fontFamily: 'Crafter, sans-serif' }}>
    Welcome To SHaZaOw TOURS!
</Typography>
<Typography variant="h4" sx={{ marginBottom: "32px", fontFamily: 'Crafter, sans-serif' }}>
Please Login to see out tours
</Typography>
<Box>{aeroplane}</Box>


</Box>)}
            
export default HomePage;
