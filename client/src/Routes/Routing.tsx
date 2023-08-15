import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Tours from "../components/Tours/Tours";
import Home from "../components/Home/Home";

import AddTourForm from "../components/AddTour/AddTour";
// import UpdateVacation from "../components/EditVacation/EditVacation";
import { AnyNaptrRecord } from "dns";
import AdminCharts from "../components/AdminCharts/AdminCharts";
import UpdateVacation from "../components/EditVacation/EditVacation";

export const Routing = () => {
  const x: any = {};
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addtour" element={<AddTourForm />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/edit/:id" element={<UpdateVacation />} />
        <Route path="/charts" element={<AdminCharts />} />
      </Routes>
    </div>
  );
};
