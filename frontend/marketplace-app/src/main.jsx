import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Browse from "./pages/Browse.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import MyListings from "./pages/MyListings.jsx";
import EditListings from "./pages/EditListing.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import AppLayout from "./layout/AppLayout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route element={<AppLayout/>}>
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/listings/me" element={<MyListings />} />
          <Route path="/listings/:id/edit" element={<EditListings />} />
          <Route path="/browse" element={<Browse />}/>
          <Route path="/" element = {<Navigate to="/browse"/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
