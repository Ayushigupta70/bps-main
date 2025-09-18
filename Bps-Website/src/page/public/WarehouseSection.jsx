

// import {
//   Box,
//   Typography,
//   Button,
//   Divider,
//   Grid,
//   Avatar,
//   Stack,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// const WarehouseSection = () => {
//   return (
//     <Box
//       sx={{
//         py: 8,
        
//         backgroundColor: "#f8f9fa",
//         textAlign: "center",
//       }}
//     >
//       <Box sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
//         <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
//           Deliver the Goods on time.
//         </Typography>
//         <Typography variant="h6" sx={{ color: "text.secondary", mb: 3 }}>
//           Over 100+ acre interior warehouse space
//         </Typography>

//         <Divider sx={{ my: 4, mx: "auto", width: "60px", borderWidth: 2 }} />

//         <Button
//           variant="contained"
//           color="primary"
//           endIcon={<ArrowForwardIcon />}
//           sx={{
//             mb: 6,
//             px: 4,
//             py: 1.5,
//             borderRadius: "8px",
//             textTransform: "none",
//             fontSize: "1.1rem",
//           }}
//         >
//           View Solutions
//         </Button>

//         <Grid container spacing={4} justifyContent="center">
//           <Grid item xs={12} md={4}>
//             <Stack alignItems="center" spacing={2} >
//               <Avatar
//                 sx={{
//                   bgcolor: "primary.main",
//                   color: "white",
//                   width: 56,
//                   height: 56,
//                   fontSize: "1.5rem",
//                   fontWeight: 700,
                  
//                 }}
//               >
//                 1
//               </Avatar>
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 Solutions
//               </Typography>
//               <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                 Custom logistics solutions tailored to your needs
//               </Typography>
//             </Stack>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Stack alignItems="center" spacing={2}>
//               <Avatar
//                 sx={{
//                   bgcolor: "primary.main",
//                   color: "white",
//                   width: 56,
//                   height: 56,
//                   fontSize: "1.5rem",
//                   fontWeight: 700,
//                 }}
//               >
//                 2
//               </Avatar>
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 Explore
//               </Typography>
//               <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                 Discover our global network and capabilities
//               </Typography>
//             </Stack>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Stack alignItems="center" spacing={2}>
//               <Avatar
//                 sx={{
//                   bgcolor: "primary.main",
//                   color: "white",
//                   width: 56,
//                   height: 56,
//                   fontSize: "1.5rem",
//                   fontWeight: 700,
//                 }}
//               >
//                 3
//               </Avatar>
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 Get Started
//               </Typography>
//               <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                 Begin your logistics journey with us today
//               </Typography>
//             </Stack>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default WarehouseSection; 


import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Avatar,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const WarehouseSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 4, md: 8, lg: 16 },
        backgroundColor: "#f8f9fa",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "800px" },
          mx: "auto",
          mb: { xs: 4, md: 6 },
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: { xs: 2 , md: 3 },
            fontSize: {
              xs: "1.8rem",
              sm: "2.4rem",
              md: "3rem",
              lg: "3.4rem",
            },
          }}
        >
          Deliver the Goods on time.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            mb: { xs: 3, md: 4 },
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
          }}
        >
          Over 100+ acre interior warehouse space
        </Typography>

        <Divider
          sx={{
            my: { xs: 3, md: 4 },
            mx: "auto",
            width: "60px",
            borderWidth: 2,
          }}
        />

        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{
            mb: { xs: 5, md: 6 },
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.5 },
            borderRadius: "8px",
            textTransform: "none",
            fontSize: {
              xs: "0.95rem",
              sm: "1rem",
              md: "1.1rem",
            },
          }}
        >
          View Solutions
        </Button>

        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {[
            {
              number: "1",
              title: "Solutions",
              description: "Custom logistics solutions tailored to your needs",
            },
            {
              number: "2",
              title: "Explore",
              description: "Discover our global network and capabilities",
            },
            {
              number: "3",
              title: "Get Started",
              description: "Begin your logistics journey with us today",
            },
          ].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.number}>
              <Stack alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  {item.number}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  {item.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WarehouseSection;
