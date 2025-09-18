

// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Button,
//   Container,
// } from "@mui/material";
// import {
//   DriveEta,
//   IntegrationInstructions,
//   LocalShipping,
//   Star,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";

// const featureItems = [
//   {
//     title: "Experienced Drivers",
//     Icon: DriveEta,
//     description:
//       "Seasoned professionals delivering reliability with every parcel",
//   },
//   {
//     title: "Smart Integration",
//     Icon: IntegrationInstructions,
//     description: "Effortless connectivity with seamless system integration",
//   },
//   {
//     title: "Fast Delivery",
//     Icon: LocalShipping,
//     description: "Swift dispatch ensuring prompt parcel arrival",
//   },
//   {
//     title: "Premium Service",
//     Icon: Star,
//     description: "Excellence in every delivery - your parcel, our priority",
//   },
// ];

// const SectionHeading = styled(Typography)(({ theme }) => ({
//   fontWeight: 700,
//   color: theme.palette.primary.dark,
//   marginBottom: theme.spacing(2),
//   fontSize: "clamp(2rem, 5vw, 3.5rem)",
//   lineHeight: 1.2,
// }));



// const FeatureCard = styled(Box)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   borderRadius: theme.shape.borderRadius * 2,
//   padding: theme.spacing(2.5), // reduced from 4
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   textAlign: "center",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: theme.shadows[4], // slightly smaller shadow
//   },
// }));

// const FeatureIcon = styled("div")(({ theme }) => ({
//   fontSize: 48, 
//   color: theme.palette.primary.main,
//   marginBottom: theme.spacing(1), // reduced spacing
// }));


// const LearnMoreButton = styled(Button)(({ theme }) => ({
//   marginTop: "auto",
//   fontWeight: 500,
//   fontSize: "0.8rem", 
//   borderRadius: theme.shape.borderRadius * 2,
//   padding: theme.spacing(1,3), 
// }));


// const Portfolio = () => {
//   return (
//     <Box
//       component="section"
//       sx={{
//         py: { xs: 2, md: 4 },
//         px: { xs: 5, md: 13 },
//         backgroundColor: "background.default",
//       }}
//     >
//       <Box >
//         <Grid container spacing={4} alignItems="flex-start">
//           {/* Left Content */}
//           <Grid item xs={12} lg={6}>
//             <Box>
//               <SectionHeading variant="h1" component="h2">
//                 Why Choose Bharat Parcel Services?
//               </SectionHeading>
//               <Typography variant="subtitle1" color="text.secondary">
//                 Your Prime Choice for Reliable and Efficient Parcel Delivery Solutions
//               </Typography>
//             </Box>
//           </Grid>

//           {/* Right Features */}
//           <Grid item xs={12} lg={6}>
//             <Grid container spacing={2}>
//               {featureItems.map(({ title, Icon, description }) => (
//                 <Grid item xs={12} sm={6} key={title}>
//                   <FeatureCard>
//                     <FeatureIcon>
//                       <Icon fontSize="inherit" color="inherit" />
//                     </FeatureIcon>
//                     <Typography variant="h6" component="h3" gutterBottom>
//                       {title}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{ flexGrow: 1 }}
//                     >
//                       {description}
//                     </Typography>

//                   </FeatureCard>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Portfolio;

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
} from "@mui/material";
import {
  DriveEta,
  IntegrationInstructions,
  LocalShipping,
  Star,
} from "@mui/icons-material";
import { styled } from "@mui/system";

const featureItems = [
  {
    title: "Experienced Drivers",
    Icon: DriveEta,
    description:
      "Seasoned professionals delivering reliability with every parcel",
  },
  {
    title: "Smart Integration",
    Icon: IntegrationInstructions,
    description: "Effortless connectivity with seamless system integration",
  },
  {
    title: "Fast Delivery",
    Icon: LocalShipping,
    description: "Swift dispatch ensuring prompt parcel arrival",
  },
  {
    title: "Premium Service",
    Icon: Star,
    description: "Excellence in every delivery - your parcel, our priority",
  },
];

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(2),
  fontSize: "clamp(1.8rem, 5vw, 3.2rem)", // responsive size
  lineHeight: 1.2,
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2.5),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const FeatureIcon = styled("div")(({ theme }) => ({
  fontSize: 48,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  marginTop: "auto",
  fontWeight: 500,
  fontSize: "0.8rem",
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 3),
}));

const Portfolio = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 4, md: 8, lg: 16 },
        backgroundColor: "background.default",
      }}
    >
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
        {/* Left Content */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: { xs: "center", md: "center" }, mt:{md:23} }}>
            <SectionHeading variant="h1" component="h2">
              Why Choose Bharat Parcel Services?
            </SectionHeading>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
              }}
            >
              Your Prime Choice for Reliable and Efficient Parcel Delivery Solutions
            </Typography>
          </Box>
        </Grid>

        {/* Right Features */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {featureItems.map(({ title, Icon, description }) => (
              <Grid item xs={12} sm={6} key={title}>
                <FeatureCard>
                  <FeatureIcon>
                    <Icon fontSize="inherit" color="inherit" />
                  </FeatureIcon>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      flexGrow: 1,
                      fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    {description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Portfolio;

