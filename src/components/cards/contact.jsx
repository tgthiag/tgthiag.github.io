import React from "react";
import { Card, CardContent, Typography, Link, Box } from "@mui/material";

const ContactCard = () => (
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
        Let's connect! Feel free to reach out to me via any of the following platforms:
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
          <Link href="tel:+5511979717703">
            +55 11 97971-7703
          </Link>
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
          <Link href="https://www.linkedin.com/in/tgthiag" target="_blank">
            https://www.linkedin.com/in/tgthiag
          </Link>
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default ContactCard;
