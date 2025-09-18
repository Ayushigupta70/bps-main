import React from "react";
import { Box } from "@mui/material";

const Map = ({ height = "350px", src }) => {
  return (
    <Box sx={{ backgroundColor: "#00314c", color: "white" }}>
      {/* Google Map */}
      <Box sx={{ width: "100%", height, overflow: "hidden" }}>
        <iframe
          title="Google Map"
          width="100%"
          height={height}
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
          referrerPolicy="no-referrer-when-downgrade"
          src={
            src ||
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.845599736153!2d77.35877537551698!3d28.630421975687074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb67066b5e5f%3A0x7a9dd90c2f5933f5!2sVasundhara%2C%20Ghaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
          }
        ></iframe>
      </Box>
    </Box>
  );
};

export default Map;
