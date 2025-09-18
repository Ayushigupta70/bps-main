

// // import React from "react";
// // import { Box, Button, TextField, Typography } from "@mui/material";
// // import img1 from "../../assets/image1/warehouse.jpg";

// // function LandingPage() {
// //   return (
// //     <Box
// //       sx={{
// //         width: "100vw",
// //         height: "85vh",
// //         position: "relative",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         backgroundImage: `url(${img1})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         color: "white",
// //       }}
// //     >
// //       {/* Dark Overlay */}
// //       <Box
// //         sx={{
// //           position: "absolute",
// //           width: "100%",
// //           height: "100%",
// //           backgroundColor: "rgba(157, 70, 70, 0.4)",
// //         }}
// //       />

// //       {/* Text Content */}
// //       <Box
// //         sx={{
// //           position: "relative",
// //           textAlign: "center",
// //           maxWidth: "1000px",
// //           padding: { xs: 2, sm: 3 },
// //         }}
// //       >


// //         <Typography
// //           variant="h1"
// //           fontWeight="800"
// //           sx={{
// //             color: "#1e293b",
// //             lineHeight: 1.2,
// //             fontSize: { xs: "1.5rem", sm: "2.5rem", md: "4rem" },
// //             fontWeight: 800,
// //             // fontSize: { xs: "2rem", md: "4rem" },
// //             textShadow: "3px 3px 10px rgba(72, 57, 205, 0.7)",
// //           }}
// //         >
// //           <Typography fontWeight="bold" component="span" color="primary.main">
// //           BHARAT
// //           </Typography>{" "}
// //           Parcel <br /> Services Pvt Ltd.
// //         </Typography>
// //         <Typography variant="subtitle1" sx={{ my: 2, fontWeight: "600" }}>
// //           Track with ease, embrace the journey <br /> Bharat Parcel Services –
// //           Your parcel's whereabouts at your fingertips, delivering peace of mind
// //         </Typography>

// //         <Box
// //           sx={{
// //             // position: "absolute",
// //             //width: { xs: "18rem", sm: "50%", lg: "50%" },
// //              bgcolor: "primary.main",
// //             // color: "white",
// //             left: 50,
// //              boxShadow: 3,
// //              display: "flex",
// //              justifyContent: "center",
// //              alignItems: "center",
// //              borderRadius: "50px",
// //              textAlign: "center",
// //              positiony:"20",
// //           }}
// //         >
// //           <TextField
// //             variant="standard"

// //             placeholder="Enter your order ID"
// //             InputProps={{
// //               disableUnderline: true,
// //               sx: {
// //                 width: "250px",
// //                 padding: "12px",
// //                 paddingLeft: "24px",
// //                 fontSize: { sm: "0.875rem", lg: "1.125rem" },
// //                 textAlign:  "center" ,
// //                 fontWeight: "bold",
// //                 color: "white",
// //                 backgroundColor: "transparent",
// //                 "&::placeholder": {
// //                   color: "white",
// //                   opacity: 0.5,
// //                 },
// //               },
// //             }}
// //             sx={{
// //               bgcolor: "transparent",
// //               borderRadius: "50px",
// //               width:"200px",


// //             }}
// //           />
// //           <Button
// //             sx={{
// //               position: "absolute",
// //               right: 25,
// //               fontSize: { sm: "0.875rem", lg: "1.125rem" },
// //               borderRadius: "50px",
// //               boxShadow: 3,
// //               padding: "14px",
// //               paddingX: { sm: "24px", lg: "32px" },
// //               bgcolor: "red",
// //               color: "white",
// //               "&:hover": {
// //                 bgcolor: "blue.900",
// //               },
// //             }}
// //           >
// //             Track
// //           </Button>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // }

// // export default LandingPage;


// import React from "react";
// import { Box, Button, TextField, Typography, keyframes } from "@mui/material";
// import img1 from "../../assets/image1/warehouse.jpg";
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const gradientBackground = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// function LandingPage() {
//   return (
//     <Box
//       sx={{
//         width: "100vw",
//         height: "100vh",
//         position: "relative",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundImage: `
//           linear-gradient(135deg, 
//             rgba(118, 136, 202, 0.41) 0%, 
//             rgba(152, 155, 158, 0.85)00%),
//           url(${img1})
//         `,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundBlendMode: "multiply",
//         animation: `${gradientBackground} 20s ease infinite`,
//         color: "white",
//         overflow: "hidden",
//         pt:{xs:"5"},
//       }}
//     >
//       {/* Content Container */}
//       <Box
//         sx={{
//           position: "relative",
//           textAlign: "center",
//           maxWidth: "1200px",
//           padding: { xs: 5, sm: 4 },
//           animation: `${fadeIn} 1s ease-out`,
//         }}
//       >
//         {/* <LocalShippingIcon 
//           sx={{ 
//             fontSize: "4rem", 
//             mb: 3,
//             filter: "drop-shadow(2px 2px 4px rgba(135, 72, 72, 0.5))"
//           }} 
//         /> */}

//         <Typography
//           variant="h1"
//           sx={{
//             fontWeight: 900,
//             lineHeight: 1.1,
//             fontSize: {
//               xs: "2rem",
//               sm: "3rem",
//               md: "4rem",
//               lg: "4rem"
//             },
//             textShadow: "4px 4px 8px rgba(48, 41, 41, 0.6)",
//             mb: 3,
//             background: "linear-gradient(45deg,rgb(232, 236, 20) 30%,rgb(236, 214, 214) 90%)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >

