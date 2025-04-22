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
    <Container maxWidth="lg">
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
              Swiss Financial Advice c'est :
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Person color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Conseiller dédié et expérimenté
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 5 }}>
                    Un interlocuteur unique vous accompagne à chaque étape, avec une expertise spécialisée dans les comptes de libre passage.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Assessment color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Suivi personnalisé de votre compte
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 5 }}>
                    Accédez aux performances de votre placement via un reporting régulier et clair.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Timeline color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Accompagnement jusqu'à la retraite
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 5 }}>
                    Nous restons à vos côtés pour ajuster votre stratégie selon l'évolution de votre situation et des opportunités du marché.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Compare color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Comparaison régulière avec le marché
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 5 }}>
                    Votre solution est réévaluée périodiquement pour s'assurer qu'elle reste compétitive et alignée avec vos objectifs.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <SwapHoriz color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Changement de fondation sans frais
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 5 }}>
                    Grâce à nos partenaires, vous pouvez modifier votre fondation à tout moment, sans frais de transfert.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <AccountBalance color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Optimisation fiscale au moment du retrait
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 5 }}>
                    Nous vous accompagnons pour choisir l'option de retrait la plus avantageuse (capital, rente ou combinaison), en tenant compte de votre fiscalité.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Business color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Accès à des Banques privées en gestion de fortune
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 5 }}>
                    Profitez de placements sélectionnés en fonction de votre profil, via notre réseau partenaire.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Security color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Indépendance et transparence
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, ml: 5 }}>
                    Nos conseils sont orientés vers la valorisation durable de votre capital.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
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
