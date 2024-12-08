import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './Footer.module.css'; // Import the CSS module

const Footer = () => {
  return (
    <Box className={''}>
      <Typography variant="body2" color="text.secondary">
        &copy; 2024 360 Degree Feedback
      </Typography>
    </Box>
  );
};

export default Footer;