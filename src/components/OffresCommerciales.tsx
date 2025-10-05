import { Box, Paper, Typography, Grid, Card, CardContent, CardActions, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

const OFFRES = [
  {
    titre: 'Bilan Successoral',
    prix: 'CHF 2\'360',
    description: 'Analyse complète de votre situation successorale',
    services: [
      'Évaluation des droits successoraux',
      'Optimisation fiscale de la transmission',
      'Conseils sur la planification successorale',
      'Rapport détaillé personnalisé'
    ]
  },
  {
    titre: 'Bilan Fiscal',
    prix: 'CHF 2\'832',
    description: 'Analyse approfondie de votre situation fiscale',
    services: [
      'Optimisation de la fiscalité personnelle',
      'Analyse des déductions possibles',
      'Planification fiscale stratégique',
      'Rapport complet avec recommandations'
    ]
  },
  {
    titre: 'Optimisation 2ème Pilier',
    prix: 'CHF 3\'304',
    description: 'Optimisation de votre prévoyance professionnelle',
    services: [
      'Analyse de votre situation LPP',
      'Comparaison des prestations',
      'Recommandations d\'optimisation',
      'Suivi des modifications'
    ]
  },
  {
    titre: 'Mise en Concurrence Annuelle',
    prix: 'CHF 1\'888',
    description: 'Comparaison annuelle des offres du marché',
    services: [
      'Analyse comparative des prestations',
      'Négociation des conditions',
      'Suivi des changements',
      'Rapport de comparaison'
    ]
  },
  {
    titre: 'Entretien de Suivi Annuel',
    prix: 'CHF 1\'416',
    description: 'Suivi personnalisé de votre situation',
    services: [
      'Revue annuelle de vos objectifs',
      'Mise à jour de votre situation',
      'Ajustements des stratégies',
      'Rapport de suivi'
    ]
  }
];

const OFFRE_COMPLETE = {
  titre: 'Offre Complète',
  prix: 'CHF 8\'968',
  description: 'Tous nos services avec un compte Libre Passage',
  services: [
    'Bilan Successoral',
    'Bilan Fiscal',
    'Optimisation 2ème Pilier',
    'Mise en Concurrence Annuelle',
    'Entretien de Suivi Annuel',
    'Ouverture et gestion du compte Libre Passage',
    'Réduction de 20% sur l\'ensemble des services'
  ]
};

const OFFRE_PREMIUM = {
  titre: 'Offre Premium',
  prix: 'CHF 19\'999',
  description: 'Accompagnement exclusif et personnalisé pour optimiser votre patrimoine',
  services: [
    'Accompagnement personnalisé par un expert senior',
    'Analyse complète de votre situation patrimoniale',
    'Optimisation fiscale globale',
    'Planification successorale détaillée',
    'Stratégie d\'investissement sur mesure',
    'Accès prioritaire à nos experts',
    'Réunions trimestrielles de suivi',
    'Accès à notre réseau de partenaires privilégiés',
    'Formation personnalisée sur la gestion de patrimoine',
    'Accompagnement dans vos projets immobiliers',
    'Analyse et optimisation de vos assurances',
    'Support VIP 24/7',
    'Invitations aux événements exclusifs',
    'Rapport mensuel personnalisé',
    'Réduction de 30% sur tous nos services additionnels'
  ],
  avantages: [
    'Accompagnement sur 12 mois',
    'Équipe dédiée de 3 experts',
    'Garantie de satisfaction',
    'Prix fixe sans surprise'
  ]
};

const OFFRE_INTERMEDIAIRE = {
  titre: 'Offre Confort',
  prix: 'CHF 7\'999',
  description: 'Accompagnement personnalisé pour sécuriser et optimiser votre patrimoine',
  services: [
    'Accompagnement par un expert dédié',
    'Analyse de votre situation patrimoniale',
    'Optimisation fiscale de base',
    'Planification successorale',
    'Conseils en investissement',
    'Accès à nos experts',
    'Réunions semestrielles de suivi',
    'Accès à notre réseau de partenaires',
    'Analyse de vos assurances',
    'Support prioritaire',
    'Rapport trimestriel personnalisé',
    'Réduction de 20% sur les services additionnels'
  ],
  avantages: [
    'Accompagnement sur 6 mois',
    'Expert dédié',
    'Garantie de satisfaction',
    'Prix fixe'
  ]
};

const BADGE_RECOMMANDE = {
  titre: 'Offre Confort',
  label: 'Recommandé',
};

export default function OffresCommerciales() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Nos Offres Commerciales
      </Typography>

      <Paper 
        elevation={4} 
        sx={{ 
          p: 4, 
          mb: 6, 
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '"PREMIUM"',
            position: 'absolute',
            top: '20px',
            right: '-35px',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '5px 40px',
            transform: 'rotate(45deg)',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            letterSpacing: '2px'
          }
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          {OFFRE_PREMIUM.titre}
        </Typography>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#FFD700' }}>
          {OFFRE_PREMIUM.prix}
        </Typography>
        <Typography variant="h6" paragraph sx={{ mb: 4 }}>
          {OFFRE_PREMIUM.description}
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <List>
              {OFFRE_PREMIUM.services.map((service, idx) => (
                <ListItem key={idx} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: '#FFD700' }} />
                  </ListItemIcon>
                  <ListItemText primary={service} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, background: 'rgba(255, 255, 255, 0.1)' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFD700' }}>
                Avantages Premium
              </Typography>
              <List>
                {OFFRE_PREMIUM.avantages.map((avantage, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon sx={{ color: '#FFD700' }} />
                    </ListItemIcon>
                    <ListItemText primary={avantage} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: '#FFD700',
              color: theme.palette.primary.dark,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#FFC800',
              }
            }}
          >
            Devenir Client Premium
          </Button>
        </Box>
      </Paper>

      <Box sx={{ position: 'relative', mb: 6 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: 3,
            '&:hover': {
              transform: 'translateY(-8px) scale(1.03)',
              boxShadow: 8,
              borderColor: 'primary.main',
            },
            border: '2px solid transparent',
          }}
        >
          <Box sx={{
            position: 'absolute',
            top: 18,
            left: 18,
            background: '#FFD700',
            color: theme.palette.secondary.dark,
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: '0.95rem',
            letterSpacing: 1,
            zIndex: 2,
            boxShadow: 2,
          }}>
            {BADGE_RECOMMANDE.label}
          </Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {OFFRE_INTERMEDIAIRE.titre}
          </Typography>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#FFD700', background: 'rgba(255,255,255,0.08)', px: 2, py: 0.5, borderRadius: 2, display: 'inline-block' }}>
            {OFFRE_INTERMEDIAIRE.prix}
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4 }}>
            {OFFRE_INTERMEDIAIRE.description}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <List>
                {OFFRE_INTERMEDIAIRE.services.map((service, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon sx={{ color: '#FFD700' }} />
                    </ListItemIcon>
                    <ListItemText primary={service} primaryTypographyProps={{ fontSize: '1.08rem' }} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, background: 'rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#FFD700' }}>
                  Avantages Confort
                </Typography>
                <List>
                  {OFFRE_INTERMEDIAIRE.avantages.map((avantage, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon sx={{ color: '#FFD700' }} />
                      </ListItemIcon>
                      <ListItemText primary={avantage} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                borderRadius: 2,
                fontWeight: 700,
                px: 4,
                boxShadow: 2,
                background: 'linear-gradient(90deg, #FFD700 60%, #FFF176 100%)',
                color: theme.palette.secondary.dark,
                '&:hover': {
                  background: 'linear-gradient(90deg, #FFC800 60%, #FFD700 100%)',
                },
              }}
            >
              Choisir l'Offre Confort
            </Button>
          </Box>
        </Paper>
      </Box>

      <Grid container spacing={4}>
        {OFFRES.map((offre, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.03)',
                  boxShadow: 8,
                  borderColor: 'primary.main',
                },
                border: '2px solid transparent',
                background: '#fafbfc',
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {offre.titre}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    mt: 1,
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    color="primary"
                    fontWeight={800}
                    sx={{
                      background: 'rgba(25, 118, 210, 0.07)',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                    }}
                  >
                    {offre.prix}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {offre.description}
                </Typography>
                <List sx={{ mb: 2 }}>
                  {offre.services.map((service, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={service}
                        primaryTypographyProps={{ fontSize: '1.05rem' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    px: 4,
                    boxShadow: 2,
                    background: 'linear-gradient(90deg, #1976d2 60%, #2196f3 100%)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #1565c0 60%, #1976d2 100%)',
                    },
                  }}
                >
                  Choisir cette offre
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mt: 4, 
              background: theme.palette.primary.main,
              color: 'white',
              borderRadius: 3,
              boxShadow: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              {OFFRE_COMPLETE.titre}
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: '#FFD700', background: 'rgba(255,255,255,0.08)', px: 2, py: 0.5, borderRadius: 2, display: 'inline-block' }}>
              {OFFRE_COMPLETE.prix}
            </Typography>
            <Typography variant="body1" paragraph>
              {OFFRE_COMPLETE.description}
            </Typography>
            <List sx={{ mb: 2 }}>
              {OFFRE_COMPLETE.services.map((service, idx) => (
                <ListItem key={idx} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary={service} />
                </ListItem>
              ))}
            </List>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                borderRadius: 2,
                fontWeight: 700,
                px: 4,
                boxShadow: 2,
                background: 'linear-gradient(90deg, #FFD700 60%, #FFF176 100%)',
                color: theme.palette.primary.main,
                '&:hover': {
                  background: 'linear-gradient(90deg, #FFC800 60%, #FFD700 100%)',
                },
                mt: 2,
              }}
            >
              Choisir l'offre complète
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 