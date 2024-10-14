import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const AboutUs = () => {
    const navigate = useNavigate();

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
                    <Button color="inherit" component={Link} to="/service">Service</Button>
                    <Button color="inherit" component={Link} to="/project">Project</Button>
                    <Button
                        variant="contained"
                        sx={{
                            ml: 2,
                            fontWeight: 'bold',
                            padding: '8px 20px',
                            backgroundColor: '#FEC304',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#DDA304',
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
                                backgroundColor: '#DDA304',
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
                            About Ranaweera Construction
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                            With over 25 years of experience in the construction industry, Ranaweera Construction has been at the forefront of transforming architectural visions into reality. We pride ourselves on delivering unparalleled workmanship, accuracy, and reliability in every project we undertake.
                            </Typography>
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
                            • Unrivaled Workmanship, Professional and Qualified
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
                                    sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#FEC304', mb: 2 }}
                                >
                                    25+ Years of Experience
                                </Typography>
                                <Typography variant="body1">
                                    Years of delivering quality construction solutions.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h4"
                                    sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#FEC304', mb: 2 }}
                                >
                                    378+ Projects Completed
                                </Typography>
                                <Typography variant="body1">
                                    Successfully completed numerous projects worldwide.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h4"
                                    sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#FEC304', mb: 2 }}
                                >
                                    69+ Global Awards
                                </Typography>
                                <Typography variant="body1">
                                    Recognized for excellence in construction and design.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* About Us Section */}
            <Box sx={{ backgroundColor: '#fff', py: 6 }}>
                <Container>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Box textAlign="center">
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                                    About Ranaweera Construction
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3 }}>
                                    With over 25 years of experience in the construction industry, Ranaweera Construction has been at the forefront of transforming architectural visions into reality. We pride ourselves on delivering unparalleled workmanship, accuracy, and reliability in every project we undertake.
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 6 }}>
                                    Our commitment to quality and excellence is backed by a team of highly skilled professionals who are dedicated to exceeding client expectations. Whether it’s a small-scale renovation or a large commercial project, we apply the same attention to detail, ensuring that our clients’ needs are met with precision.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default AboutUs;
