import React from "react";
import { Typography } from "@mui/material";

const Title = ({ text }) => (
  <Typography
    variant="h5"
    align="center"
    gutterBottom
    sx={{
      fontWeight: 'bold',
      mb: "10px",
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
      color: '#333', // adjust this as needed
    }}
  >
    {text}
  </Typography>
);

export default Title;
