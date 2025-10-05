import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import BackButton from '../BackButton';

interface AssuranceExplanationProps {
  onBack: () => void;
  onShowCards: () => void;
}

const AssuranceExplanation: React.FC<AssuranceExplanationProps> = ({ onBack, onShowCards }) => {

  const steps = [
    'Présentation des prestations',
    'Sélection par le client',
    'Comparatif personnalisé',
    'Accompagnement'
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
          Assurances Complémentaires
        </Typography>
      </Box>

      {/* Stepper */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Explication du processus */}
      <Card sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
            Comment fonctionne notre service de conseil ?
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(25,118,210,0.1)',
                  mr: 2,
                  flexShrink: 0
                }}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>1</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Présentation des prestations
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nous vous présentons les différents champs de prestations disponibles 
                    pour vous aider à comprendre vos options d'assurance complémentaire.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(25,118,210,0.1)',
                  mr: 2,
                  flexShrink: 0
                }}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>2</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Votre sélection
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vous sélectionnez les catégories qui vous intéressent selon vos besoins 
                    et votre situation personnelle.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(25,118,210,0.1)',
                  mr: 2,
                  flexShrink: 0
                }}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>3</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Comparatif personnalisé
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nous réalisons un comparatif précis des offres disponibles 
                    selon vos sélections et votre profil.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(25,118,210,0.1)',
                  mr: 2,
                  flexShrink: 0
                }}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>4</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Accompagnement
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nous vous accompagnons chaque année pour comparer votre assurance maladie 
                    et vous aider à réaliser des économies.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>


      {/* Bouton pour accéder aux cartes détaillées */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={onShowCards}
          sx={{
            borderColor: '#1976d2',
            color: '#1976d2',
            '&:hover': {
              borderColor: '#1976d2',
              backgroundColor: 'rgba(25,118,210,0.1)',
            },
            px: 4,
            py: 1.5,
            borderRadius: 2
          }}
        >
          Voir les prestations détaillées
        </Button>
      </Box>
    </Box>
  );
};

export default AssuranceExplanation;
