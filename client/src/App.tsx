import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { Routing } from "./Routes/Routing";
import { AuthProvider } from "./components/AuthContext/AuthContext"; // Import AuthProvider

const App: React.FC = () => {
  return (
    
      <AuthProvider>
        {" "}
        
        <Router>
          <div>
            <NavBar />
            <Routing />
          </div>
        </Router>
      </AuthProvider>
    );
};

export default App;
