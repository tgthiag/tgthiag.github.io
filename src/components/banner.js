import React from 'react';
import { Box, Typography } from '@mui/material';

const Banner = ({ onMenuClick }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '55vh',
        backgroundImage: 'url(/images/banner.png)', // Path to your banner image
        backgroundSize: "cover",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        color: '#fff',
        paddingTop: 5,
        backgroundRepeat:"round"
      }}
    >
      {/* Avatar with Border */}
      <Box
        component="img"
        src="/images/eu.jpg"
        alt="Avatar"
        sx={{
          width: 150,
          height: 150,
          borderRadius: '50%', // Circular avatar
          border: '3px solid rgba(255, 255, 255, 0.6)', // Subtle white border around the avatar
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)', // Slight shadow for depth
          mb: 2,
          '&:hover': {
  transform: 'scale(1.05)', // Slight enlargement on hover
  transition: 'transform 0.3s ease',
}
        }}
      />

      {/* Name with Refined Text Shadow */}
      <Typography
        variant="h3"
        component="h1"
        sx={{
          textShadow: '2px 4px 6px rgba(0, 0, 0, 0.8)',
          fontWeight: 600,
          '&:hover': {
  transform: 'scale(1.05)', // Slight enlargement on hover
  transition: 'transform 0.3s ease',
}
        }}
      >
        Thiago Carvalho
      </Typography>
      
      {/* Job Title with Refined Text Shadow */}
      <Typography
        variant="h5"
        sx={{
          textShadow: '2px 4px 6px rgba(0, 0, 0, 0.8)',
          '&:hover': {
  transform: 'scale(1.05)', // Slight enlargement on hover
  transition: 'transform 0.3s ease',
}
        }}
      >
        Web, Mobile & Desktop Developer
      </Typography>
    </Box>
  );
};

export default Banner;
