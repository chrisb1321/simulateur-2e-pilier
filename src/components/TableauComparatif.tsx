import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Collapse,
  TextField,
} from '@mui/material';
import { SimulationScenario } from '../types/simulation';
import { useState } from 'react';
import DiagrammeComparatif from './DiagrammeComparatif';

interface TableauComparatifProps {
  scenarios: SimulationScenario[];
  capitalInitial: number;
  age: number;
  ageMax: number;
  profilSelectionne: 'EQUILIBRE' | 'CROISSANCE' | 'DYNAMIQUE';
  tauxRendement: {
    CASH: number;
    FAIBLE: number;
    MOYEN: number;
    ELEVE: number;
    FRAIS_ENTREE_MARCHE: number;
    FRAIS_ENTREE_SFA: number;
  };
}

export default function TableauComparatif({ scenarios, capitalInitial, age, ageMax, profilSelectionne, tauxRendement }: TableauComparatifProps) {
  const theme = useTheme();
  const [nombreChangements, setNombreChangements] = useState<number>(0);
  const [showChangements, setShowChangements] = useState<boolean>(false);

  const droitsEntreeTexteGauche = "Droits d'entrée 3% (moy. du marché)";
  const droitsEntreeTexteDroite = "Droits d'entrée avec SFA";

  const formatCurrency = (value: number, forcePositive: boolean = false) => {
    const formattedValue = new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    
    return forcePositive ? `+${formattedValue}` : formattedValue;
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };

  // Filtrer les scénarios pour n'afficher que le Compte rémunéré et le profil sélectionné
  const scenarioCash = scenarios.find(s => s.nom === 'Compte rémunéré');
  const scenarioSelectionne = scenarios.find(s => {
    switch(profilSelectionne) {
      case 'EQUILIBRE':
        return s.nom === 'Allier sécurité et rendement';
      case 'CROISSANCE':
        return s.nom === 'Faire croître mon capital';
      case 'DYNAMIQUE':
        return s.nom === 'Placement dynamique';
      default:
        return false;
    }
  });

  const scenariosAffichés = [scenarioCash, scenarioSelectionne].filter(s => s !== undefined) as SimulationScenario[];

  const calculerDifferences = () => {
    if (!scenarioCash || !scenarioSelectionne) return null;

    const interetsCumules = scenarioSelectionne.resultat.interetsCumules;
    const fraisEntreeMarche = capitalInitial * tauxRendement.FRAIS_ENTREE_MARCHE;
    const fraisEntreeSFA = capitalInitial * tauxRendement.FRAIS_ENTREE_SFA;
    const fraisChangementFondation = nombreChangements * (capitalInitial * 0.03);
    const fraisChangementFondationSFA = 0;

    const estimationNetteMarche = capitalInitial + interetsCumules - fraisEntreeMarche - fraisChangementFondation;
    const estimationNetteSFA = capitalInitial + interetsCumules - fraisEntreeSFA - fraisChangementFondationSFA;

    return {
      interetsCumules,
      fraisEntreeMarche,
      fraisEntreeSFA,
      fraisChangementFondation,
      fraisChangementFondationSFA,
      estimationNetteMarche,
      estimationNetteSFA
    };
  };

  const differences = calculerDifferences();

  const getValueColor = (value: number) => {
    if (value > 0) return theme.palette.success.main;
    if (value < 0) return theme.palette.error.main;
    return theme.palette.text.primary;
  };

  const getProfilColor = () => {
    switch(profilSelectionne) {
      case 'EQUILIBRE':
        return '#43a047'; // Vert
      case 'CROISSANCE':
        return '#ff9800'; // Orange
      case 'DYNAMIQUE':
        return '#e91e63'; // Rose
      default:
        return theme.palette.primary.main;
    }
  };

  const handleChangeNombreChangements = (value: number) => {
    if (value >= 0 && value <= 10) {
      setNombreChangements(value);
    }
  };

  return (
    <>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 5, 
          mb: 8,
          borderRadius: 2,
          background: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            Comparatif des scénarios
          </Typography>
          <Typography 
            variant="subtitle1"
            sx={{ 
              color: theme.palette.text.secondary,
            }}
          >
            Durée de placement maximum : {ageMax - age} ans
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Scénario</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Taux de rendement</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Capital initial</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Capital final</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Intérêts cumulés</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scenariosAffichés.map((scenario) => (
                <TableRow 
                  key={scenario.nom}
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ 
                      fontWeight: 500,
                      color: scenario.nom === 'Compte rémunéré' ? theme.palette.text.primary : theme.palette.primary.main
                    }}
                  >
                    {scenario.nom}
                  </TableCell>
                  <TableCell align="right">
                    {formatPercentage(scenario.tauxRendement)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    {formatCurrency(capitalInitial)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    {formatCurrency(scenario.resultat.capitalFinal)}
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      fontWeight: 500,
                      color: getValueColor(scenario.resultat.interetsCumules)
                    }}
                  >
                    {formatCurrency(scenario.resultat.interetsCumules)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {differences && (
        <>
          <Grid container spacing={4} sx={{ mt: 4, mb: 12 }}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3,
                  borderRadius: 2,
                  height: '100%',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                  Analyse comparative SFA
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Élément</TableCell>
                        <TableCell align="right">Montant</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover>
                        <TableCell>Intérêts cumulés</TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 500
                          }}
                        >
                          {formatCurrency(differences.interetsCumules)}
                        </TableCell>
                      </TableRow>
                      <TableRow hover>
                        <TableCell>
                          <Box>
                            <Box 
                              onClick={() => setShowChangements(!showChangements)}
                              sx={{ 
                                cursor: 'pointer',
                                '&:hover': {
                                  color: theme.palette.primary.main,
                                }
                              }}
                            >
                              {droitsEntreeTexteDroite}
                            </Box>
                            <Collapse in={showChangements}>
                              <Box sx={{ mt: 2, mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Typography variant="body2" sx={{ minWidth: 'max-content' }}>
                                    Changement de fondation
                                  </Typography>
                                  <FormControl size="small" fullWidth>
                                    <TextField
                                      type="number"
                                      size="small"
                                      placeholder="Nombre"
                                      value={nombreChangements}
                                      onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (value >= 0 && value <= 10) {
                                          setNombreChangements(value);
                                        }
                                      }}
                                      inputProps={{
                                        min: 0,
                                        max: 10
                                      }}
                                      sx={{
                                        '& .MuiOutlinedInput-root': {
                                          backgroundColor: 'white'
                                        }
                                      }}
                                    />
                                  </FormControl>
                                </Box>
                              </Box>
                            </Collapse>
                          </Box>
                        </TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 500,
                            verticalAlign: 'top',
                            pt: 2
                          }}
                        >
                          {formatCurrency(differences.fraisEntreeSFA)}
                        </TableCell>
                      </TableRow>
                      {nombreChangements > 0 && (
                        <TableRow hover>
                          <TableCell sx={{ pl: 4 }}>Frais de changement ({nombreChangements} fois)</TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              fontWeight: 500
                            }}
                          >
                            {formatCurrency(differences.fraisChangementFondationSFA, true)}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow hover>
                        <TableCell sx={{ fontWeight: 'bold' }}>Estimation du capital final</TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 'bold',
                            color: theme.palette.success.main
                          }}
                        >
                          {formatCurrency(differences.estimationNetteSFA)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3,
                  borderRadius: 2,
                  height: '100%',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                  Analyse comparative
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Élément</TableCell>
                        <TableCell align="right">Montant</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover>
                        <TableCell>Intérêts cumulés</TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 500
                          }}
                        >
                          {formatCurrency(differences.interetsCumules)}
                        </TableCell>
                      </TableRow>
                      <TableRow hover>
                        <TableCell>
                          <Box>
                            <Box 
                              onClick={() => setShowChangements(!showChangements)}
                              sx={{ 
                                cursor: 'pointer',
                                '&:hover': {
                                  color: theme.palette.primary.main,
                                }
                              }}
                            >
                              {droitsEntreeTexteGauche}
                            </Box>
                            <Collapse in={showChangements}>
                              <Box sx={{ mt: 2, mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Typography variant="body2" sx={{ minWidth: 'max-content' }}>
                                    Changement de fondation
                                  </Typography>
                                  <FormControl size="small" fullWidth>
                                    <TextField
                                      type="number"
                                      size="small"
                                      placeholder="Nombre"
                                      value={nombreChangements}
                                      onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (value >= 0 && value <= 10) {
                                          setNombreChangements(value);
                                        }
                                      }}
                                      inputProps={{
                                        min: 0,
                                        max: 10
                                      }}
                                      sx={{
                                        '& .MuiOutlinedInput-root': {
                                          backgroundColor: 'white'
                                        }
                                      }}
                                    />
                                  </FormControl>
                                </Box>
                              </Box>
                            </Collapse>
                          </Box>
                        </TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 500,
                            verticalAlign: 'top',
                            pt: 2
                          }}
                        >
                          {formatCurrency(differences.fraisEntreeMarche)}
                        </TableCell>
                      </TableRow>
                      {nombreChangements > 0 && (
                        <TableRow hover>
                          <TableCell sx={{ pl: 4 }}>Frais de changement ({nombreChangements} fois)</TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              fontWeight: 500,
                              color: theme.palette.error.main
                            }}
                          >
                            {formatCurrency(differences.fraisChangementFondation, true)}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow hover>
                        <TableCell sx={{ fontWeight: 'bold' }}>Estimation du capital final</TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 'bold',
                            color: theme.palette.success.main
                          }}
                        >
                          {formatCurrency(differences.estimationNetteMarche)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
          
          <DiagrammeComparatif 
            capitalInitial={capitalInitial}
            interetsCumules={differences.interetsCumules}
            fraisEntreeMarche={differences.fraisEntreeMarche}
            fraisEntreeSFA={differences.fraisEntreeSFA}
            profilInvestissement={
              profilSelectionne === 'EQUILIBRE' ? 'Allier sécurité et rendement' :
              profilSelectionne === 'CROISSANCE' ? 'Faire croître mon capital' :
              profilSelectionne === 'DYNAMIQUE' ? 'Placement dynamique' : ''
            }
          />
        </>
      )}
    </>
  );
} 