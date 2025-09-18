import React from "react";
import LandingPage from "./Landing";
import Looking from "./Looking";
import Advisory from "./Advisory";

import Consulting from "./Consulting";
import Industry from "./Industry";
import Workforce from "./Workforce";
import Scroller from "./Scroller";
import Request from "./Request";
import Googlemap from "./Googlemap";
import Global from "./Global";
import Portfolio from "./Portfolio";
import WarehouseSection from "./WarehouseSection";
import WelcomeSection from "../home/WelcomeSection";
import LogisticsSection from "../home/LogisticsSection";
import TrackingPage from "../home/TrackingPage ";
import Card from "./Card";
import Readyto from "../Designe/Readyto";
import { Container } from "@mui/material";

function Home() {
  return (
    <>
      {/* <LandingPage />
    
      <Looking />
      <Advisory />
      <Global/>
      <Consulting />
      <Industry />
      <Workforce />
      <Scroller/>
      <Request />
      <Googlemap/> */}

      <LandingPage />

      <WelcomeSection />
      <Portfolio />

      <Card />
      <WarehouseSection />
      <TrackingPage />

      {/* <MostVisit/> */}

      {/* <LogisticsSection /> */}



      <Readyto />
    </>
  );
}

export default Home;
