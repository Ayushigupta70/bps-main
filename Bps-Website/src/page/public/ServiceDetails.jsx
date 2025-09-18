import { useParams } from "react-router-dom";
import { Myservices } from "../../data/Myservices";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import img from "../../assets/image1/Service.jpg";

const ServiceDetails = () => {
  const { id } = useParams();
  const service = Myservices.find((item) => item.id === parseInt(id));

  if (!service) {
    return (
      <Typography variant="h1" fontWeight="bold" mt={15} textAlign="center">
        Service Not Found
      </Typography>
    );
  }

  return (
    <>
      {/* Banner */}
      <Box
        sx={{
          width: "100vw",
          height: "350px",
          mt: 4,
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center", px: 2 }}>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              textShadow: "1px 1px 2px rgba(247, 238, 238, 0.4)",
            }}
          >
            {service.title}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.25rem" },
              lineHeight: 1.7,
            }}
          >
            {service.desc}
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          {service.titleInside}
        </Typography>

        <Grid container spacing={4}>
          {/* Section 1 */}
          <Grid item xs={12}>
            <Box mb={3}>
              <img
                src={service.imgpath}
                alt="Service Illustration"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 300,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Box>

            <Typography
              variant="subtitle1"
              color="#808080"
              sx={{ textAlign: "justify", mb: 3 }}
            >
              {service.descInside1}
            </Typography>

            <Typography variant="h2" fontWeight="bold" mb={1}>
              {service.titleInside1}
            </Typography>

            <Typography
              variant="subtitle1"
              color="#808080"
              sx={{ textAlign: "justify" }}
            >
              {service.descInsideTitle1}
            </Typography>
          </Grid>

          {/* Section 2 */}
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="#808080"
              sx={{ textAlign: "justify", mb: 3 }}
            >
              {service.descInside2}
            </Typography>

            <Typography variant="h2" fontWeight="bold" mb={1}>
              {service.titleInside2}
            </Typography>

            <Typography
              variant="subtitle1"
              color="#808080"
              sx={{ textAlign: "justify" }}
            >
              {service.descInsideTitle2}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FFC107",
          py: { xs: 4, md: 2 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" },
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }}
          >
            Looking for a First-Class Career Consultant?
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              fontWeight: "bold",
              bgcolor: "#002e5b",
              borderRadius: 0,
              px: 4,
              py: 1.5,
              mt: { xs: 2, sm: 0 },
              "&:hover": {
                color: "#002e5b",
                bgcolor: "#FFC107",
                border: "2px solid white",
              },
            }}
          >
            Get a Quote
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default ServiceDetails;
