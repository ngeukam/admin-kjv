import React from 'react';
import { Grid2, Card, CardContent, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import useLogout from '../utils/logout';
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const features = [
    {
        title: 'Ancien Testament',
        description: 'Enregistrer, modifier et supprimer les versets',
        icon: 'fas fa-book',
        link: '/versetable',
    },
    {
        title: 'Nouveau Testament',
        description: 'Enregistrer, modifier et supprimer les versets.',
        icon: 'fas fa-newspaper',
        link: '/nbls-versetable',
    },
    {
        title: 'Guide Thématique',
        description: 'Enregistrer, modifier et supprimer le guide.',
        icon: 'fas fa-book-open',
        link: '/',
    },
    {
        title: 'Cartographies',
        description: 'Enregistrer, modifier et supprimer les cartons.',
        icon: 'fas fa-map',
        link: '/',
    },
    {
        title: 'Evénements',
        description: 'Enregistrer, modifier et supprimer les événements.',
        icon: 'fas fa-calendar',
        link: '/eventtable',
    },
    {
        title: 'Prières',
        description: 'Enregistrer, modifier et supprimer les prières.',
        icon: 'fas fa-praying-hands',
        link: '/prayertable',
    },
];

const FeaturesGrid2 = () => {
    return (
        <Box>
            {/* AppBar with Logout Button */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Admin Panel
                    </Typography>
                    <Button color="inherit" onClick={useLogout()}>
                        <PowerSettingsNewIcon />
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Grid2 Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 4,
                    display: 'flex',
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                    minHeight: '60vh', // Take most of the screen height
                }}
            >
                <Box sx={{ maxWidth: 1200, width: '100%' }}>
                    <Grid2 container spacing={4} justifyContent="center">
                        {features.map((feature, index) => (
                            <Grid2 item xs={12} sm={6} md={3} key={index}>
                                <Link to={feature.link} style={{ textDecoration: 'none' }}>
                                    <Card>
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <i className={feature.icon} style={{ fontSize: '50px', marginBottom: '16px', color: '#3f51b5' }}></i>
                                            <Typography variant="h6" component="div" gutterBottom align="center">
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" align="center">
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Box>
        </Box>
    );
};

export default FeaturesGrid2;
