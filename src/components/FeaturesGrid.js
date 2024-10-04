import React from 'react';
import { Grid2, Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Données des modules de fonctionnalité
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
        icon: 'fas fa-newspaper', // Remplacez par l'icône souhaitée
        link: '/',
    },
    {
        title: 'Guide Thématique',
        description: 'Enregistrer, modifier et supprimer le guide.',
        icon: 'fas fa-book-open', // Remplacez par l'icône souhaitée
        link: '/',
    },
    {
        title: 'Cartographies',
        description: 'Enregistrer, modifier et supprimer les cartons.',
        icon: 'fas fa-map', // Remplacez par l'icône souhaitée
        link: '/',
    },
    {
        title: 'Vidéos',
        description: 'Enregistrer, modifier et supprimer les vidéos.',
        icon: 'fas fa-video', // Remplacez par l'icône souhaitée
        link: '/',
    },
    {
        title: 'Prières',
        description: 'Enregistrer, modifier et supprimer les prières.',
        icon: 'fas fa-praying-hands', // Remplacez par l'icône souhaitée
        link: '/',
    },
];

const FeaturesGrid = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: 4,
                display: 'flex',
                justifyContent: 'center', // Centrer horizontalement
                alignItems: 'center', // Centrer verticalement
                minHeight: '10vh', // Prendre toute la hauteur de l'écran
            }}
        >
            <Box sx={{ maxWidth: 1200, width: '100%' }}> {/* Limiter la largeur de la grille */}
                <Typography variant="h4" align="center" gutterBottom>
                    Espace admin
                </Typography>
                <Grid2 container spacing={4} justifyContent="center"> {/* Centrer les éléments de la grille */}
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
    );
};

export default FeaturesGrid;