//           <Typography component="span" sx={{ fontWeight: 900 , color:"blueviolet"  }}>
//             BHARAT Parcel
//           </Typography>{" "} <br/>
//            Services Pvt Ltd.
//         </Typography>

//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 500,
//             fontSize: {
//               xs: "1rem",
//               sm: "1.25rem",
//               md: "1.5rem"
//             },
//             mb: 4,
//             letterSpacing: "0.05em",
//             textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
//             maxWidth: "800px",
//             mx: "auto",
//           }}
//         >
//           Your parcel's whereabouts at your fingertips, delivering peace of mind
//           with every shipment
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             gap: 2,
//             justifyContent: "center",
//             alignItems: "center",
//             maxWidth: "700px",
//             mx: "auto",
//           }}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Enter tracking ID"
//             InputProps={{
//               sx: {
//                 backgroundColor: "rgba(213, 205, 205, 0.15)",
//                 borderRadius: "50px",
//                 color: "white",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(255,255,255,0.3)",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(255,255,255,0.5)",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#ffd700",
//                   borderWidth: "2px",
//                 },
//                 padding: "8px 24px",
//                 fontSize: "1.1rem",
//                 transition: "all 0.3s ease",
//               },
//             }}
//             sx={{
//               width: { xs: "100%", sm: "400px" },
//               backdropFilter: "blur(5px)",
//             }}
//           />

//           <Button
//             variant="contained"
//             sx={{
//               py: 1.5,
//               px: 4,
//               borderRadius: "50px",
//               fontSize: "1.1rem",
//               fontWeight: 700,
//               background: "linear-gradient(45deg, #ffd700 30%, #ffea00 90%)",
//               color: "#1a237e",
//               textTransform: "uppercase",
//               letterSpacing: "1px",
//               boxShadow: "0 4px 15px rgba(255,215,0,0.4)",
//               "&:hover": {
//                 transform: "translateY(-2px)",
//                 boxShadow: "0 6px 20px rgba(255,215,0,0.6)",
//                 background: "linear-gradient(45deg, #ffd700 10%, #ffea00 90%)",
//               },
//               transition: "all 0.3s ease",
//             }}
//           >
//             Track Package
//           </Button>
//         </Box>

//         <Typography
//           variant="body2"
//           sx={{
//             mt: 3,
//             opacity: 0.2,
//             fontStyle: "italic",
//             fontSize: "0.9rem",
//             "&:hover": {
//               opacity: 1,
//             },
//             transition: "opacity 0.3s ease",
//           }}
//         >
//           Trusted by over 50,000+ businesses nationwide
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default LandingPage;

import React from "react";
import { Box, Button, TextField, Typography, keyframes } from "@mui/material";
import img1 from "../../assets/image1/warehouse.jpg";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function LandingPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `
          linear-gradient(135deg, 
            rgba(118, 136, 202, 0.41) 0%, 
            rgba(152, 155, 158, 0.85) 100%),
          url(${img1})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        animation: `${gradientBackground} 20s ease infinite`,
        color: "white",
        overflow: "hidden",
        pt: { xs: "5" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          maxWidth: "1200px",
          padding: { xs: 3, sm: 4 },
          animation: `${fadeIn} 1s ease-out`,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            lineHeight: 1.1,
            fontSize: {
              xs: "1.5rem",
              sm: "2.5rem",
              md: "4rem",
            },
            textShadow: "4px 4px 8px rgba(48, 41, 41, 0.6)",
            mb: { xs: 2, sm: 3 },
            background: "linear-gradient(45deg,rgb(232, 236, 20) 30%,rgb(236, 214, 214) 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <Typography component="span" sx={{ fontWeight: 900, color: "blueviolet" }}>
            BHARAT Parcel
          </Typography>
          <br />
          Services Pvt Ltd.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: "0.875rem",
              sm: "1.25rem",
              md: "1.5rem",
            },
            mb: { xs: 2, sm: 4 },
            letterSpacing: "0.05em",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Your parcel's whereabouts at your fingertips, delivering peace of mind
          with every shipment
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Enter tracking ID"
            InputProps={{
              sx: {
                backgroundColor: "rgba(213, 205, 205, 0.15)",
                borderRadius: "50px",
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffd700",
                  borderWidth: "2px",
                },
                padding: "8px 24px",
                fontSize: { xs: "0.9rem", sm: "1.1rem" },
                transition: "all 0.3s ease",
              },
            }}
            sx={{
              width: { xs: "100%", sm: "400px" },
              backdropFilter: "blur(5px)",
              "& input": {
                padding: "10px 20px",
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              py: { xs: 1.2, sm: 1.5 },
              px: { xs: 3, sm: 4 },
              borderRadius: "50px",
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
              fontWeight: 700,
              background: "linear-gradient(45deg, #ffd700 30%, #ffea00 90%)",
              color: "#1a237e",
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "0 4px 15px rgba(255,215,0,0.4)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(255,215,0,0.6)",
                background: "linear-gradient(45deg, #ffd700 10%, #ffea00 90%)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Track Package
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 3,
            opacity: 0.2,
            fontStyle: "italic",
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            "&:hover": {
              opacity: 1,
            },
            transition: "opacity 0.3s ease",
          }}
        >
          Trusted by over 50,000+ businesses nationwide
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;
