// import React from "react";
// import { Myservices1 } from "../../data/Myservices";
// import { useNavigate } from "react-router-dom";
// import { CardContent, Grid, Typography, Card as MuiCard, Container } from "@mui/material";

// const Card = () => {
//   const navigate = useNavigate();

//   const handleCardClick = (serviceId) => {
//     navigate(`/services/${serviceId}`);
//   };

//   return (
//     <div>
//         <Container>
//       <Grid item xs={12} md={8}>
//         <Grid container spacing={2}>
//           {Myservices1.map((service, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <MuiCard
//                 sx={{
//                   boxShadow: 2,
//                   cursor: "pointer",
//                   height: "420px",
//                   borderRadius: "0px",
//                 }}
//                 onClick={() => handleCardClick(service.id)}
//               >
//                 <img
//                   src={service.imgpath}
//                   alt={service.title}
//                   style={{ width: "100%", height: 240, objectFit: "cover" }}
//                 />
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     fontWeight="bold"
//                     sx={{ color: "#002b5b" }}
//                   >
//                     {service.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {service.desc}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       mt: 1,
//                       color: "#002b5b",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                     }}
//                   >
//                     read more &gt;
//                   </Typography>
//                 </CardContent>
//               </MuiCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//       </Container>
//     </div>
//   );
// };

// export default Card;


// import React from "react";
// import { Myservices1 } from "../../data/Myservices";
// import { useNavigate } from "react-router-dom";
// import { CardContent, Grid, Typography, Card as MuiCard, Container, Box } from "@mui/material";

// const Card = () => {
//   const navigate = useNavigate();

//   const handleCardClick = (serviceId) => {
//     navigate(`/services/${serviceId}`);
//   };

//   return (
//     <Box>

//     <h3 style={{ 
//     margin: "0 0 15px",
//     fontSize: "2.8rem",
//     color: "#2d3436",
//     textAlign:"center",
//     fontWeight: "700",
//     letterSpacing: "-0.5px",
//     position: "relative",
//     animation: "fadeInUp 0.8s ease",
//     textTransform: "uppercase",
//     background: "linear-gradient(45deg, #2d3436, #007bff)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent"
//   }}>
//     The BPS delivery service
//   </h3>
//     <Box sx={{  py:5, mx:20 }}>

//       <Grid container spacing={3} justifyContent="center">

//         {Myservices1.map((service, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <MuiCard
//               sx={{
//                 boxShadow: 2,
//                 cursor: "pointer",
//                 height: { xs: "auto", md: "420px" }, // Auto height on mobile
//                 borderRadius: "8px",
//                 transition: "transform 0.2s",
//                 "&:hover": { transform: "scale(1.05)" }, // Slight hover effect
//               }}
//               onClick={() => handleCardClick(service.id)}
//             >
//               <img
//                 src={service.imgpath}
//                 alt={service.title}
//                 style={{
//                   width: "100%",
//                   height: "200px",
//                   objectFit: "fit",
//                 }}
//               />
//               <CardContent>
//                 <Typography
//                   variant="h6"
//                   fontWeight="bold"
//                   sx={{ color: "#002b5b" }}
//                 >
//                   {service.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {service.desc}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     mt: 1,
//                     color: "#002b5b",
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                   }}
//                 >
//                   read more &gt;
//                 </Typography>
//               </CardContent>
//             </MuiCard>
//           </Grid>
//         ))}
//       </Grid>
//     </Box> 
//     </Box>
//   );
// };

// export default Card;

 
import React from "react";
import { Myservices1 } from "../../data/Myservices";
import { useNavigate } from "react-router-dom";
import {
  CardContent,
  Grid,
  Typography,
  Card as MuiCard,
  Container,
  Box,
} from "@mui/material";

const Card = () => {
  const navigate = useNavigate();

  const handleCardClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 8, md: 13 }, py:{ xs: 1.2, sm: 3, md: 3 }}}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "700",
          letterSpacing: "-0.5px",
          mb: 4,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          textTransform: "uppercase",
          background: "linear-gradient(45deg, #2d3436, #007bff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        The BPS delivery service
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {Myservices1.map((service, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <MuiCard
              sx={{
                boxShadow: 2,
                cursor: "pointer",
                height: "100%",
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={() => handleCardClick(service.id)}
            >
              <img
                src={service.imgpath}
                alt={service.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#002b5b", mb: 1 }}
                >
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.desc}
                </Typography>
                {/* <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: "#002b5b",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  read more &gt;
                </Typography> */}
              </CardContent>
            </MuiCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Card;
