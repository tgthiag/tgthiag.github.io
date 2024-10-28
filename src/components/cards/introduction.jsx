import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const IntroductionCard = () => (
  <Card sx={{ backgroundColor: "#fff", padding: 0 }}>
    <CardContent>
      <Typography variant="body1">
        Developer with experience in software solutions for Web, Mobile, and Desktop.
        Passionate about modern technologies and focused on delivering high-quality products
        in the shortest possible time.
      </Typography>
    </CardContent>
  </Card>
);

export default IntroductionCard;
