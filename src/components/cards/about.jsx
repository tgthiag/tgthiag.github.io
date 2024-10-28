import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const AboutCard = () => (
  <Card
    sx={{
      backgroundColor: "#f5f5f5",
      padding: 3,
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        Hello, I'm Thiago Carvalho, a Full Stack Developer specializing in mobile and web
        solutions. I hold a background in International Relations, an MBE in Computer
        Engineering, and a specialization in Mobile Development. I’ve worked extensively
        with technologies such as Android (Kotlin & Java), Flutter, React, React Native,
        Node.js, and Python.
      </Typography>
      <Typography variant="body1" paragraph>
        Throughout my career, I have successfully delivered high-performance applications
        for industries including retail, manufacturing, rentals, and more. My expertise
        spans integrating technologies like SQL, Firebase, ERP systems, and HMI SCADA
        solutions. Whether it’s building from the ground up or deploying full-fledged
        systems, I focus on delivering optimal solutions that meet client expectations.
      </Typography>
      <Typography variant="body1" paragraph>
        In addition to development, I can help you monetize your application by implementing
        in-app purchases and ads with strategies that maintain a great user experience. We
        can deploy your app to platforms like the Google Play Store, Amazon Appstore, Mi
        Store, and Apple App Store, ensuring a seamless and fast launch.
      </Typography>
    </CardContent>
  </Card>
);

export default AboutCard;
