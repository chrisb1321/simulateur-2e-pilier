import { Box, Card, Typography, Grid, Tooltip, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useState } from 'react';
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
    rendementCible: '2-4%'
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
  const [expandedFond, setExpandedFond] = useState<string | false>(false);
  const [selectedCategorie, setSelectedCategorie] = useState<keyof typeof FONDS_CATEGORIES | 'TOUS'>('TOUS');

  const handleFondChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFond(isExpanded ? panel : false);
  };

  const filteredFonds = selectedCategorie === 'TOUS' 
    ? FONDS 
    : FONDS.filter(fond => fond.categorie === selectedCategorie);

  return (
    <Box sx={{ py: 6, px: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          textAlign: 'center',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Portefeuilles
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant={selectedCategorie === 'TOUS' ? 'contained' : 'outlined'}
          onClick={() => setSelectedCategorie('TOUS')}
        >
          Tous les fonds
        </Button>
        {Object.entries(FONDS_CATEGORIES).map(([key, label]) => (
          <Button
            key={key}
            variant={selectedCategorie === key ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategorie(key as keyof typeof FONDS_CATEGORIES)}
          >
            {label}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3}>
        {filteredFonds.map((fond) => (
          <Grid item xs={12} md={6} key={fond.isin}>
            <Accordion
              expanded={expandedFond === fond.isin}
              onChange={handleFondChange(fond.isin)}
              sx={{
                '&:before': {
                  display: 'none',
                },
                borderLeft: '4px solid',
                borderColor: getRisqueColor(fond.risque),
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {fond.nom}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {FONDS_CATEGORIES[fond.categorie]}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="body2">
                    <strong>ISIN:</strong> {fond.isin}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Niveau de risque:</strong>
                    </Typography>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: getRisqueColor(fond.risque),
                      }}
                    />
                    <Typography variant="body2">
                      {fond.risque}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Rendement cible:</strong> {fond.rendementCible}
                    </Typography>
                    <Tooltip title="Rendement annuel moyen estimé">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 