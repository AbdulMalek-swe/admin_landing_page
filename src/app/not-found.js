"use client"
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material'; 
import { keyframes } from '@mui/system';
import Link from 'next/link';

function NotFound() {
    const [fadeIn, setFadeIn] = useState(false);
    const [slideUp, setSlideUp] = useState(false);

    useEffect(() => {
        setFadeIn(true); // Trigger fade-in effect when the component mounts
        setTimeout(() => setSlideUp(true), 500); // Delay for slide-up effect
    }, []);

    // Define the fade-in animation
    const fadeInAnimation = keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    `;

    // Define the slide-up animation
    const slideUpAnimation = keyframes`
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    `;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                padding: 2,
                animation: fadeIn ? `${fadeInAnimation} 1s ease-in` : 'none',
            }}
        >
            <Typography
                variant="h1"
                color="primary"
                sx={{
                    fontSize: '10rem',
                    fontWeight: 'bold',
                    animation: fadeIn ? `${fadeInAnimation} 1s ease-in` : 'none',
                }}
            >
                404
            </Typography>
            <Typography variant="h5" color="textSecondary" sx={{ marginBottom: 3 }}>
                Oops! The page you re looking for doesn t exist.
            </Typography>
            <Button
                component={Link}
                href="/"
                variant="contained"
                color="primary"
                sx={{
                    fontSize: '1.2rem',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    animation: slideUp ? `${slideUpAnimation} 1s ease-out` : 'none',
                }}
            >
                Go to Home
            </Button>
        </Box>
    );
}

export default NotFound;
