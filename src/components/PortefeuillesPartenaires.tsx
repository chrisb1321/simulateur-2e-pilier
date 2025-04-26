import { Box, Card, Typography, Grid, Tooltip, IconButton, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';

const FONDS_CATEGORIES = {
  FAIBLE: 'Profil 25 - Défensif',
  MODERE: 'Profil 35/45 - Équilibré',
  ELEVE: 'Profil 75+ - Dynamique',
  SPECIAL: 'Allocations Spéciales'
} as const;

const FONDS: FondInfo[] = [
  // Profil 25 - Défensif
  {
    nom: 'IST Mixta Optima 15 II',
    isin: 'CH0029031298',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'SAST BVG-Ertrag A',
    isin: 'CH0024556893',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'AWi BVG 25 andante',
    isin: 'CH0009004349',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'BAP BVG-Mix 25 Plus R',
    isin: 'CH0124249662',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'BCV Pension 25 BP',
    isin: 'CH0295060443',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'CSA 2 Mixta-BVG 25',
    isin: 'CH0008879022',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'GKB (CH) Vorsorgefonds 25 V',
    isin: 'CH0423561395',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'Helvetia AST BVG-Mix',
    isin: 'CH0011768600',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'IST Mixta Optima 25 II',
    isin: 'CH0029031371',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'LUKB Expert-Vorsorge 25',
    isin: 'CH0352060427',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'PARstrategie nachhaltig 25 ESG',
    isin: 'CH0205879213',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'Pictet CH-LPP 25',
    isin: 'CH0016431667',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%',
    description: "Expertise en gestion d'actifs depuis 1805"
  },
  {
    nom: 'SAST BVG-Nachhaltigkeit Rendite A',
    isin: 'CH0035437919',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'SAST BVG-Wachstum A',
    isin: 'CH0002874011',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'Swisscanto BVG 3 Portfolio 25 RT',
    isin: 'CH0238052705',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },
  {
    nom: 'Vontobel Fund (CH) Pension Invest Yield NV',
    isin: 'CH0281016656',
    categorie: 'FAIBLE',
    risque: 'Faible',
    rendementCible: '2-4%'
  },

  // Profil 35/45 - Équilibré
  {
    nom: 'AWi BVG 35 allegro',
    isin: 'CH0002875646',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'AWi BVG 45 vivace',
    isin: 'CH0009004505',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'BAP BVG-Mix 40 Plus R',
    isin: 'CH0124249738',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'BCV Pension 40 BP',
    isin: 'CH0295060500',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'CS (CH) Privilege 45 EA',
    isin: 'CH0482324255',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'CSA 2 Mixta-BVG 35',
    isin: 'CH0008879048',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'CSA 2 Mixta-BVG 45',
    isin: 'CH0008879097',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'IST Mixta Optima 35 II',
    isin: 'CH0029031470',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'Pictet CH-LPP 40',
    isin: 'CH0016431691',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'Swisscanto BVG 3 Portfolio 45 RT',
    isin: 'CH0238052978',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },
  {
    nom: 'Swisscanto BVG 3 Oeko 45 RT',
    isin: 'CH0238047721',
    categorie: 'MODERE',
    risque: 'Modéré',
    rendementCible: '4-6%'
  },

  // Profil 75+ - Dynamique
  {
    nom: 'CSA Mixta-BVG Index 75',
    isin: 'CH0382614722',
    categorie: 'ELEVE',
    risque: 'Élevé',
    rendementCible: '6-8%'
  },
  {
    nom: 'LUKB Expert-Vorsorge 75',
    isin: 'CH0352060435',
    categorie: 'ELEVE',
    risque: 'Élevé',
    rendementCible: '6-8%'
  },
  {
    nom: 'Swiss Life BVG-Mix 75',
    isin: 'CH0435830028',
    categorie: 'ELEVE',
    risque: 'Élevé',
    rendementCible: '6-8%'
  },
  {
    nom: 'Swisscanto BVG 3 Portfolio 75 RT',
    isin: 'CH0414854486',
    categorie: 'ELEVE',
    risque: 'Élevé',
    rendementCible: '6-8%'
  },

  // Allocations Spéciales
  {
    nom: 'BAP BVG-Mix Dynamic Allocation 0-80',
    isin: 'CH0432005046',
    categorie: 'SPECIAL',
    risque: 'Élevé',
    rendementCible: '5-8%'
  },
  {
    nom: 'OLZ Smart Invest 65 ESG',
    isin: 'CH0328149510',
    categorie: 'SPECIAL',
    risque: 'Élevé',
    rendementCible: '5-8%'
  },
  {
    nom: 'EQUINOX Mixed CHF | BVG',
    isin: 'CH0297835297',
    categorie: 'SPECIAL',
    risque: 'Modéré',
    rendementCible: '4-7%'
  },
  {
    nom: 'Reichmuth Alpin Classic',
    isin: 'CH0238867870',
    categorie: 'SPECIAL',
    risque: 'Modéré',
    rendementCible: '4-7%'
  }
];

interface FondInfo {
  nom: string;
  isin: string;
  categorie: keyof typeof FONDS_CATEGORIES;
  risque: 'Faible' | 'Modéré' | 'Élevé';
  rendementCible: string;
  description?: string;
}

const getRisqueColor = (risque: string) => {
  switch (risque) {
    case 'Faible':
      return '#4caf50';
    case 'Modéré':
      return '#ff9800';
    case 'Élevé':
      return '#f44336';
    default:
      return '#757575';
  }
};

export default function PortefeuillesPartenaires() {
  const [selectedCategorie, setSelectedCategorie] = useState<keyof typeof FONDS_CATEGORIES | 'TOUS'>('TOUS');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [expandedFond, setExpandedFond] = useState<string | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  const handleFondChange = (isin: string) => {
    setExpandedFond(expandedFond === isin ? null : isin);
  };

  const filteredFonds = selectedCategorie === 'TOUS' 
    ? FONDS 
    : FONDS.filter(fond => fond.categorie === selectedCategorie);

  // Effet de transition lors du changement de catégorie
  useEffect(() => {
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 300);
    return () => clearTimeout(timer);
  }, [selectedCategorie]);

  return (
    <Box 
      sx={{ 
        py: 6, 
        px: 4,
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(-20px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        '@keyframes slideUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        '@keyframes textSlide': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        },
        '@keyframes rippleEffect': {
          '0%': { transform: 'scale(1)', opacity: 0.4 },
          '100%': { transform: 'scale(2)', opacity: 0 }
        },
        '@keyframes pulse': {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(33,150,243,0.4)' },
          '70%': { transform: 'scale(1.1)', boxShadow: '0 0 0 10px rgba(33,150,243,0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(33,150,243,0)' }
        }
      }}
    >
      <Paper 
        elevation={3}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          transition: 'all 0.3s ease',
          animation: 'fadeIn 0.6s ease-out',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '200%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'all 0.5s ease',
          },
          '&:hover::before': {
            left: '100%',
          }
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '3px',
              background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
              borderRadius: '3px',
              animation: 'pulse 2s infinite'
            }
          }}
        >
          Présentation des Portefeuilles
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          animation: 'slideUp 0.8s ease-out'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center',
              fontWeight: 500,
              opacity: 0.9,
              animation: 'textSlide 1s ease-out',
              background: 'linear-gradient(45deg, #666, #999)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Découvrez notre sélection de portefeuilles adaptés à vos objectifs
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2,
            flexWrap: 'wrap',
            opacity: isChanging ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}>
            <Button
              variant={selectedCategorie === 'TOUS' ? 'contained' : 'outlined'}
              onClick={() => setSelectedCategorie('TOUS')}
              onMouseEnter={() => setHoveredButton('TOUS')}
              onMouseLeave={() => setHoveredButton(null)}
              sx={{
                borderRadius: '15px',
                px: 3,
                py: 1.5,
                transition: 'all 0.3s ease',
                transform: hoveredButton === 'TOUS' ? 'scale(1.05)' : 'scale(1)',
                boxShadow: hoveredButton === 'TOUS' ? '0 4px 20px rgba(33,150,243,0.3)' : 'none',
                background: selectedCategorie === 'TOUS' 
                  ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                  : 'transparent',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background: selectedCategorie === 'TOUS'
                    ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                    : 'rgba(33,150,243,0.1)',
                  '&::after': {
                    animation: 'rippleEffect 0.8s ease-out'
                  }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '15px'
                }
              }}
            >
              Tous les portefeuilles
            </Button>
            {Object.entries(FONDS_CATEGORIES).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedCategorie === key ? 'contained' : 'outlined'}
                onClick={() => setSelectedCategorie(key as keyof typeof FONDS_CATEGORIES)}
                onMouseEnter={() => setHoveredButton(key)}
                onMouseLeave={() => setHoveredButton(null)}
                sx={{
                  borderRadius: '15px',
                  px: 3,
                  py: 1.5,
                  transition: 'all 0.3s ease',
                  transform: hoveredButton === key ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: hoveredButton === key ? '0 4px 20px rgba(33,150,243,0.3)' : 'none',
                  background: selectedCategorie === key 
                    ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                    : 'transparent',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: selectedCategorie === key
                      ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                      : 'rgba(33,150,243,0.1)',
                    '&::after': {
                      animation: 'rippleEffect 0.8s ease-out'
                    }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '15px'
                  }
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {filteredFonds.map((fond, index) => (
          <Grid item xs={12} md={6} key={fond.isin}>
            <Paper
              elevation={2}
              sx={{
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: `translateY(${index * 20}px)`,
                animation: `slideIn 0.5s ease-out ${index * 0.1}s forwards`,
                opacity: 0,
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '200%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'all 0.5s ease',
                },
                '&:hover::before': {
                  left: '100%',
                },
                '@keyframes slideIn': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(50px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              <Accordion
                expanded={expandedFond === fond.isin}
                onChange={() => handleFondChange(fond.isin)}
                sx={{
                  background: 'transparent',
                  boxShadow: 'none',
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <Box
                      sx={{
                        transform: expandedFond === fond.isin ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <ExpandMoreIcon />
                    </Box>
                  }
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(33,150,243,0.1) 0%, rgba(33,150,243,0.05) 100%)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {fond.nom}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        animation: 'fadeIn 0.5s ease-out',
                      }}
                    >
                      {FONDS_CATEGORIES[fond.categorie]}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    animation: expandedFond === fond.isin ? 'expandContent 0.3s ease-out' : 'none',
                    '@keyframes expandContent': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(-10px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        animation: 'slideRight 0.3s ease-out',
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        ISIN:
                      </Typography>
                      <Typography variant="body2">{fond.isin}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        animation: 'slideRight 0.4s ease-out',
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        Niveau de risque:
                      </Typography>
                      <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: '15px',
                          background: `linear-gradient(45deg, ${getRisqueColor(fond.risque)}, ${getRisqueColor(fond.risque)}88)`,
                          color: 'white',
                          animation: 'pulse 2s infinite',
                        }}
                      >
                        <Typography variant="body2">
                          {fond.risque}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        animation: 'slideRight 0.5s ease-out',
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        Rendement cible:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 500,
                        }}
                      >
                        {fond.rendementCible}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 