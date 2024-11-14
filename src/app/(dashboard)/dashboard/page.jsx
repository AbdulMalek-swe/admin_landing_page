"use client"
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
 

const Dashboard = () => {
    const data = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 500 },
        { name: 'Apr', value: 700 },
        { name: 'May', value: 600 },
        { name: 'Jun', value: 800 },
    ];

    return (
        <div>
            <Box sx={{ padding: 4 }}>
            <Box display="flex" gap={2} mb={4}>
                {[1, 2, 3].map((item) => (
                    <Card key={item} sx={{ flex: 1 }}>
                        <CardContent>
                            <Typography variant="h6">Card {item}</Typography>
                            <Typography variant="body2">Some quick example text.</Typography>
                             
                        </CardContent>
                    </Card>
                ))}
            </Box>
            
             
        </Box>
        </div>
    );
};

export default Dashboard;