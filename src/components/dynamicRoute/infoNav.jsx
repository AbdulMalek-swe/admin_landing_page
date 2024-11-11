import React from 'react';
import { Box, Typography,   IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const InfoBox = ({page="Dashboard",href="/dashboard",hrefName="View Dashboard"}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        bgcolor: 'background.paper',
        // maxWidth: 400,
        mx: 'auto',
        mb: 3,
      }}
    >
      {/* Left side - Name */}
      <Typography variant="h6" fontWeight="bold">
        {page}
      </Typography>

      {/* Right side - Link with Icon */}
      <Link href={href} underline="none" color="inherit">
        <Box display="flex" alignItems="center">
          <Typography variant="body1" mr={0.5}>
             {hrefName}
          </Typography>
          <IconButton size="small" color="primary">
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Link>
    </Box>
  );
};

export default InfoBox;
