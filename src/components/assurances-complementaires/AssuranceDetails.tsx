import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import BackButton from '../BackButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import GavelIcon from '@mui/icons-material/Gavel';
import StarIcon from '@mui/icons-material/Star';

interface AssuranceDetailsProps {
  onBack: () => void;
  onSelectType: (type: 'lamal' | 'complementaire') => void;
  onShowLamalDetails?: () => void;
}

const AssuranceDetails: React.FC<AssuranceDetailsProps> = ({ onBack, onSelectType, onShowLamalDetails }) => {
  const lamalFeatures = [
    'Couverture des soins médicaux de base',
    'Traitements hospitaliers en division commune',
    'Médicaments de la liste spéciale',
    'Soins dentaires d\'urgence',
    'Transport d\'urgence en ambulance',
    'Prévention et dépistage de base'
  ];

  const complementaryFeatures = [
    'Médecine complémentaire et alternative',
    'Choix libre de l\'hôpital et du médecin',
    'Soins dentaires complets et orthodontie',
    'Lunettes et lentilles de contact',
    'Protection juridique et assistance',
    'Soins de longue durée et invalidité'
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
          Types d'assurances
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Carte Assurance de base LAMal */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
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
            onClick={() => onShowLamalDetails ? onShowLamalDetails() : onSelectType('lamal')}
          >
            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
              {/* Icône */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(25,118,210,0.1)'
                  }}
                >
                  <SecurityIcon sx={{ color: '#1976d2', fontSize: '3rem' }} />
                </Box>
              </Box>

              {/* Titre */}
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  textAlign: 'center',
                  mb: 2
                }}
              >
                Assurance de base LAMal
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: '#666',
                  textAlign: 'center',
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                L'assurance obligatoire qui couvre les soins médicaux essentiels 
                pour tous les résidents en Suisse.
              </Typography>

              {/* Liste des prestations */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#333',
                    mb: 2
                  }}
                >
                  Prestations incluses :
                </Typography>
                <List dense>
                  {lamalFeatures.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: 'text.secondary'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Bouton d'action */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  },
                  py: 1.5,
                  borderRadius: 2
                }}
              >
                En savoir plus
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte Assurances complémentaires */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
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
            onClick={() => onSelectType('complementaire')}
          >
            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
              {/* Icône */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(25,118,210,0.1)'
                  }}
                >
                  <StarIcon sx={{ color: '#1976d2', fontSize: '3rem' }} />
                </Box>
              </Box>

              {/* Titre */}
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  textAlign: 'center',
                  mb: 2
                }}
              >
                Assurances complémentaires
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: '#666',
                  textAlign: 'center',
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                Des prestations supplémentaires pour compléter votre couverture 
                et améliorer votre confort de soins.
              </Typography>

              {/* Liste des prestations */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#333',
                    mb: 2
                  }}
                >
                  Prestations disponibles :
                </Typography>
                <List dense>
                  {complementaryFeatures.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: 'text.secondary'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Bouton d'action */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  },
                  py: 1.5,
                  borderRadius: 2
                }}
              >
                Explorer les assurances complémentaires
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssuranceDetails;
