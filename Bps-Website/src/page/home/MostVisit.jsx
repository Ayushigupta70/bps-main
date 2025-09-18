import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import img1 from "../../assets/asscerts/slidertour/1648652370Dawki River.jpg";
import img2 from "../../assets/asscerts/slidertour/1650610933Chardham-Yatra 3.jpg";
import img3 from "../../assets/asscerts/slidertour/16507201972017_11$largeimg27_Monday_2017_235436412.jpg";
import { Grid3x3 } from "@mui/icons-material";

const tourData = [
  {
    id: 1,
    title: "Kashmir Tour Package 6 Nights 7 Days",
    image: img1,

    location: "Kashmir",
  },
  {
    id: 2,
    title: "Shillong Guwahati Tour Package 6 Night 7 Days",
    image: img2,
    // price: "₹16700",
    // duration: "06 N/07 D",
    // persons: 4,
    location: "Meghalaya",
  },
  {
    id: 3,
    title: "Chardham Yatra Tour Package 8 Nights 9 Days",
    image: img3,
    // price: "₹15000",
    // duration: "08 N/09 D",
    // persons: 12,
    location: "Haridwar",
  },
  {
    id: 4,
    title: "Kashmir Tour Package 6 Nights 7 Days",
    image: img1,
    // price: "₹9699",
    // duration: "06 N/07 D",
    // persons: 4,
    location: "Kashmir",
  },
  {
    id: 5,
    title: "Shillong Guwahati Tour Package 6 Night 7 Days",
    image: img2,
    // price: "₹16700",
    // duration: "06 N/07 D",
    // persons: 4,
    location: "Meghalaya",
  },
  {
    id: 6,
    title: "Chardham Yatra Tour Package 8 Nights 9 Days",
    image: img3,
    // price: "₹15000",
    // duration: "08 N/09 D",
    // persons: 12,
    location: "Haridwar",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 3,
        centerMode: true,
        centerPadding: "0px",
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "0px",
      },
    },

    {
      breakpoint: 300,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "0px",
      },
    },
    // {
    //   breakpoint: 200,
    //   settings: {
    //     slidesToShow: 1,
    //     centerMode: true,
    //     centerPadding: "30px",
    //   },
    // },
  ],
};

const MostVisit = () => {
  return (
    <Grid xs={12} md={4} lg={4}>
      <Box my={2} sx={{ textAlign: "center", py: 2 }}>
        <Typography my={3} variant="h5" fontWeight="bold" gutterBottom>
          MOST VISITED PLACES/DESTINATIONS
        </Typography>

        <Slider {...settings} style={{ maxWidth: "100%" }}>
          {tourData.map((tour) => (
            <Box key={tour.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  mx: 2,
                  maxWidth: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={tour.image}
                  alt={tour.title}
                  sx={{ objectFit: "cover", width: "100%" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {tour.location}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* <Box my={2}  sx={{ textAlign: "center", py: 2, }}>
      <Typography my={5}  variant="h5" fontWeight="bold" gutterBottom>
        MOST VISITED PLACES/DESTINATIONS
      </Typography>
     
      <Slider {...settings}>
        {tourData.map((tour) => (
          <Box key={tour.id}>
            {" "}
            
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                mx: 2,
                maxWidth: "vw",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={tour.image}
                alt={tour.title}
              
              />
              <CardContent sx={{ textAlign: "center"}}>
             <Typography variant="subtitle1" fontWeight="bold">
               {tour.location}
             </Typography>
             
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
      
    </Box> */}
    </Grid>
  );
};

export default MostVisit;
