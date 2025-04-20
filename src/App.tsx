import { useState } from 'react'
import { Container, Typography, Box, Tabs, Tab, Paper, Grid, TextField, InputAdornment, Slider, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import FormulaireSimulation from './components/FormulaireSimulation'
import TableauComparatif from './components/TableauComparatif'
import GraphiqueEvolution from './components/GraphiqueEvolution'
import ConfigurationTaux from './components/ConfigurationTaux'
import { SimulationInput, SimulationScenario } from './types/simulation'
import logo from './assets/images/logo.png'

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
  const [tauxRendement, setTauxRendement] = useState({
    CASH: CONSTANTS.TAUX_RENDEMENT.CASH,
    FAIBLE: CONSTANTS.TAUX_RENDEMENT.EQUILIBRE,
    MOYEN: CONSTANTS.TAUX_RENDEMENT.CROISSANCE,
    ELEVE: CONSTANTS.TAUX_RENDEMENT.DYNAMIQUE,
  });

  const handleTauxChange = (nouveauxTaux: typeof tauxRendement) => {
    setTauxRendement(nouveauxTaux);
    // Recalculer la simulation si des scénarios existent déjà
    if (scenarios.length > 0) {
      calculerSimulation();
    }
  };

  const calculerSimulation = () => {
    const anneesRestantes = CONSTANTS.AGE_MAX - age;
    const capitalInitial = parseFloat(capital.replace(/[^0-9.-]+/g, ''));
    const fraisEntree = CONSTANTS.FRAIS_ENTREE;

    const scenarioCash = calculerScenario(
      'Compte Cash',
      tauxRendement.CASH,
      capitalInitial,
      anneesRestantes,
      0
    );

    const scenarioProfil = calculerScenario(
      profilSelectionne === 'EQUILIBRE' ? 'Allier sécurité et rendement' :
      profilSelectionne === 'CROISSANCE' ? 'Faire croître mon capital' :
      'Placement dynamique',
      tauxRendement[profilSelectionne === 'EQUILIBRE' ? 'FAIBLE' : profilSelectionne === 'CROISSANCE' ? 'MOYEN' : 'ELEVE'],
      capitalInitial,
      anneesRestantes,
      fraisEntree
    );

    setScenarios([scenarioCash, scenarioProfil]);
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
          <Typography variant="h4" component="h1">
            Mon Compte Libre Passage
          </Typography>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Simulation" />
            <Tab label="Configuration des taux" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
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

          {scenarios.length > 0 && (
            <>
              <TableauComparatif 
                scenarios={scenarios} 
                age={age}
                ageMax={CONSTANTS.AGE_MAX}
                capitalInitial={parseFloat(capital.replace(/[^0-9.-]+/g, ''))}
              />
              <GraphiqueEvolution scenarios={scenarios} />
            </>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <ConfigurationTaux
            tauxActuels={tauxRendement}
            onTauxChange={handleTauxChange}
          />
        </TabPanel>
      </Box>
    </Container>
  );
}

export default App;
