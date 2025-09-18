import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import PublicIcon from "@mui/icons-material/Public";

const services = [
  {
    icon: <PersonIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
    title: "Warehousing Solutions",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore. Phasellus viverra nulla ut metus.",
  },
  {
    icon: <LocalShippingIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
    title: "Surface Transport by Road",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore. Phasellus viverra nulla ut metus.",
  },
  {
    icon: <AirplanemodeActiveIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
    title: "Air Freight Movements",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore. Phasellus viverra nulla ut metus.",
  },
  {
    icon: <PublicIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
    title: "Global Shipping Destinations",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore. Phasellus viverra nulla ut metus.",
  },
];

function ServicesPage() {
  return (
    <Container sx={{ py: 8  }}>
      <Grid container spacing={4}>
        {/* Left Section: Heading, Description, and Button */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#333",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Defining Moments
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              mb: 3,
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.6,
            }}
          >
            You are known by the company you keep. Take a look at our satisfied
            corporate customers. We’re honoured.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1976D2",
              color: "white",
              px: 4,
              py: 1,
              fontWeight: 600,
              "&:hover": { bgcolor: "#1565C0" },
            }}
          >
            READ MORE
          </Button>
        </Grid>

        {/* Right Section: Service Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#F9FAFB",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#E3F2FD",
                      transform: "translateY(-5px)",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {/* Icon */}
                  <Box sx={{ mr: 2 }}>{service.icon}</Box>
                  {/* Text Content */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        mb: 1,
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        lineHeight: 1.6,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                      }}
                    >
                      {service.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ServicesPage;


// import React, { useState } from "react";
// import { Box, Container, Grid, Typography, Button } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
// import PublicIcon from "@mui/icons-material/Public";

// const services = [
//   {
//     icon: <PersonIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
//     title: "Warehousing Solutions",
//     description:
//       "We offer reliable warehousing facilities that ensure safe storage and quick retrieval of goods.",
//   },
//   {
//     icon: <LocalShippingIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
//     title: "Surface Transport by Road",
//     description:
//       "Our road transportation is seamless, connecting major cities with efficiency and speed.",
//   },
//   {
//     icon: <AirplanemodeActiveIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
//     title: "Air Freight Movements",
//     description:
//       "Fast, reliable, and secure air freight services for your urgent international shipments.",
//   },
//   {
//     icon: <PublicIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
//     title: "Global Shipping Destinations",
//     description:
//       "We cover global shipping routes to get your goods wherever they need to go—on time.",
//   },
//   {
//     icon: <PublicIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
//     title: "Customs Clearance",
//     description:
//       "Streamline your logistics with our expert handling of customs documentation and processes.",
//   },
//   {
//     icon: <PublicIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
//     title: "Logistics Consulting",
//     description:
//       "Optimize your supply chain with help from our seasoned logistics professionals.",
//   },
// ];

// function ServicesPage() {
//   const [showAll, setShowAll] = useState(false);
//   const initialItems = 3;
//   const displayedServices = showAll
//     ? services
//     : services.slice(0, initialItems);

//   return (
//     <Container sx={{ py: 10 }}>
//       <Grid container spacing={6}>
//         <Grid item xs={12}>
//           <Grid container spacing={3}>
//             {displayedServices.map((service, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100%",
//                     p: 3,
//                     borderRadius: 2,
//                     bgcolor: "#F9FAFB",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       bgcolor: "#E3F2FD",
//                       transform: "translateY(-5px)",
//                       boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   <Box sx={{ mb: 2 }}>{service.icon}</Box>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: 600,
//                       color: "#333",
//                       mb: 1,
//                       fontSize: { xs: "1.1rem", md: "1.2rem" },
//                     }}
//                   >
//                     {service.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "#666",
//                       lineHeight: 1.6,
//                       fontSize: { xs: "0.9rem", md: "1rem" },
//                     }}
//                   >
//                     {service.description}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>

//         {/* Bottom Section */}
//         <Grid item xs={12}>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             textAlign="center"
//             maxWidth="600px"
//             mx="auto"
//             mt={6}
//           >
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 700,
//                 color: "#333",
//                 mb: 2,
//                 fontSize: { xs: "2rem", md: "2.5rem" },
//               }}
//             >
//               Defining Moments
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 color: "#666",
//                 mb: 3,
//                 fontSize: { xs: "1rem", md: "1.1rem" },
//                 lineHeight: 1.6,
//               }}
//             >
//               You are known by the company you keep. Take a look at our
//               satisfied corporate customers. We’re honoured.
//             </Typography>

//             {services.length > initialItems && (
//               <Button
//                 onClick={() => setShowAll(!showAll)}
//                 variant="contained"
//                 sx={{
//                   bgcolor: "#1976D2",
//                   color: "white",
//                   px: 4,
//                   py: 1,
//                   fontWeight: 600,
//                   "&:hover": { bgcolor: "#1565C0" },
//                 }}
//               >
//                 {showAll ? "Show Less" : "View More"}
//               </Button>
//             )}
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// export default ServicesPage;
