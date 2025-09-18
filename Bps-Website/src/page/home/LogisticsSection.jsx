// import { Box, Typography, Container, Grid, Stack } from "@mui/material";
// import icon1 from "../../assets/image1/icon1.webp";
// import icon2 from "../../assets/image1/icon2.webp";
// import award2 from "../../assets/image1/award2.jpg";
// import award3 from "../../assets/image1/award3.jpg";

// const LogisticsSection = () => {
//   return (
//     <Box
//       maxWidth="lg"
//       sx={{ backgroundColor: "#E3F2FD", py: 5, my: 10, mx: "auto" }}
//     >
//       <Grid container spacing={4} alignItems="center" justifyContent="center">
//         {/* Text Content Section */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ backgroundColor: "#E3F2FD", borderRadius: 2, px: 5 }}>
//             <Typography
//               component="blockquote"
//               variant="h5"
//               sx={{
//                 fontWeight: "bold",
//                 color: "primary.main",
//                 textAlign: "left",
//                 mb: 2,
//               }}
//             >
//               "The line between disorder and order lies in logistics...."
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 textAlign: "center",
//                 fontStyle: "italic",
//                 color: "text.secondary",
//               }}
//             >
//               – SUN TZU
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 textAlign: "left",
//                 mt: 3,
//                 lineHeight: 1.7,
//               }}
//             >
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
//               tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 600,
//                 color: "primary.dark",
//                 textAlign: "left",
//                 mt: 2,
//               }}
//             >
//               Managing everything from source to destination is Logistics...
//             </Typography>
//             <Box
//               sx={{ borderLeft: 4, borderColor: "primary.main", pl: 3, mt: 3 }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: "bold",
//                   color: "primary.dark",
//                   textAlign: "center",
//                 }}
//               >
//                 Safety & Security of lives
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   fontStyle: "italic",
//                   color: "text.secondary",
//                   textAlign: "center",
//                 }}
//               >
//                 – Our guiding force
//               </Typography>
//             </Box>
//           </Box>
//         </Grid>

//         {/* Circular Grid Section */}

//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{ display: "flex", justifyContent: "center" }}
//         >
//           <Box
//             sx={{
//               width: "100%",
//               position: "relative",
//               "&::before": {
//                 content: '""',
//                 display: "block",
//                 paddingTop: "100%",
//               },
//             }}
//           >
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 overflow: "hidden",
//                 borderRadius: "50%",
//                 border: "2px solid #1976d2",
//               }}
//             >
//               {/* Top Left Quarter - Blue with Logistics Text */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "50%",
//                   gap: 1,
//                   height: "50%",
//                   bgcolor: "#1976d2",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "right center",
//                   alignItems: "center",
//                   p: 3,
//                   color: "white",
//                   textAlign: "center",
//                   borderBottom: "5px solid #eee",
//                   borderRight: "5px solid #eee",
//                 }}
//               >
//                 <Box />
//                 <img
//                   src={icon2}
//                   alt="Logistics Icon 1"
//                   style={{ width: "40%", height: "auto" }}
//                 />
//                 {/* <Typography
//                   variant="body2"
//                   color="white"
//                   sx={{ textAlign: "center", mt: 1 }}
//                 >
//                   Managing everything from source to destination...
//                 </Typography> */}
//               </Box>

//               {/* Top Right Quarter - Worker Image */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 0,
//                   right: 0,
//                   width: "50%",
//                   height: "50%",
//                   overflow: "hidden",
//                   borderLeft: "5px solid #eee",
//                   borderBottom: "5px solid #eee",
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={award2}
//                   alt="Logistics worker with clipboard"
//                   sx={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//               </Box>

//               {/* Bottom Left Quarter - Trophy Image */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   width: "50%",
//                   height: "50%",
//                   overflow: "hidden",
//                   borderRight: "5px solid #eee",
//                   borderTop: "5px solid #eee",
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={award3}
//                   alt="Trophy"
//                   sx={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//               </Box>

