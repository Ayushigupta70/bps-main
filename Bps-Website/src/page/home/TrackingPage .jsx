

// import {
//   Container,
//   Typography,
//   Grid,
//   Box,
//   keyframes,
//   useTheme,
// } from "@mui/material";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import FireTruckIcon from "@mui/icons-material/FireTruck";
// import RocketIcon from "@mui/icons-material/Rocket";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import StarIcon from "@mui/icons-material/Star";

// import { useTheme as useEmotionTheme } from "@emotion/react";

// // Floating animation
// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0px); }
// `;

// // Smaller and optimized HexagonIcon

// const HexagonIcon = ({ Icon, gradient, index }) => {
//   const theme = useEmotionTheme();

//   return (
//     <Box sx={{ position: "relative", zIndex: 1 }}>
//       <Box
//         sx={{
//           width: "90px",
//           height: "70px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: gradient,
//           border: "3px solid #ffffff",
//           mx: "auto",
//           transition: "all 0.3s ease",
//           clipPath:
//             "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
//           animation: `${float} 4s ease-in-out infinite`,
//           position: "relative",
//           "&:hover": {
//             transform: "scale(1.1)",
//             boxShadow: theme.shadows[6],
//           },
//           "&::after": {
//             content: '""',
//             position: "absolute",
//             width: "130%",
//             height: "130%",
//             background: gradient,
//             opacity: 0.15,
//             clipPath:
//               "polygon(25% 5%, 75% 5%, 100% 50%, 75% 94%, 25% 94%, 2% 50%)",
//             zIndex: -1,
//             transition: "opacity 0.3s ease",
//           },
//         }}
//       >
//         <Icon
//           sx={{
//             fontSize: "38px",
//             color: "#ffffff",
//             filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.2))",
//           }}
//         />
//       </Box>
//       <Box
//         sx={{
//           position: "absolute",
//           top: -45,
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: 30,
//           height: 30,
//           background: theme.palette.background.paper,
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: theme.shadows[1],
//           fontWeight: 600,
//           fontSize: "0.8rem",
//           color: theme.palette.text.primary,
//         }}
//       >
//         {index + 1}
//       </Box>
//     </Box>
//   );
// };

// const TrackingPage = () => {
//   const theme = useTheme();

//   const gradients = [
//     "linear-gradient(45deg, #4CAF50, #81C784)",
//     "linear-gradient(45deg, #FF5722, #FF8A65)",
//     "linear-gradient(45deg, #2196F3, #64B5F6)",
//     "linear-gradient(45deg, #9C27B0, #BA68C8)",
//   ];

//   const steps = [
//     {
//       Icon: LocalShippingIcon,
//       title: "Enter your Order ID",
//       text: "For a seamless tracking experience — your package, your journey, our commitment.",
//     },
//     {
//       Icon: RocketIcon,
//       title: "Track your Order",
//       text: "Seamless updates for confident deliveries, ensuring transparency in every step.",
//     },
//     {
//       Icon: FireTruckIcon,
//       title: "Order in Transit",
//       text: "Your delivery is on its way. Anticipate the moment with confidence. Arrival is imminent.",
//     },
//     {
//       Icon: StarIcon,
//       title: "Successful Delivery",
//       text: "Your delivery, a triumph of efficiency. Celebrate the seamless arrival of your order.",
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         pt: 5,
//         px: 3,
//         mb: 8,
//         mx:12,
//         borderRadius: 4,
//         background:
//           "linear-gradient(135deg, rgba(54, 211, 232, 0.95) 0%, rgba(53, 65, 136, 0.95) 100%)",
//         boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
//         position: "relative",
//         overflow: "hidden",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           width: "100%",
//           height: "80%",
//           backgroundImage: `radial-gradient(${theme.palette.background.paper} 20%, transparent 20%)`,
//           backgroundSize: "15px 15px",
//           opacity: 0.1,
//           top: 0,
//           left: 0,
//           zIndex: 0,
//         },
//       }}
//     >
//       <Box position="relative" zIndex={1}>
//         <Typography
//           variant="h1"
//           fontWeight={800}
//           textAlign="center"
//           sx={{
//             fontSize: "2.8rem",
//             background:
//               "linear-gradient(45deg,rgb(44, 12, 203),rgb(28, 25, 174))",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
//             mb: 2,
//             letterSpacing: "1.5px",
//             [theme.breakpoints.down("md")]: {
//               fontSize: "2rem",
//             },
//           }}
//         >
//           How to Track Orders in BPS
//         </Typography>

//         <Typography
//           variant="h6"
//           textAlign="center"
//           sx={{
//             maxWidth: "800px",
//             mx: "auto",
//             mt: 2,
//             mb: 6,
//             color: "rgba(255, 255, 255, 0.9)",
//             fontWeight: 300,
//             fontSize: "1rem",
//             lineHeight: 1.6,
//             [theme.breakpoints.down("md")]: {
//               px: 2,
//               fontSize: "0.8rem",
//             },
//           }}
//         >
//           Experience effortless tracking with our intuitive system. Uncover
//           real-time insights into your shipment's journey. Elevate your order
//           management with a seamless process, ensuring transparency and peace of
//           mind.
//         </Typography>

