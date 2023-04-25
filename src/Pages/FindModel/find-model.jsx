import React, { useState } from "react";
import "./find-model.css";
import ListingPage from "./Model-Listing-page/Listing-Page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FindModel() {
  return (
    <>
      <ListingPage />
      <ToastContainer position="top-center" />
    </>
  );
}

export default FindModel;
