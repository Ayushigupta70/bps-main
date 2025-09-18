import React from "react";
import PublicAppBar from "../../components/PublicAppBar";
import Footer from "../../page/Footer";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";

const PublicRouter = () => {
  return (
    <>
      <PublicAppBar />
      <Toolbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRouter;
