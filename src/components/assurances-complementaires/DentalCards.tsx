import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider
} from '@mui/material';
import BackButton from '../BackButton';
import HealingIcon from '@mui/icons-material/Healing';
import { SvgIcon } from '@mui/material';

// Icône de dent personnalisée (molaire stylisée)
const ToothIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="rgba(0,0,0,0.1)"/>
      </filter>
    </defs>
    {/* Forme de la dent (molaire) */}
    <path 
      d="M6 8c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8z" 
      fill="white" 
      stroke="#1976d2" 
      strokeWidth="1.5"
      filter="url(#shadow)"
    />
    {/* Racines de la dent */}
    <path 
      d="M8 16v2c0 .5.4 1 1 1h2c.5 0 1-.5 1-1v-2M12 16v2c0 .5.4 1 1 1h2c.5 0 1-.5 1-1v-2" 
      fill="white" 
      stroke="#1976d2" 
      strokeWidth="1.5"
    />
    {/* Détail central (point) */}
    <circle cx="12" cy="11" r="1.5" fill="#1976d2"/>
    {/* Rainures sur la couronne */}
    <path d="M8 10h8M8 12h8" stroke="#1976d2" strokeWidth="0.8" strokeLinecap="round"/>
  </SvgIcon>
);

interface DentalCardProps {
  title: string;
  remboursement: string;
  maximum: string;
  conditions?: string;
}

const DentalCard: React.FC<DentalCardProps> = ({ title, remboursement, maximum, conditions }) => {
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
    >
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Icône dentaire */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: 'rgba(25,118,210,0.1)',
            mb: 2,
            mx: 'auto'
          }}
        >
          <ToothIcon sx={{ color: '#1976d2', fontSize: '2rem' }} />
        </Box>

        {/* Titre */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            color: '#333',
            mb: 2,
            fontSize: '1.2rem',
            textAlign: 'center'
          }}
        >
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Remboursement */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              fontSize: '0.9rem',
              mb: 0.5
            }}
          >
            Remboursement :
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: '#1976d2',
              fontSize: '1rem'
            }}
          >
            {remboursement}
          </Typography>
        </Box>

        {/* Maximum */}
        <Box sx={{ mb: conditions ? 2 : 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              fontSize: '0.9rem',
              mb: 0.5
            }}
          >
            Maximum :
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: '#1976d2',
              fontSize: '1rem'
            }}
          >
            {maximum}
          </Typography>
        </Box>

        {/* Conditions spéciales */}
        {conditions && (
          <Box sx={{ mt: 'auto' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: '0.9rem',
                mb: 0.5
              }}
            >
              Conditions :
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#333',
                fontSize: '0.85rem',
                lineHeight: 1.4
              }}
            >
              {conditions}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

interface DentalCardsProps {
  onBack: () => void;
}

const DentalCards: React.FC<DentalCardsProps> = ({ onBack }) => {
  const dentalPlans = [
    {
      title: 'DENTA 1',
      remboursement: '75% des coûts',
      maximum: '300 francs par année civile'
    },
    {
      title: 'DENTA 2',
      remboursement: '50% des coûts',
      maximum: '1000 francs par année civile'
    },
    {
      title: 'DENTA 3',
      remboursement: '75% des coûts',
      maximum: '2000 francs par année civile'
    },
    {
      title: 'DENTA 4',
      remboursement: '75% des coûts',
      maximum: '3000 francs par année civile'
    },
    {
      title: 'DENTA 5',
      remboursement: '50% des coûts',
      maximum: '1000 francs par année civile',
      conditions: 'Si les frais sont supérieurs à 2000 francs, 80% de la partie excédentaire est remboursée'
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
          Assurances dentaires
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {dentalPlans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DentalCard
              title={plan.title}
              remboursement={plan.remboursement}
              maximum={plan.maximum}
              conditions={plan.conditions}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DentalCards;
