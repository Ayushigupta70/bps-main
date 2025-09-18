import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import Ab1 from "../../assets/images/aboutslide2.jpg";
import ContentSection from "./ContentSection";
import WelcomeSection from "../home/WelcomeSection";
import LandingPage2 from "./LandingPage2";
import ServicesPage from "../About/ServicesPage";
import  Global  from "../About/Global";
import Readyto from "../Designe/Readyto";

const menuItems = ["Company Overview", "Careers", "Company History"];

const About = () => {
  return (

    <>
    
    <LandingPage2/>
    <ServicesPage/>
    <Global/>
    <Readyto/>
  
    

    </>
  );
};

export default About;
