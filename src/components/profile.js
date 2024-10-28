// components/profile.js
import React from "react";
import { Container, Grid, CssBaseline, Box } from "@mui/material";
import Banner from "./banner";
import StacksCard from "./cards/stacks";
import IntroductionCard from "./cards/introduction";
import AboutCard from "./cards/about";
import ContactCard from "./cards/contact";

const Profile = () => (
  <Box>
    <CssBaseline />
    {/* Full-width Banner */}
    <Banner />

    {/* Main content with menu inside container */}
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        {/* Introduction Section */}
        <Grid item xs={12}>
          <IntroductionCard />
        </Grid>

        {/* Stacks Section */}
        <Grid item xs={12}>
          <StacksCard />
        </Grid>

        {/* About Me Section */}
        <Grid item xs={12}>
          <AboutCard />
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12}>
          <ContactCard />
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Profile;