//               {/* Bottom Right Quarter - Blue with Safety Text */}
//               <Stack sx={{ width: "50%", height: "50%" }}>
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     right: 0,
//                     width: "50%",
//                     height: "50%",
//                     bgcolor: "#1976d2",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center center",
//                     alignContent: " left",
//                     p: 3,
//                     color: "white",
//                     textAlign: "center",
//                     borderTop: "5px solid #eee",
//                     borderLeft: "5px solid #eee",
//                   }}
//                 >
//                   <img
//                     src={icon1}
//                     alt="Logistics Icon 1"
//                     style={{ width: "40%", height: "auto" }}
//                   />
//                   {/* <Typography
//                     variant="body2"
//                     color="white"
//                     sx={{ textAlign: "center", mt: 1 }}
//                   >
//                     Managing everything from source to destination...
//                   </Typography> */}
//                 </Box>
//                 <Box sx={{ flex: 1 }}>
//                   <img
//                     src={award2}
//                     alt="Award for logistics excellence"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 </Box>
//               </Stack>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default LogisticsSection; 


import { Box, Typography, Container, Grid, Stack } from "@mui/material";
import icon1 from "../../assets/image1/icon1.webp";
import icon2 from "../../assets/image1/icon2.webp";
import award2 from "../../assets/image1/award2.jpg";
import award3 from "../../assets/image1/award3.jpg";

const LogisticsSection = () => {
  return (
    <Box
      maxWidth="lg"
      sx={{ backgroundColor: "#E3F2FD", py: 5, my: 10, mx: "auto" }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Text Content Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: "#E3F2FD", borderRadius: 2, px: 5 }}>
            <Typography
              component="blockquote"
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "left",
                mb: 2,
              }}
            >
              "The line between disorder and order lies in logistics...."
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                fontStyle: "italic",
                color: "text.secondary",
              }}
            >
              – SUN TZU
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "left",
                mt: 3,
                lineHeight: 1.7,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "primary.dark",
                textAlign: "left",
                mt: 2,
              }}
            >
              Managing everything from source to destination is Logistics...
            </Typography>
            <Box
              sx={{ borderLeft: 4, borderColor: "primary.main", pl: 3, mt: 3 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "primary.dark",
                  textAlign: "center",
                }}
              >
                Safety & Security of lives
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  color: "text.secondary",
                  textAlign: "center",
                }}
              >
                – Our guiding force
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Circular Grid Section */}

        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              "&::before": {
                content: '""',
                display: "block",
                paddingTop: "100%",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "hidden",
                borderRadius: "50%",
                border: "2px solid #1976d2",
              }}
            >
              {/* Top Left Quarter - Blue with Logistics Text */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  gap: 1,
                  height: "50%",
                  bgcolor: "#1976d2",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "right center",
                  alignItems: "center",
                  p: 6,
                  color: "white",
                  textAlign: "center",
                  borderBottom: "5px solid #eee",
                  borderRight: "5px solid #eee",
                }}
              >
                <Box />
                <img
                  src={icon1}
                  alt="Logistics Icon 1"
                  style={{ width: "40%", height: "auto" }}
                />
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ textAlign: "center" }}
                >
                  Managing everything from source to destination...
                </Typography>
              </Box>

              {/* Top Right Quarter - Worker Image */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "50%",
                  height: "50%",
                  overflow: "hidden",
                  borderLeft: "5px solid #eee",
                  borderBottom: "5px solid #eee",
                }}
              >
                <Box
                  component="img"
                  src={award3}
                  alt="Logistics worker with clipboard"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Bottom Left Quarter - Trophy Image */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "50%",
                  height: "50%",
                  overflow: "hidden",
                  borderRight: "5px solid #eee",
                  borderTop: "5px solid #eee",
                }}
              >
                <Box
                  component="img"
                  src={award2}
                  alt="Trophy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Bottom Right Quarter - Blue with Safety Text */}
              <Stack sx={{ width: "50%", height: "50%" }}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "50%",
                    height: "50%",
                    bgcolor: "#1976d2",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center center",
                    alignContent: " left",
                    p: 3,
                    pl:1,
                    color: "white",
                    textAlign: "center",
                    borderTop: "5px solid #eee",
                    borderLeft: "5px solid #eee",
                  }}
                >
                  <img
                    src={icon2}
                    alt="Logistics Icon 1"
                    style={{ width: "40%", height: "auto" }}
                  />
                  <Typography
                    variant="body2"
                    color="white"
                    sx={{ textAlign: "center", mt: 1 }}
                  >
                    Safety & Security of lives – Our guiding force
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <img
                    src={award2}
                    alt="Award for logistics excellence"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogisticsSection;
