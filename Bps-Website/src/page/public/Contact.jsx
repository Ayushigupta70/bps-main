

// import React from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Container,
//   Breadcrumbs,
//   Link,
//   Card,
//   CardContent,
//   Divider,
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import contactBanner from "../../assets/image1/contact.png"; // Background image for hero section

// // Office locations data
// const officeLocations = [
//   {
//     city: "Mumbai, India",
//     address: "101 Marine Drive, Nariman Point, Mumbai, Maharashtra 400021",
//     phone: "+91 22 1234 5678",
//     email: "mumbai@logisticspro.com",
//   },
//   {
//     city: "Delhi, India",
//     address: "56 Connaught Place, New Delhi, Delhi 110001",
//     phone: "+91 11 9876 5432",
//     email: "delhi@logisticspro.com",
//   },
//   {
//     city: "Bangalore, India",
//     address: "12 Electronic City, Phase 1, Bangalore, Karnataka 560100",
//     phone: "+91 80 2345 6789",
//     email: "bangalore@logisticspro.com",
//   },
//   {
//     city: "Noida, India",
//     address: "Plot No. 32, Sector 62, Noida, Uttar Pradesh 201301",
//     phone: "+91 120 4567 890",
//     email: "noida@logisticspro.com",
//   },
// ];

// const Contact = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//     // Add your form submission logic here (e.g., API call)
//   };

//   return (
//     <Box sx={{ bgcolor: "#F9FAFB" }}>
//       {/* Hero Section */}
//       <Box
//         sx={{
//           position: "relative",
//           width: "100vw",
//           height: { xs: "60vh", md: "60vh" },
//           backgroundImage: `url(${contactBanner})`,
//           backgroundSize: "cover",
//           backgroundPosition: " center center",
//           display: "flex",
//           alignItems: "center",
//           "&:after": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "rgba(0, 0, 0, 0.6)",
//           },
//         }}
//       >
//         <Container sx={{ position: "relative", zIndex: 1 }}>
//           <Typography
//             variant="h2"
//             sx={{
//               color: "white",
//               fontWeight: 800,
//               fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
//               textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
//             }}
//           >
//             Get in Touch
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               color: "white",
//               mt: 2,
//               maxWidth: "700px",
//               fontSize: { xs: "1rem", sm: "1.25rem" },
//             }}
//           >
//             We're here to assist with all your logistics needs. Reach out today!
//           </Typography>
//         </Container>
//       </Box>

//       {/* Main Content Section */}
//       <Container sx={{ py: { xs: 6, md: 10 } }}>
//         <Grid container spacing={4}>
//           {/* Left Section - Contact Form */}
//           <Grid item xs={12} md={6}>
//             <Typography
//               variant="h4"
//               sx={{ fontWeight: 700, color: "#1976D2", mb: 3 }}
//             >
//               Send Us a Message
//             </Typography>
//             <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
//               Have a question or need assistance? Fill out the form below, and
//               our team will get back to you promptly.
//             </Typography>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <TextField
//                 fullWidth
//                 label="First Name *"
//                 variant="outlined"
//                 margin="normal"
//                 {...register("firstName", {
//                   required: "First Name is required",
//                 })}
//                 error={!!errors.firstName}
//                 helperText={errors.firstName?.message}
//                 sx={{ bgcolor: "white" }}
//               />
//               <TextField
//                 fullWidth
//                 label="Email *"
//                 variant="outlined"
//                 margin="normal"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^\S+@\S+$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//                 sx={{ bgcolor: "white" }}
//               />
//               <TextField
//                 fullWidth
//                 label="Subject *"
//                 variant="outlined"
//                 margin="normal"
//                 {...register("subject", { required: "Subject is required" })}
//                 error={!!errors.subject}
//                 helperText={errors.subject?.message}
//                 sx={{ bgcolor: "white" }}
//               />
//               <TextField
//                 fullWidth
//                 label="Your Message *"
//                 multiline
//                 rows={4}
//                 variant="outlined"
//                 margin="normal"
//                 {...register("message", { required: "Message is required" })}
//                 error={!!errors.message}
//                 helperText={errors.message?.message}
//                 sx={{ bgcolor: "white" }}
//               />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 sx={{
//                   mt: 2,
//                   bgcolor: "#1976D2",
//                   "&:hover": { bgcolor: "#1565C0" },
//                   py: 1.5,
//                   px: 4,
//                 }}
//               >
//                 Send Message
//               </Button>
//             </form>
//           </Grid>

//           {/* Right Section - Contact Info and Map */}
//           <Grid item xs={12} md={6}>
//             <Typography
//               variant="h4"
//               sx={{ fontWeight: 700, color: "#1976D2", mb: 3 }}
//             >
//               Contact Information
//             </Typography>
//             <Card sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 3 }}>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <PhoneIcon sx={{ color: "#1976D2", mr: 2 }} />
//                 <Typography variant="body1">+91 7017866149</Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <EmailIcon sx={{ color: "#1976D2", mr: 2 }} />
//                 <Typography variant="body1">caarun@rediffmail.com</Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <LocationOnIcon sx={{ color: "#1976D2", mr: 2 }} />
//                 <Typography variant="body1">
//                   332, KUCHA GHASI RAM, FATEH PURI, CHANDNI CHOWK DELHI DL
//                   110006
//                 </Typography>
//               </Box>
//             </Card>