//         <Grid container spacing={4} mt={4}>
//           {steps.map((step, index) => (
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={3}
//               key={index}
//               sx={{ display: "flex", justifyContent: "center" }}
//             >
//               <Box
//                 sx={{
//                   maxWidth: 260,
//                   px: 2,
//                   py: 3,
//                   borderRadius: 3,
//                   transition: "all 0.3s ease",
//                   textAlign: "center",
//                   "&:hover": {
//                     transform: "translateY(-8px)",
//                     background: "rgba(255, 255, 255, 0.04)",
//                     boxShadow: theme.shadows[3],
//                   },
//                 }}
//               >
//                 <HexagonIcon
//                   Icon={step.Icon}
//                   gradient={gradients[index]}
//                   index={index}
//                 />
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     color: theme.palette.common.white,
//                     fontWeight: 500,
//                     mt: 4,
//                     mb: 1,
//                     fontSize: "1rem",
//                   }}
//                 >
//                   {step.title}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: "rgba(255, 255, 255, 0.8)",
//                     fontSize: "0.85rem",
//                     lineHeight: 1.4,
//                   }}
//                 >
//                   {step.text}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default TrackingPage;


import {
  Container,
  Typography,
  Grid,
  Box,
  keyframes,
  useTheme,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import RocketIcon from "@mui/icons-material/Rocket";
import StarIcon from "@mui/icons-material/Star";
import { useTheme as useEmotionTheme } from "@emotion/react";

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Hexagon Icon
const HexagonIcon = ({ Icon, gradient, index }) => {
  const theme = useEmotionTheme();

  return (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <Box
        sx={{
          width: 90,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: gradient,
          border: "3px solid #ffffff",
          mx: "auto",
          transition: "all 0.3s ease",
          clipPath:
            "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
          animation: `${float} 4s ease-in-out infinite`,
          position: "relative",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: theme.shadows[6],
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: "130%",
            height: "130%",
            background: gradient,
            opacity: 0.15,
            clipPath:
              "polygon(25% 5%, 75% 5%, 100% 50%, 75% 94%, 25% 94%, 2% 50%)",
            zIndex: -1,
          },
        }}
      >
        <Icon
          sx={{
            fontSize: "38px",
            color: "#fff",
            filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.2))",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: -45,
          left: "50%",
          transform: "translateX(-50%)",
          width: 30,
          height: 30,
          background: theme.palette.background.paper,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: theme.shadows[1],
          fontWeight: 600,
          fontSize: "0.8rem",
          color: theme.palette.text.primary,
        }}
      >
        {index + 1}
      </Box>
    </Box>
  );
};

const TrackingPage = () => {
  const theme = useTheme();

  const gradients = [
    "linear-gradient(45deg, #4CAF50, #81C784)",
    "linear-gradient(45deg, #FF5722, #FF8A65)",
    "linear-gradient(45deg, #2196F3, #64B5F6)",
    "linear-gradient(45deg, #9C27B0, #BA68C8)",
  ];

  const steps = [
    {
      Icon: LocalShippingIcon,
      title: "Enter your Order ID",
      text: "For a seamless tracking experience — your package, your journey, our commitment.",
    },
    {
      Icon: RocketIcon,
      title: "Track your Order",
      text: "Seamless updates for confident deliveries, ensuring transparency in every step.",
    },
    {
      Icon: FireTruckIcon,
      title: "Order in Transit",
      text: "Your delivery is on its way. Anticipate the moment with confidence. Arrival is imminent.",
    },
    {
      Icon: StarIcon,
      title: "Successful Delivery",
      text: "Your delivery, a triumph of efficiency. Celebrate the seamless arrival of your order.",
    },
  ];

  return (
    <Box
      sx={{
        pt: { xs: 4, sm: 5 },
        px: { xs: 2, sm: 4, md: 8 },
        mx:  { xs: 1.5, sm: 2, md: 4 },
        mb: { xs: 1.5, sm: 2, md: 4 },
        borderRadius: 4,
        background:
          "linear-gradient(135deg, rgba(54, 211, 232, 0.95) 0%, rgba(53, 65, 136, 0.95) 100%)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "80%",
          backgroundImage: `radial-gradient(${theme.palette.background.paper} 20%, transparent 20%)`,
          backgroundSize: "15px 15px",
          opacity: 0.1,
          top: 0,
          left: 0,
          zIndex: 0,
        },
      }}
    >
      <Box position="relative" zIndex={1}>
        <Typography
          variant="h1"
          fontWeight={800}
          textAlign="center"
          sx={{
            fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
            background: "linear-gradient(45deg, rgb(44, 12, 203), rgb(28, 25, 174))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            mb: 2,
            letterSpacing: "1.5px",
          }}
        >
          How to Track Orders in BPS
        </Typography>

        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            maxWidth: "800px",
            mx: "auto",
            mt: 2,
            mb: 6,
            color: "rgba(255, 255, 255, 0.9)",
            fontWeight: 300,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
          }}
        >
          Experience effortless tracking with our intuitive system. Uncover
          real-time insights into your shipment's journey. Elevate your order
          management with a seamless process, ensuring transparency and peace of
          mind.
        </Typography>

        <Grid container spacing={4} mt={4}>
          {steps.map((step, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  maxWidth: 280,
                  px: 2,
                  py: 3,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    background: "rgba(255, 255, 255, 0.04)",
                    boxShadow: theme.shadows[3],
                  },
                }}
              >
                <HexagonIcon
                  Icon={step.Icon}
                  gradient={gradients[index]}
                  index={index}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: 500,
                    mt: 4,
                    mb: 1,
                    fontSize: "1rem",
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                  }}
                >
                  {step.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TrackingPage;
