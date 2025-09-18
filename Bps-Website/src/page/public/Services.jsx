// import React from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Breadcrumbs,
//   Link,
// } from "@mui/material";
// import PhoneIcon from "@mui/icons-material/Phone";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import { Myservices } from "../../data/Myservices";
// import service from "../../assets/image1/Service.jpg";
// import { useNavigate } from "react-router-dom";

// const Services = () => {
//   const navigate = useNavigate();

//   const handleCardClick = (serviceId) => {
//     navigate(`/services/${serviceId}`);
//   };

//   return (
//     <Box>
//       {/* Background Banner */}
//       <Box
//         sx={{
//           position: "relative",
//           width: "100vw",
//           height: 300,
//           mt: 10,
//           background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${service})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "flex-start",
//           color: "white",
//           px: { xs: 2, sm: 4, md: 10, lg: 15 },
//         }}
//       >
//         <Breadcrumbs sx={{ color: "white" }}>
//           <Link underline="hover" color="inherit" href="/">
//             Home
//           </Link>
//           <Typography color="white">Services</Typography>
//         </Breadcrumbs>
//         <Typography variant="h3" fontWeight="bold">
//           Services
//         </Typography>
//       </Box>

//       {/* Services Grid */}
//       <Box sx={{ p: { xs: 2, md: 6 }, px: { xs: 2, sm: 4, md: 10, lg: 15 } }}>
//         <Grid container spacing={4}>
//           {/* Left Section - Service Cards */}
//           <Grid item xs={12} md={8}>
//             <Grid container spacing={2}>
//               {Myservices.map((service, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Card
//                     sx={{ boxShadow: 2, cursor: "pointer", height: 420, borderRadius: 1 }}
//                     onClick={() => handleCardClick(service.id)}
//                   >
//                     <img
//                       src={service.imgpath}
//                       alt={service.title}
//                       style={{ width: "100%", height: 160, objectFit: "cover" }}
//                     />
//                     <CardContent>
//                       <Typography variant="h6" fontWeight="bold" color="#002b5b">
//                         {service.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {service.desc}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{ mt: 1, color: "#002b5b", fontWeight: "bold", cursor: "pointer" }}
//                       >
//                         Read more &gt;
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>

//           {/* Right Section - Contact, Presentation & Testimonials */}
//           <Grid item xs={12} md={4}>
//             <Card sx={{ bgcolor: "#ffc107", color: "black", p: 2, mb: 2 }}>
//               <Typography variant="h6" fontWeight="bold">
//                 How can we help you?
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 1 }}>
//                 Contact us at the SHSPL office nearest to you or submit a business inquiry online.
//               </Typography>
//               <Button
//                 variant="contained"
//                 sx={{ mt: 2, bgcolor: "black", color: "white", textTransform: "none", width: "100%", "&:hover": { bgcolor: "#001f3f" } }}
//                 startIcon={<PhoneIcon />}
//               >
//                 Contacts
//               </Button>
//             </Card>

//             <Button
//               variant="contained"
//               sx={{ bgcolor: "#002b5b", color: "white", textTransform: "none", width: "100%", py: 1.5, "&:hover": { bgcolor: "#ffc107", color: "black" } }}
//               startIcon={<BusinessCenterIcon />}
//             >
//               Company Presentation
//             </Button>

//             <Card sx={{ mt: 2, p: 2, boxShadow: 3, borderRadius: 2 }}>
//               <Typography variant="body1">
//                 "SHSPL really helped us achieve our financial goals. The slick presentation along
//                 with fantastic readability ensures that our financial standing is stable."
//               </Typography>
//               <Typography variant="subtitle2" sx={{ mt: 1, fontStyle: "italic" }}>
//                 — Amanda, Sales & Marketing, Alien Ltd.
//               </Typography>
//             </Card>

//             <Box sx={{ mt: 3, borderTop: "2px solid #002b5b", pt: 2 }}>
//               <Typography variant="h6" fontWeight="bold">
//                 Recent News
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold", cursor: "pointer" }}>
//                 A digital prescription for the pharma industry
//               </Typography>
//               <Typography variant="caption" color="gray">
//                 📅 September 3, 2021
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold", cursor: "pointer" }}>
//                 Harvest great ideas from your company’s best assets
//               </Typography>
//               <Typography variant="caption" color="gray">
//                 📅 August 25, 2021
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Services;

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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import logisticsBanner from "../../assets/image1/Service.jpg";
import img1 from "../../assets/image1/warehouse.jpg";
import img2 from "../../assets/image1/service/image.png";
import img3 from "../../assets/image1/service/Freight.png";
import Readyto from "../Designe/Readyto";

//  Sample logistics services data (replace with actual data)
const logisticsServices = [
  {
    id: 1,
    title: "Freight Transportation",
    desc: "Reliable and efficient transportation solutions for all cargo types across land, sea, and air.",
    imgpath: img3,
  },
  {
    id: 2,
    title: "Warehouse Management",
    desc: "State-of-the-art warehousing with ascended facilities with real-time inventory tracking.",
    imgpath: img1,
  },
  {
    id: 3,
    title: "Supply Chain Solutions",
    desc: "End-to-end supply chain optimization and logistics coordination.",
    imgpath: img2,
  },
];

const Services = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCardClick = React.useCallback(
    (serviceId) => {
      navigate(`/services/${serviceId}`);
    },
    [navigate]
  );

  return (
    <Box sx={{ overflow: "hidden" }}>
    
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: 250, // smaller mobile
            sm: 300, // small devices
            md: 350, // tablets
            lg: 350, // desktops
          },
          mt: { xs: 4, sm: 5, md: 6 },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${logisticsBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 4, md: 6, lg: 10 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontWeight: 900,
            fontSize: {
              xs: "2.5rem", // phones
              sm: "2.5rem", // small tablets
              md: "3.5rem", // tablets/laptops
              lg: "4.5rem", // large screens
            },
            textAlign: "center",
            textShadow: "3px 3px 10px rgba(0,0,0,0.7)",
          }}
        >
          Services
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ px: { xs: 2, sm: 4, md: 8, lg: 12 }, py: 6 }}>
        <Grid container spacing={4}>
          {/* Services Grid */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {logisticsServices.map((service) => (
                <Grid item xs={12} sm={6} key={service.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                    onClick={() => handleCardClick(service.id)}
                  >
                    <Box
                      component="img"
                      src={service.imgpath}
                      alt={service.title}
                      sx={{ width: "100%", height: 200, objectFit: "cover" }}
                      loading="lazy"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" color="#002b5b" gutterBottom>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: "#ffc107",
                p: 3,
                mb: 3,
                boxShadow: 1,
                textAlign: "center", // Centers text elements
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Need Logistics Support?
              </Typography>
              <Typography variant="body2">
                Contact our expert team for tailored logistics solutions or
                submit an inquiry today.
              </Typography>

              {/* Wrapping Button inside a Box to center it */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#002b5b",
                    "&:hover": { bgcolor: "#001f3f" },
                  }}
                  startIcon={<PhoneIcon />}
                >
                  Get in Touch
                </Button>
              </Box>
            </Card>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mb: 3,
                bgcolor: "#002b5b",
                "&:hover": { bgcolor: "#ffc107", color: "black" },
              }}
              startIcon={<LocalShippingIcon />}
            >
              Request a Quote
            </Button>

            <Card sx={{ p: 3, boxShadow: 1 }}>
              <Typography variant="body1" paragraph>
                "Their logistics expertise transformed our supply chain
                efficiency. Reliable service and great communication!"
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                — John D., Operations Manager, Global Trading Co.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Readyto />
    </Box>
  );
};

export default Services;
