import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BackButton from '../BackButton';

interface HospitalizationCardProps {
  title: string;
  description: string;
  onLearnMore: () => void;
}

const HospitalizationCard: React.FC<HospitalizationCardProps> = ({ title, description, onLearnMore }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(25,118,210,0.1)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(25,118,210,0.2)',
          border: '1px solid rgba(25,118,210,0.2)',
        },
        cursor: 'pointer'
      }}
      onClick={onLearnMore}
    >
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Titre */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            color: '#333',
            mb: 2,
            fontSize: '1.1rem'
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            lineHeight: 1.6,
            mb: 3,
            fontSize: '0.9rem',
            flexGrow: 1
          }}
        >
          {description}
        </Typography>

        {/* Bouton d'accès */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#1976d2',
            fontWeight: 500,
            fontSize: '0.9rem',
            mt: 'auto'
          }}
        >
          <ArrowForwardIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
          <Typography
            variant="body2"
            sx={{
              color: '#1976d2',
              fontWeight: 500,
              fontSize: '0.9rem'
            }}
          >
            En savoir plus sur {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

interface HospitalizationCardsProps {
  onBack: () => void;
}

const HospitalizationCards: React.FC<HospitalizationCardsProps> = ({ onBack }) => {
  const hospitalizations = [
    {
      title: 'DIVISION COMMUNE',
      description: 'Assurance en division commune en cas de séjour hospitalier stationnaire : 100 % des coûts, libre choix de l\'hôpital.',
      onLearnMore: () => console.log('En savoir plus sur DIVISION COMMUNE')
    },
    {
      title: 'DIVISION DEMI-PRIVÉE',
      description: 'Assurance demi-privée hôpital en cas de séjour hospitalier stationnaire : chambre à deux lits et choix libre du médecin dans toute la Suisse.',
      onLearnMore: () => console.log('En savoir plus sur DIVISION DEMI-PRIVÉE')
    },
    {
      title: 'DIVISION PRIVÉE',
      description: 'Assurance privée hôpital en cas de séjour hospitalier stationnaire: chambre individuelle et libre choix du médecin dans toute la Suisse.',
      onLearnMore: () => console.log('En savoir plus sur DIVISION PRIVÉE')
    },
    {
      title: 'DIVISION FLEX',
      description: 'Assurance flexible à l\'hôpital en cas de séjour hospitalier stationnaire: libre choix de la division au cas par cas.',
      onLearnMore: () => console.log('En savoir plus sur DIVISION FLEX')
    }
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      {/* En-tête avec bouton retour */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <BackButton onClick={onBack} sx={{ mr: 2 }} />
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
            color: '#1976d2',
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Assurances d'hospitalisation
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {hospitalizations.map((hospitalization, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <HospitalizationCard
              title={hospitalization.title}
              description={hospitalization.description}
              onLearnMore={hospitalization.onLearnMore}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HospitalizationCards;