//             {/* Map Placeholder */}
//             <Box
//               sx={{
//                 height: "300px",
//                 bgcolor: "#E0E0E0",
//                 borderRadius: 2,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mb: 4,
//                 overflow: "hidden",
//               }}
//             >
//               <iframe
//                 title="Google Map"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0, borderRadius: "8px" }}
//                 loading="lazy"
//                 allowFullScreen
//                 referrerPolicy="no-referrer-when-downgrade"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.304215062335!2d77.22537445!3d28.6561594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd17d19e24bd%3A0x33e23bb3c913d871!2s332%2C%20Kucha%20Ghasiram%2C%20Fatehpuri%2C%20Chandni%20Chowk%2C%20Delhi%2C%20110006%2C%20India!5e0!3m2!1sen!2sin!4v1712056781234!5m2!1sen!2sin"
//               ></iframe>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Office Locations Section */}
//         {/* <Box sx={{ mt: 6 }}>
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 700,
//               color: "#1976D2",
//               mb: 3,
//               textAlign: "center",
//             }}
//           >
//             Our Global Offices
//           </Typography>
//           <Grid container spacing={3}>
//             {officeLocations.map((location, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card
//                   sx={{
//                     p: 3,
//                     minHeight: "200px",
//                     borderRadius: 2,
//                     boxShadow: 3,
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{ fontWeight: 600, color: "#1976D2", mb: 2 }}
//                   >
//                     {location.city}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "#666",
//                       mb: 1,
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <LocationOnIcon sx={{ mr: 1 }} />
//                     {location.address}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
//                     <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
//                     {location.phone}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "#666" }}>
//                     <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
//                     {location.email}
//                   </Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box> */}
//       </Container>

//       {/* CTA Section */}
//       <Box
//         sx={{
//           py: 4,
//           bgcolor: "#1976D2",
//           textAlign: "center",
//         }}
//       >
//         <Container>
//           <Typography
//             variant="h4"
//             sx={{
//               color: "white",
//               fontWeight: 700,
//               mb: 3,
//               fontSize: { xs: "1.5rem", md: "2rem" },
//             }}
//           >
//             Ready to Optimize Your Logistics?
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               bgcolor: "#FFC107",
//               color: "black",
//               "&:hover": { bgcolor: "#FFB300" },
//               px: 4,
//               py: 1.5,
//             }}
//           >
//             Request a Quote
//           </Button>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Contact; 



import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Card,
} from "@mui/material";
import { useForm } from "react-hook-form";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import contactBanner from "../../assets/image1/contact.png";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Box sx={{ bgcolor: "#F9FAFB" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: { xs: "60vh", md: "80vh" },
          backgroundImage: `url(${contactBanner})`,
          backgroundSize: "cover",
          backgroundPosition: " center left",
          display: "flex",
          alignItems: "center",
          "&:after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
              "@media (max-width:600px) and (orientation:landscape)": {
                fontSize: "1.5rem",
              },
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              mt: 2,
              maxWidth: "700px",
              fontSize: { xs: "1rem", sm: "1.25rem" },
              "@media (max-width:600px) and (orientation:landscape)": {
                fontSize: "0.9rem",
              },
            }}
          >
            We're here to assist with all your logistics needs. Reach out today!
          </Typography>
        </Container>
      </Box>

      {/* Main Section */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976D2", mb: 3 }}>
              Send Us a Message
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
              Have a question or need assistance? Fill out the form below, and our team will get back to you promptly.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              {[
                { label: "First Name *", name: "firstName", type: "text", required: "First Name is required" },
                {
                  label: "Email *",
                  name: "email",
                  type: "email",
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                },
                { label: "Subject *", name: "subject", type: "text", required: "Subject is required" },
              ].map(({ label, name, type, required, pattern = null }) => (
                <TextField
                  key={name}
                  fullWidth
                  label={label}
                  variant="outlined"
                  margin="normal"
                  type={type}
                  {...register(name, { required, pattern })}
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                  sx={{ bgcolor: "white" }}
                />
              ))}

              <TextField
                fullWidth
                label="Your Message *"
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                {...register("message", { required: "Message is required" })}
                error={!!errors.message}
                helperText={errors.message?.message}
                sx={{ bgcolor: "white" }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: "#1976D2",
                  "&:hover": { bgcolor: "#1565C0" },
                  py: 1.5,
                  px: 4,
                }}
              >
                Send Message
              </Button>
            </form>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976D2", mb: 3 }}>
              Contact Information
            </Typography>

            <Card sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 3 }}>
              {[
                { icon: <PhoneIcon />, text: "+91 7017866149" },
                { icon: <EmailIcon />, text: "caarun@rediffmail.com" },
                {
                  icon: <LocationOnIcon />,
                  text: "332, KUCHA GHASI RAM, FATEH PURI, CHANDNI CHOWK DELHI DL 110006",
                },
              ].map(({ icon, text }, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {React.cloneElement(icon, { sx: { color: "#1976D2", mr: 2 } })}
                  <Typography variant="body1">{text}</Typography>
                </Box>
              ))}
            </Card>

            <Box
              sx={{
                height: "300px",
                bgcolor: "#E0E0E0",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 4,
                overflow: "hidden",
              }}
            >
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "8px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.304215062335!2d77.22537445!3d28.6561594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd17d19e24bd%3A0x33e23bb3c913d871!2s332%2C%20Kucha%20Ghasiram%2C%20Fatehpuri%2C%20Chandni%20Chowk%2C%20Delhi%2C%20110006%2C%20India!5e0!3m2!1sen!2sin!4v1712056781234!5m2!1sen!2sin"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CTA */}
      <Box sx={{ py: 4, bgcolor: "#1976D2", textAlign: "center" }}>
        <Container>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "1.5rem", md: "2rem" },
              "@media (max-width:600px) and (orientation:landscape)": {
                fontSize: "1.2rem",
              },
            }}
          >
            Ready to Optimize Your Logistics?
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#FFC107",
              color: "black",
              "&:hover": { bgcolor: "#FFB300" },
              px: 4,
              py: 1.5,
            }}
          >
            Request a Quote
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;

