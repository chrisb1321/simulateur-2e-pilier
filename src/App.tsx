import { useState } from 'react'
import { Container, Typography, Box, Tabs, Tab, Paper, Grid, TextField, InputAdornment, Slider, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import FormulaireSimulation from './components/FormulaireSimulation'
import TableauComparatif from './components/TableauComparatif'
import GraphiqueEvolution from './components/GraphiqueEvolution'
import ConfigurationTaux from './components/ConfigurationTaux'
import { SimulationInput, SimulationScenario } from './types/simulation'
import logo from './assets/images/logo.png'
import LoadingSimulation from './components/LoadingSimulation'
import { 
  Person,
  Assessment,
  Timeline,
  Compare,
  SwapHoriz,
  AccountBalance,
  Business,
  Security
} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { Card, CardContent, alpha } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import TimelineIcon from '@mui/icons-material/Timeline'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import SavingsIcon from '@mui/icons-material/Savings'
import SecurityIcon from '@mui/icons-material/Security'

// Constantes de configuration
const CONSTANTS = {
  AGE_MIN: 18,
  AGE_MAX: 65,
  TAUX_RENDEMENT: {
    CASH: 0.004,     // 0.4%
    EQUILIBRE: 0.02,    // 2%
    CROISSANCE: 0.032,  // 3.2%
    DYNAMIQUE: 0.04,    // 4%
  },
  TAUX_RENDEMENT_BANQUE_DEFAUT: 0.032, // 3.2%
  RABAIS_PARTENAIRE: 50, // 50%
  RABAIS_MIN: 0,
  RABAIS_MAX: 100,
  FRAIS_ENTREE: 0.03,
};

type ProfilType = 'EQUILIBRE' | 'CROISSANCE' | 'DYNAMIQUE';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ServicesSection = () => {
  const theme = useTheme();

  const services = [
    {
      icon: <PersonIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "Conseiller dédié et expérimenté",
      description: "Un interlocuteur unique vous accompagne à chaque étape, avec une expertise spécialisée dans les comptes de libre passage."
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "Suivi personnalisé de votre compte",
      description: "Accédez aux performances de votre placement via un reporting régulier et clair."
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "Accompagnement jusqu'à la retraite",
      description: "Nous restons à vos côtés pour ajuster votre stratégie selon l'évolution de votre situation et des opportunités du marché."
    },
    {
      icon: <CompareArrowsIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "Comparaison régulière avec le marché",
      description: "Votre solution est réévaluée périodiquement pour s'assurer qu'elle reste compétitive et alignée avec vos objectifs."
    },
    {
      icon: <SwapHorizIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "Changement de fondation sans frais",
      description: "Grâce à nos partenaires, vous pouvez modifier votre fondation à tout moment, sans frais de transfert."
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "Optimisation fiscale au moment du retrait",
      description: "Nous vous accompagnons pour choisir l'option de retrait la plus avantageuse (capital, rente ou combinaison), en tenant compte de votre fiscalité."
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "Accès à des Banques privées en gestion de fortune",
      description: "Profitez de placements sélectionnés en fonction de votre profil, via notre réseau partenaire."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "Indépendance et transparence",
      description: "Nos conseils sont orientés vers la valorisation durable de votre capital."
    }
  ];

  return (
    <Box sx={{ 
      py: 12, 
      px: 4, 
      borderRadius: 4,
      position: 'relative',
      overflow: 'hidden',
      background: theme => `linear-gradient(to bottom right, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
      boxShadow: '0 0 40px rgba(0,0,0,0.03)'
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: `radial-gradient(circle at 0% 0%, ${alpha(theme.palette.grey[200], 0.4)} 0%, transparent 50%),
                      radial-gradient(circle at 100% 100%, ${alpha(theme.palette.grey[200], 0.4)} 0%, transparent 50%)`,
          zIndex: 0
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ 
            mb: 10, 
            color: theme.palette.text.primary,
            fontWeight: 700,
            fontSize: '2.5rem',
            letterSpacing: '-0.5px',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 3,
              borderRadius: 2,
              background: theme => `linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0)}, ${alpha(theme.palette.text.primary, 0.3)} 50%, ${alpha(theme.palette.text.primary, 0)})`,
            }
          }}
        >
          Swiss Financial Advice c'est :
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: theme => `linear-gradient(to bottom right, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: theme => `0 16px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderColor: 'transparent',
                    '& .icon-container': {
                      transform: 'scale(1.15)',
                      backgroundColor: theme => alpha(theme.palette.primary.main, 0.15),
                    },
                    '& .card-content': {
                      backgroundColor: 'transparent'
                    }
                  },
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: theme => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    opacity: 0.7
                  }
                }}
              >
                <CardContent 
                  className="card-content"
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 4,
                    transition: 'all 0.4s ease'
                  }}
                >
                  <Box 
                    className="icon-container"
                    sx={{ 
                      mb: 3.5,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 85,
                      height: 85,
                      borderRadius: '50%',
                      backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
                      boxShadow: theme => `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: '1.25rem',
                      mb: 2.5,
                      minHeight: '2.8em',
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.palette.text.primary,
                      lineHeight: 1.3,
                      letterSpacing: '-0.3px'
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      flex: 1,
                      lineHeight: 1.8,
                      color: alpha(theme.palette.text.secondary, 0.95),
                      fontSize: '0.95rem'
                    }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [age, setAge] = useState<number>(30);
  const [capital, setCapital] = useState<string>('100000');
  const [profilSelectionne, setProfilSelectionne] = useState<ProfilType>('EQUILIBRE');
  const [scenarios, setScenarios] = useState<SimulationScenario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tauxRendement, setTauxRendement] = useState({
    CASH: CONSTANTS.TAUX_RENDEMENT.CASH,
    FAIBLE: CONSTANTS.TAUX_RENDEMENT.EQUILIBRE,
    MOYEN: CONSTANTS.TAUX_RENDEMENT.CROISSANCE,
    ELEVE: CONSTANTS.TAUX_RENDEMENT.DYNAMIQUE,
    FRAIS_ENTREE_MARCHE: CONSTANTS.FRAIS_ENTREE,
    FRAIS_ENTREE_SFA: CONSTANTS.FRAIS_ENTREE * 0.5, // 50% des frais du marché par défaut
  });
  const theme = useTheme();

  const handleTauxChange = (nouveauxTaux: typeof tauxRendement) => {
    setTauxRendement(nouveauxTaux);
    // Recalculer la simulation si des scénarios existent déjà
    if (scenarios.length > 0) {
      calculerSimulation();
    }
  };

  const calculerSimulation = () => {
    setIsLoading(true);
    setScenarios([]); // Réinitialiser les scénarios pendant le chargement

    // Simuler un délai de chargement pour montrer l'animation
    setTimeout(() => {
      const anneesRestantes = CONSTANTS.AGE_MAX - age;
      const capitalInitial = parseFloat(capital.replace(/[^0-9.-]+/g, ''));

      const scenarioCash = calculerScenario(
        'Compte rémunéré',
        tauxRendement.CASH,
        capitalInitial,
        anneesRestantes,
        0
      );

      const scenarioEquilibre = calculerScenario(
        'Allier sécurité et rendement',
        tauxRendement.FAIBLE,
        capitalInitial,
        anneesRestantes,
        tauxRendement.FRAIS_ENTREE_SFA
      );

      const scenarioCroissance = calculerScenario(
        'Faire croître mon capital',
        tauxRendement.MOYEN,
        capitalInitial,
        anneesRestantes,
        tauxRendement.FRAIS_ENTREE_SFA
      );

      const scenarioDynamique = calculerScenario(
        'Placement dynamique',
        tauxRendement.ELEVE,
        capitalInitial,
        anneesRestantes,
        tauxRendement.FRAIS_ENTREE_SFA
      );

      // Ajouter tous les scénarios
      const nouveauxScenarios = [
        scenarioCash,
        scenarioEquilibre,
        scenarioCroissance,
        scenarioDynamique
      ];

      setScenarios(nouveauxScenarios);
      setIsLoading(false);
    }, 7000); // Délai de 7 secondes
  };

  const calculerScenario = (
    nom: string,
    tauxRendement: number,
    capitalInitial: number,
    duree: number,
    fraisEntree: number
  ): SimulationScenario => {
    const capitalApresFreais = capitalInitial * (1 - fraisEntree);
    const evolutionCapital = Array.from({ length: duree + 1 }, (_, i) => {
      let capitalCourant = capitalApresFreais;
      for (let annee = 0; annee < i; annee++) {
        capitalCourant += capitalCourant * tauxRendement;
      }
      return {
        annee: i,
        capital: capitalCourant
      };
    });

    const capitalFinal = evolutionCapital[evolutionCapital.length - 1].capital;
    const interetsCumules = capitalFinal - capitalApresFreais;

    return {
      nom,
      tauxRendement,
      fraisEntree,
      resultat: {
        capitalFinal,
        interetsCumules,
        fraisEntree: capitalInitial * fraisEntree,
        evolutionCapital
      }
    };
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box 
            component="img" 
            src={logo} 
            alt="Swiss Financial Advice" 
            sx={{ 
              height: '90px',
              marginRight: '20px',
              objectFit: 'contain'
            }} 
          />
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              fontSize: '1.8rem',
              fontWeight: 500
            }}
          >
            Comparateur 2ème pilier
          </Typography>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                fontSize: '1rem',
                textTransform: 'none',
              }
            }}
          >
            <Tab label="Présentation" />
            <Tab label="Simulation" />
            <Tab label="Configuration" />
            <Tab label="Recherche des avoirs LPP" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <ServicesSection />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Paramètres de simulation
            </Typography>
            <Grid container spacing={3}>
              <Grid component="div" item xs={12} sm={4}>
                <TextField
                  label="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  fullWidth
                  inputProps={{
                    min: CONSTANTS.AGE_MIN,
                    max: CONSTANTS.AGE_MAX,
                  }}
                />
              </Grid>
              <Grid component="div" item xs={12} sm={4}>
                <TextField
                  label="Capital 2e pilier"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">CHF</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid component="div" item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Profil d'investissement</InputLabel>
                  <Select
                    value={profilSelectionne}
                    label="Profil d'investissement"
                    onChange={(e) => setProfilSelectionne(e.target.value as ProfilType)}
                  >
                    <MenuItem value="EQUILIBRE">Allier sécurité et rendement</MenuItem>
                    <MenuItem value="CROISSANCE">Faire croître mon capital</MenuItem>
                    <MenuItem value="DYNAMIQUE">Placement dynamique</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={() => calculerSimulation()}
                size="large"
              >
                CALCULER LA SIMULATION
              </Button>
            </Box>
          </Paper>

          <LoadingSimulation isLoading={isLoading} />

          {scenarios.length > 0 && !isLoading && (
            <>
              <TableauComparatif 
                scenarios={scenarios} 
                age={age}
                ageMax={CONSTANTS.AGE_MAX}
                capitalInitial={parseFloat(capital.replace(/[^0-9.-]+/g, ''))}
                profilSelectionne={profilSelectionne}
                tauxRendement={tauxRendement}
              />
              <GraphiqueEvolution 
                scenarios={scenarios} 
                profilSelectionne={profilSelectionne}
              />

              {/* CTA Section */}
              <Box 
                sx={{ 
                  mt: 8,
                  mb: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 3
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    maxWidth: '800px',
                    mb: 1
                  }}
                >
                  Prêt à optimiser votre libre passage ?
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ 
                    maxWidth: '600px',
                    mb: 3
                  }}
                >
                  Ouvrez un compte de libre passage avec Swiss Financial Advice et bénéficiez d'un accompagnement personnalisé pour maximiser votre capital.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AccountBalanceIcon />}
                  sx={{
                    py: 2,
                    px: 6,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    background: theme => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                    }
                  }}
                  onClick={() => window.open('https://business.zugerberg-finanz.ch/auth', '_blank')}
                >
                  Ouvrir mon compte de libre passage
                </Button>
              </Box>
            </>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <ConfigurationTaux
            tauxActuels={tauxRendement}
            onTauxChange={handleTauxChange}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              mb: 4,
              borderRadius: 2,
              background: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                mb: 4,
                textAlign: 'center'
              }}
            >
              Recherche de vos avoirs de libre passage
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                href="https://forms.zohopublic.eu/swissfinancial1/form/Mandatderecherche/formperma/3jgRf4_IBYaeKKVqF55iy2gBp8Gwz4S2P8PGgxMmi1c?zf_pf_id=956584"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  px: 6,
                  py: 2,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                Lancer la recherche
              </Button>
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mt: 4, 
                textAlign: 'center',
                color: theme.palette.text.secondary
              }}
            >
              Nous vous aidons à localiser vos comptes de libre passage oubliés ou perdus.
            </Typography>
          </Paper>
        </TabPanel>
      </Box>
    </Container>
  );
}

export default App;
