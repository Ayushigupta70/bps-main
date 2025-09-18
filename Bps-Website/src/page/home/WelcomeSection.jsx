
import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import img from "../../assets/image1/bps.png";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlaceIcon from "@mui/icons-material/Place";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  borderRadius: "16px",
  boxShadow: theme.shadows[10],
  animation: `${float} 6s ease-in-out infinite`,
}));

const StatCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  boxShadow: theme.shadows[2],
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

const WelcomeSection = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const headingVariant = isXs ? "h2" : isSm ? "h2" : isMd ? "h2" : "h1";

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
         px: { xs: 2, sm: 4, md: 6, lg: 10 },
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: -100,
          right: -100,
          width: "400px",
          height: "400px",
          background: `linear-gradient(45deg, ${theme.palette.primary.light}, transparent)`,
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.3,
        },
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <StyledImage src={img} alt="Welcome" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: "center",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant={headingVariant}
              gutterBottom
              sx={{
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 3,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${fadeIn} 1s ease-out`,
                textTransform: "uppercase",
              }}
            >
              Welcome to Bharat Parcel
            </Typography>

            <Typography
              variant="h6"
              paragraph
              sx={{
                mb: 3,
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                color: "text.secondary",
              }}
            >
              <Box component="span" sx={{ color: "primary.main" }}>
                Delivering Trust,
              </Box>{" "}
              One Parcel at a Time!
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{
                mb: 3,
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                lineHeight: 1.8,
                color: "text.secondary",
              }}
            >
              At Bharat Parcel, we believe in making logistics simple, fast, and
              reliable. Whether you're shipping across cities or tracking an
              important delivery, we ensure your parcels reach their destination
              safely and on time.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StatCard>
                  <CheckCircleIcon sx={{ color: "success.main", mr: 1 }} />
                  <Typography variant="body1" fontWeight="500">
                    99% Delivery Success Rate
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StatCard>
                  <PlaceIcon sx={{ color: "error.main", mr: 1 }} />
                  <Typography variant="body1" fontWeight="500">
                    200+ Cities Covered India
                  </Typography>
                </StatCard>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomeSection;
