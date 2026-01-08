import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Browse from "./pages/Browse.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateListing from "./pages/CreateListing.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/create" element={<CreateListing/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
