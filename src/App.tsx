import { useState } from 'react'
import { Container, Typography, Box, Tabs, Tab, Paper, Grid, TextField, InputAdornment, Slider, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import FormulaireSimulation from './components/FormulaireSimulation'
import TableauComparatif from './components/TableauComparatif'
import GraphiqueEvolution from './components/GraphiqueEvolution'
import ConfigurationTaux from './components/ConfigurationTaux'
import { SimulationInput, SimulationScenario } from './types/simulation'
import logo from './assets/images/logo.png'
import LoadingSimulation from './components/LoadingSimulation'
import { useTheme } from '@mui/material/styles'
import { Card, CardContent } from '@mui/material'
import PortefeuillesPartenaires from './components/PortefeuillesPartenaires'
import SwissFinancialAdvantages from './components/SwissFinancialAdvantages'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CustomButton from './components/CustomButton'

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
    FRAIS_ENTREE_SFA: CONSTANTS.FRAIS_ENTREE * 0.5,
  });
  const theme = useTheme();

  const handleTauxChange = (nouveauxTaux: typeof tauxRendement) => {
    setTauxRendement(nouveauxTaux);
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
    <Container maxWidth="xl">
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
              <Tab label="Portefeuilles" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
            <SwissFinancialAdvantages />
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
              <CustomButton
                onClick={() => calculerSimulation()}
                size="large"
              >
                CALCULER LA SIMULATION
              </CustomButton>
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
                  <CustomButton
                    size="large"
                    startIcon={<AccountBalanceIcon />}
                    onClick={() => window.open('https://business.zugerberg-finanz.ch/auth', '_blank')}
                  >
                    Ouvrir mon compte de libre passage
                  </CustomButton>
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
              <CustomButton
                size="large"
                component="a"
                href="https://forms.zohopublic.eu/swissfinancial1/form/Mandatderecherche/formperma/3jgRf4_IBYaeKKVqF55iy2gBp8Gwz4S2P8PGgxMmi1c?zf_pf_id=956584"
                target="_blank"
                rel="noopener noreferrer"
                {...({} as any)}
              >
                Lancer la recherche
              </CustomButton>
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

          <TabPanel value={activeTab} index={4}>
            <PortefeuillesPartenaires />
          </TabPanel>
      </Box>
      </Container>
    </Container>
  );
}

export default App;
