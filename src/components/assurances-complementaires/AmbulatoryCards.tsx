import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BackButton from '../BackButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Spa as SpaIcon,
  Visibility as GlassesIcon,
  Healing as DentalIcon,
  Psychology as PsychologyIcon,
  LocalHospital as DoctorIcon,
  LocalShipping as AmbulanceIcon,
  FitnessCenter as FitnessIcon,
  Favorite as HeartIcon,
  Medication as MedicationIcon,
  Hearing as HearingIcon,
  Public as GlobeIcon
} from '@mui/icons-material';

interface AmbulatoryItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isExpanded: boolean;
  onExpand: () => void;
}

const AmbulatoryItem: React.FC<AmbulatoryItemProps> = ({ icon, title, description, isExpanded, onExpand }) => {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(25,118,210,0.15)',
          border: '1px solid rgba(25,118,210,0.2)',
        },
        cursor: 'pointer'
      }}
      onClick={onExpand}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(25,118,210,0.1)'
            }}
          >
            {icon}
          </Box>
        </Box>
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: '#333',
              fontSize: '0.9rem',
              mb: isExpanded ? 1 : 0
            }}
          >
            {title}
          </Typography>
          {isExpanded && (
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: '0.75rem',
                lineHeight: 1.3,
                mb: 2
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ExpandMoreIcon 
            sx={{ 
              color: '#1976d2',
              fontSize: '1.2rem'
            }} 
          />
        </Box>
      </CardContent>
    </Card>
  );
};

interface AmbulatoryCardsProps {
  onBack: () => void;
}

const AmbulatoryCards: React.FC<AmbulatoryCardsProps> = ({ onBack }) => {
  const [expandedCards, setExpandedCards] = React.useState<{ [key: number]: boolean }>({});

  const handleCardClick = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const ambulatoryItems = [
    {
      icon: <SpaIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Médecine complémentaire',
      description: 'Traitements ambulatoires et stationnaires de médecine alternative et complémentaire.'
    },
    {
      icon: <GlassesIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Verres de lunettes et lentilles de contact',
      description: 'Remboursement pour vos verres de lunettes et lentilles de contact.'
    },
    {
      icon: <DentalIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Traitements orthodontiques/dents de sagesse',
      description: 'Corrections de malposition dentaire, appareils dentaires et extraction des dents de sagesse.'
    },
    {
      icon: <PsychologyIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Formes de traitement spéciales',
      description: 'Psychothérapie non médicale, stérilisation, vasectomie et autres thérapies spéciales.'
    },
    {
      icon: <DoctorIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Médecins non conventionnés',
      description: 'Traitements ambulatoires dispensés par des médecins non conventionnés.'
    },
    {
      icon: <AmbulanceIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Transport et sauvetage en Suisse',
      description: 'Coûts de sauvetage, dégagement et transport d\'urgence en Suisse.'
    },
    {
      icon: <FitnessIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Promotion de la santé',
      description: 'Programmes sportifs, abonnements fitness, cours d\'aquafit, gymnastique et premiers secours.'
    },
    {
      icon: <HeartIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Prévention',
      description: 'Vaccinations, examens échographiques, désaccoutumance au tabac, examens de détection précoce.'
    },
    {
      icon: <MedicationIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Médicaments',
      description: 'Médicaments de médecine conventionnelle et complémentaire non pris en charge par l\'assurance de base.'
    },
    {
      icon: <HearingIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Moyens et appareils',
      description: 'Aides et appareils prescrits par un médecin (tensiomètres, supports plantaires, etc.).'
    },
    {
      icon: <GlobeIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />,
      title: 'Protection à l\'étranger',
      description: 'Traitements d\'urgence ambulatoires et stationnaires dans l\'UE/AELE/UK et autres pays.'
    }
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
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
          Assurances complémentaires ambulatoires
        </Typography>
      </Box>

      {/* Liste des catégories ambulatoires */}
      <Grid container spacing={2}>
        {ambulatoryItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <AmbulatoryItem
              icon={item.icon}
              title={item.title}
              description={item.description}
              isExpanded={expandedCards[index] || false}
              onExpand={() => handleCardClick(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AmbulatoryCards;
