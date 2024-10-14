import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate(); // Create navigate function
    const [showServices, setShowServices] = useState(false); // State to control services toggle

    // Function to handle toggle
    const toggleServices = () => {
        setShowServices(!showServices); // Toggle between true and false
    };

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleRegisterClick = () => {
        navigate('/signup');
    };

    return (
        <>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#111', paddingY: '10px' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <img src="/logo.png" alt="Ranaweera Construction Logo" style={{ height: '50px' }} />
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/about-us">About Us</Button>
                    <Button
                        variant="contained"
                        sx={{
                            ml: 2,
                            fontWeight: 'bold',
                            padding: '8px 20px',
                            backgroundColor: '#FEC304',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#DDA304',  // Optional hover effect
                            }
                        }}
                        onClick={handleLoginClick}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            ml: 2,
                            fontWeight: 'bold',
                            padding: '8px 20px',
                            backgroundColor: '#FEC304',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#DDA304',  // Optional hover effect
                            }
                        }}
                        onClick={handleRegisterClick}
                    >
                        Register
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: 'url(https://img.freepik.com/free-photo/illustration-construction-site_23-2151850239.jpg?t=st=1727807272~exp=1727810872~hmac=60deeb799f974d19de6e1119465f598c795e07e44f4c6a92cbcbb750a3c08710&w=740)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '80vh',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                We Prepare For The <span style={{ color: '#FFCC00' }}>Future</span>
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Building Excellence, Crafting Dreams. Your Trusted Partner in Quality Construction.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={toggleServices} // Toggle visibility
                            >
                                {showServices ? 'Hide Services' : 'Our Services'}
                            </Button>
                            <Button variant="outlined" color="inherit">
                                Our Projects
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Quality Control Box */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 30,
                            right: 30,
                            backgroundColor: '#FFCC00',
                            color: '#000',
                            padding: '20px',
                            borderRadius: '10px',
                            width: '300px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <Typography variant="h6" gutterBottom color="black">
                            Quality Control System
                        </Typography>
                        <Typography variant="body2" color="GrayText">
                            • 100% Satisfaction Guarantee <br />
                            • Highly Professional Staff <br />
                            • Accurate Testing Processes <br />
                            • Unrivalled Workmanship, Professional and Qualified
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box sx={{ backgroundColor: '#111', color: '#fff', py: 6 }}>
                <Container>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h4"
                                    align="center"
                                    sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#FEC304', mb: 2 }}
                                >
                                    25+ Years of Experience
                                </Typography>
                                <Typography variant="body1" align="center">
                                    Years of delivering quality construction solutions.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h4"
                                    align="center"
                                    sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#FEC304', mb: 2 }}
                                >
                                    378+ Projects Completed
                                </Typography>
                                <Typography variant="body1" align="center">
                                    Successfully completed numerous projects worldwide.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h4"
                                    align="center"
                                    sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#FEC304', mb: 2 }}
                                >
                                    69+ Winning Global Awards
                                </Typography>
                                <Typography variant="body1" align="center">
                                    Recognized for excellence in construction and design.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Services Toggle Button */}


            {/* Services Section - Toggle visibility */}
            {showServices && (
                <Box sx={{ backgroundColor: '#f5f5f5', py: 6 }}>
                    <Container>
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                            Our Services
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Residential Construction
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        High-quality residential buildings with modern designs.
                                    </Typography>
                                    <Button variant="contained" color="primary">Learn More</Button>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Commercial Construction
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Constructing state-of-the-art commercial spaces for businesses.
                                    </Typography>
                                    <Button variant="contained" color="primary">Learn More</Button>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Renovations
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Renovating and modernizing existing buildings to meet your needs.
                                    </Typography>
                                    <Button variant="contained" color="primary">Learn More</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            )}
        </>
    );
};

export default HomePage;
