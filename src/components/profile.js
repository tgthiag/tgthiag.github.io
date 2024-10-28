import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Link,
  CssBaseline,
  Box,
} from "@mui/material";
import Banner from "./banner";
import StacksCard from "./cards/stacks";

const Profile = () => {
  const menuItems = [
    "Sobre Mim",
    "Principais Competências",
    "Projetos",
    "Contato",
  ];

  return (
    <Box>
      <CssBaseline />
      {/* Full-width Banner */}
      <Banner />

      {/* Main content with menu inside container */}
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          {/* Existing Introduction */}
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "#fff", padding: 0 }}>
              <CardContent>
                <Typography variant="body1">
                  Developer with experience in software solutions for Web,
                  Mobile, and Desktop. Passionate about modern technologies and
                  focused on delivering high-quality products in the shortest
                  possible time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Stacks Section */}
          <Grid item xs={12}>
            <StacksCard />
          </Grid>

          {/* New About Me Section */}
          <Grid item xs={12}>
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
                  Hello, I'm Thiago Carvalho, a Full Stack Developer
                  specializing in mobile and web solutions. I hold a background
                  in International Relations, an MBE in Computer Engineering,
                  and a specialization in Mobile Development. I’ve worked
                  extensively with technologies such as Android (Kotlin & Java),
                  Flutter, React, React Native, Node.js, and Python.
                </Typography>
                <Typography variant="body1" paragraph>
                  Throughout my career, I have successfully delivered
                  high-performance applications for industries including retail,
                  manufacturing, rentals, and more. My expertise spans
                  integrating technologies like SQL, Firebase, ERP systems, and
                  HMI SCADA solutions. Whether it’s building from the ground up
                  or deploying full-fledged systems, I focus on delivering
                  optimal solutions that meet client expectations.
                </Typography>
                <Typography variant="body1" paragraph>
                  In addition to development, I can help you monetize your
                  application by implementing in-app purchases and ads with
                  strategies that maintain a great user experience. We can
                  deploy your app to platforms like the Google Play Store,
                  Amazon Appstore, Mi Store, and Apple App Store, ensuring a
                  seamless and fast launch.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12}>
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
                  Contact
                </Typography>
                <Typography variant="body1">
                  Let's connect! Feel free to reach out to me via any of the
                  following platforms:
                </Typography>

                <Box sx={{ marginTop: 3 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    📧 Email:{" "}
                    <Link href="mailto:tgthiag@gmail.com">
                      tgthiag@gmail.com
                    </Link>
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    📱 Phone:{" "}
                    <Link href="tel:+5511979717703">+55 11 97971-7703</Link>
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    📲 WhatsApp:{" "}
                    <Link
                      href="https://api.whatsapp.com/send/?phone=5511979717703&text=Ol%C3%A1%20Thiago!&type=phone_number&app_absent=0"
                      target="_blank"
                    >
                      Chat on WhatsApp!
                    </Link>
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    🐙 GitHub:{" "}
                    <Link href="https://github.com/tgthiag" target="_blank">
                      https://github.com/tgthiag
                    </Link>
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    💼 LinkedIn:{" "}
                    <Link
                      href="https://www.linkedin.com/in/tgthiag"
                      target="_blank"
                    >
                      https://www.linkedin.com/in/tgthiag
                    </Link>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
