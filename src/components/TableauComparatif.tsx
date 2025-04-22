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
  const [nombreChangements, setNombreChangements] = useState<number>(1);
  const [showChangements, setShowChangements] = useState<boolean>(false);

  const droitsEntreeTexteGauche = "Droits d'entrée 3% (moy. du marché)";
  const droitsEntreeTexteDroite = "Droits d'entrée avec SFA";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
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
    const fraisEntreeBase = capitalInitial * tauxRendement.FRAIS_ENTREE_MARCHE; // Utiliser le taux configuré
    const fraisEntreeMarche = fraisEntreeBase * (nombreChangements + 1);
    const fraisEntreeSFA = capitalInitial * tauxRendement.FRAIS_ENTREE_SFA; // Utiliser le taux configuré

    const estimationNetteMarche = capitalInitial + interetsCumules - fraisEntreeMarche;
    const estimationNetteSFA = capitalInitial + interetsCumules - fraisEntreeSFA;

    return {
      interetsCumules,
      fraisEntreeBase,
      fraisEntreeMarche,
      fraisEntreeSFA,
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
          <Grid container spacing={8} sx={{ mb: 12 }}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 5,
                  borderRadius: 2,
                  height: '100%',
                  background: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    mb: 4
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
                      <TableRow 
                        hover 
                        onClick={() => setShowChangements(!showChangements)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>{droitsEntreeTexteGauche}</TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 500
                          }}
                        >
                          {formatCurrency(differences.fraisEntreeBase)}
                        </TableCell>
                      </TableRow>
                      {showChangements && (
                        <TableRow hover>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <InputLabel>Nombre de changements</InputLabel>
                              <Select
                                value={nombreChangements}
                                label="Nombre de changements"
                                onChange={(e) => setNombreChangements(Number(e.target.value))}
                              >
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <MenuItem key={num} value={num}>
                                    {num} changement{num > 1 ? 's' : ''}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="text.secondary">
                              + {formatCurrency(differences.fraisEntreeMarche - differences.fraisEntreeBase)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow hover>
                        <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                          Estimation du capital final
                        </TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 'bold',
                            color: theme.palette.success.main,
                            fontSize: '1.2rem'
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

            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 5,
                  borderRadius: 2,
                  height: '100%',
                  background: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    mb: 4
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
                      <TableRow 
                        hover 
                        onClick={() => setShowChangements(!showChangements)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>{droitsEntreeTexteDroite}</TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 500
                          }}
                        >
                          {formatCurrency(differences.fraisEntreeSFA)}
                        </TableCell>
                      </TableRow>
                      {showChangements && (
                        <TableRow hover>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <InputLabel>Nombre de changements</InputLabel>
                              <Select
                                value={nombreChangements}
                                label="Nombre de changements"
                                onChange={(e) => setNombreChangements(Number(e.target.value))}
                              >
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <MenuItem key={num} value={num}>
                                    {num} changement{num > 1 ? 's' : ''}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="text.secondary">
                              + {formatCurrency(0)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow hover>
                        <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                          Estimation du capital final
                        </TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            fontWeight: 'bold',
                            color: theme.palette.success.main,
                            fontSize: '1.2rem'
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