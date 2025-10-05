import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Paper,
  Collapse,
  Chip
} from '@mui/material';
import {
  Star as StarIcon,
  LocalHospital as HospitalIcon,
  Healing as DentalIcon,
  Gavel as LegalIcon,
  Add as OtherIcon,
  CheckCircle as CheckCircleIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BackButton from '../BackButton';
import { motion } from 'framer-motion';

interface AssuranceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onAccess: () => void;
}

interface AssuranceCardsProps {
  onCardClick?: (cardType: string) => void;
  onBack?: () => void;
}

const AssuranceCard: React.FC<AssuranceCardProps> = ({ title, description, icon, onAccess }) => {
  const theme = useTheme();

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
      onClick={onAccess}
    >
      <CardContent sx={{ p: 3, flexGrow: 1, position: 'relative' }}>
        {/* Icône en haut à droite */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#1976d2'
          }}
        >
          {icon}
        </Box>

        {/* Titre */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            color: '#333',
            mb: 2,
            pr: 4, // Espace pour l'icône
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
            fontSize: '0.9rem'
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
            {title === 'Ambulatoires' && 'Accéder aux assurances complémentaires ambulatoires'}
            {title === 'Assurances d\'hospitalisation' && 'Accéder aux assurances d\'hospitalisation'}
            {title === 'Assurance dentaire' && 'Plus sur l\'assurance dentaire'}
            {title === 'Assurances protection juridique' && 'Accéder aux assurances protection juridique'}
            {title === 'Autres assurances' && 'Accéder aux autres assurances'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const AssuranceCards: React.FC<AssuranceCardsProps> = ({ onCardClick, onBack }) => {
  const theme = useTheme();
  const [showPrestations, setShowPrestations] = useState(false);

  const togglePrestations = () => {
    setShowPrestations(!showPrestations);
  };

  const assurances = [
    {
      title: 'Ambulatoires',
      description: 'Médecine alternative, étranger, lunettes, fitness, médicaments, prévoyance, etc.',
      icon: <StarIcon sx={{ fontSize: 28 }} />,
      onAccess: () => onCardClick?.('ambulatoires')
    },
    {
      title: 'Assurances d\'hospitalisation',
      description: 'Libre choix de l\'hôpital, confort et intimité, libre choix du médecin, etc. en cas de séjour hospitalier stationnaire.',
      icon: <HospitalIcon sx={{ fontSize: 28 }} />,
      onAccess: () => onCardClick?.('hospitalisation')
    },
    {
      title: 'Assurance dentaire',
      description: 'Frais dentaires dans le monde entier, appareil dentaire, hygiène dentaire, examens de contrôle, etc.',
      icon: <DentalIcon sx={{ fontSize: 28 }} />,
      onAccess: () => onCardClick?.('dentaire')
    },
    {
      title: 'Assurances protection juridique',
      description: 'Protection juridique Internet, privée et de circulation avec couverture dans le domaine de la santé et à l\'étranger.',
      icon: <LegalIcon sx={{ fontSize: 28 }} />,
      onAccess: () => onCardClick?.('juridique')
    },
    {
      title: 'Autres assurances',
      description: 'Soins de longue durée, capital invalidité ou décès, perte de gain, etc.',
      icon: <OtherIcon sx={{ fontSize: 28 }} />,
      onAccess: () => onCardClick?.('autres')
    }
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      {/* Bouton de retour */}
      {onBack && (
        <Box sx={{ mb: 3 }}>
          <BackButton onClick={onBack} />
        </Box>
      )}

      {/* Information importante sur les conditions d'accès */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 4,
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #fff3e0 0%, #ffffff 100%)',
            border: '2px solid #ff9800'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-start',
            gap: 2,
            p: 3,
            background: 'linear-gradient(45deg, #ff9800 30%, #ffc107 90%)',
            color: 'white'
          }}>
            <Box sx={{ 
              p: 1, 
              borderRadius: '50%', 
              backgroundColor: 'rgba(255,255,255,0.2)',
              flexShrink: 0,
              mt: 0.5
            }}>
              <WarningIcon sx={{ fontSize: 24 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: 'white'
              }}>
                Conditions d'accès importantes
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'white',
                lineHeight: 1.6,
                mb: 2
              }}>
                Les assurances complémentaires sont réservées aux personnes en bonne santé. Un questionnaire médical détaillé sera requis lors de votre demande.
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'white',
                lineHeight: 1.6,
                mb: 2
              }}>
                L'assureur évaluera votre dossier médical et se réserve le droit d'accepter ou de refuser votre demande d'assurance complémentaire.
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'white',
                lineHeight: 1.6,
                fontWeight: 600
              }}>
                Les affections préexistantes seront systématiquement exclues de la couverture.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Section Prestations incluses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 4,
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #e8f5e8 0%, #ffffff 100%)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 3,
            background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircleIcon sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Prestations incluses dans les assurances complémentaires
              </Typography>
            </Box>
            <IconButton 
              onClick={togglePrestations}
              sx={{ color: 'white' }}
            >
              {showPrestations ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          
          <Collapse in={showPrestations}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Les assurances complémentaires offrent une couverture étendue pour de nombreux soins non couverts par l'assurance de base.
              </Typography>
              
              <Grid container spacing={2}>
                {[
                  'Couverture des soins médicaux de base',
                  'Traitements hospitaliers en division commune',
                  'Médicaments de la liste spéciale',
                  'Soins dentaires d\'urgence',
                  'Transport d\'urgence en ambulance',
                  'Prévention et dépistage de base'
                ].map((prestation, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 2,
                      backgroundColor: 'rgba(76,175,80,0.05)',
                      borderRadius: 2,
                      border: '1px solid rgba(76,175,80,0.1)'
                    }}>
                      <CheckCircleIcon sx={{ color: '#4caf50', mr: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        {prestation}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Collapse>
        </Paper>
      </motion.div>

      <Box sx={{ mt: 4 }} />

      <Grid container spacing={3}>
        {assurances.map((assurance, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AssuranceCard
              title={assurance.title}
              description={assurance.description}
              icon={assurance.icon}
              onAccess={assurance.onAccess}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AssuranceCards;
