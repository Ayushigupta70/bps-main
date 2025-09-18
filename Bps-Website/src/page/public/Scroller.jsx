import React, { useState, useEffect, useRef } from "react";
import { Box, Card, CardMedia, IconButton, useMediaQuery } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Images
import img1 from "../../assets/images/scroller/img1.png";
import img2 from "../../assets/images/scroller/img2.png";
import img3 from "../../assets/images/scroller/img3.jpg";
import img4 from "../../assets/images/scroller/img4.png";
import img5 from "../../assets/images/scroller/img5.png";
import img6 from "../../assets/images/scroller/img6.png";

// Original Image Data
const originalData = [img1, img2, img3, img4, img5, img6, img2, img4];

const Scroller = () => {
  // Responsive item count
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const itemsPerPage = isSmallScreen ? 1 : isMediumScreen ? 2 : 4; // Dynamically adjust items

  const scrollerRef = useRef(null);
  
  // Duplicate images for infinite loop
  const scrollerData = [...originalData, ...originalData];
  const totalItems = scrollerData.length;

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = () => {
    setIndex((prev) => prev + itemsPerPage);
    setIsTransitioning(true);
  };

  const prevSlide = () => {
    setIndex((prev) => prev - itemsPerPage);
    setIsTransitioning(true);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [itemsPerPage]);

  useEffect(() => {
    // Handle seamless infinite scrolling
    if (index >= originalData.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 500);
    } else if (index < 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(originalData.length - itemsPerPage);
      }, 500);
    } else {
      setIsTransitioning(true);
    }
  }, [index, itemsPerPage]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      p={2}
      sx={{ overflow: "hidden", maxWidth: "100%", px: { xs: 2, sm: 4, md: 10, lg: 15 } }}
      onMouseEnter={() => clearInterval(scrollerRef.current)}
      onMouseLeave={() => (scrollerRef.current = setInterval(nextSlide, 3000))}
    >
      {/* Left Arrow */}
      <IconButton
        onClick={prevSlide}
        sx={{ position: "absolute", left: 10, zIndex: 1 }}
      >
        <ArrowBackIos />
      </IconButton>

      {/* Image Container */}
      <Box
        display="flex"
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          sx={{
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
            transform: `translateX(-${(index * 100) / itemsPerPage}%)`,
            width: `${(totalItems / itemsPerPage) * 100}%`,
          }}
        >
          {scrollerData.map((image, i) => (
            <Card
              key={i}
              sx={{
                flex: `0 0 ${100 / itemsPerPage}%`,
                borderRadius: "0",
              }}
            >
              <CardMedia component="img" height="230" image={image} />
            </Card>
          ))}
        </Box>
      </Box>

      {/* Right Arrow */}
      <IconButton
        onClick={nextSlide}
        sx={{ position: "absolute", right: 10, zIndex: 1 }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default Scroller;
