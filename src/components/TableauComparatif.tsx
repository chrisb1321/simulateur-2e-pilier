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
  Collapse,
  TextField,
  FormControl,
} from '@mui/material';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { SimulationScenario } from '../types/simulation';
import { useState } from 'react';
import DiagrammeComparatif from './DiagrammeComparatif';
import { alpha } from '@mui/material/styles';

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

const MotionPaper = motion(Paper);
const MotionTableRow = motion(TableRow);
const MotionTypography = motion(Typography);
const MotionBox = motion(Box);

// Variants pour les animations
const containerVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

const rowVariants: Variants = {
  hidden: { 
    opacity: 0,
    x: -20,
    scale: 0.95,
  },
  visible: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
};

const leftCardVariants: Variants = {
  hidden: { 
    opacity: 0,
    x: -100,
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0.3
    }
  }
};

const rightCardVariants: Variants = {
  hidden: { 
    opacity: 0,
    x: 100,
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0.3
    }
  }
};

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

  const getValueColor = (value: number) => {
    if (value > 0) return theme.palette.success.main;
    if (value < 0) return theme.palette.error.main;
    return theme.palette.text.primary;
  };

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

  return (
    <>
      <MotionPaper 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3} 
        sx={{ 
          p: 5, 
          mb: 8,
          borderRadius: 2,
          background: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <MotionTypography 
            variant="h6" 
            sx={{ 
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            Comparatif des scénarios
          </MotionTypography>
          <MotionTypography 
            variant="subtitle1"
            sx={{ 
              color: theme.palette.text.secondary,
            }}
          >
            Durée de placement maximum : {ageMax - age} ans
          </MotionTypography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <MotionTableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Scénario</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Taux de rendement</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Capital initial</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Capital final</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Intérêts cumulés</TableCell>
              </MotionTableRow>
            </TableHead>
            <TableBody>
              {scenariosAffichés.map((scenario, index) => (
                <MotionTableRow 
                  key={scenario.nom}
                  custom={index}
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      transform: 'scale(1.01)',
                    }
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
                </MotionTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MotionPaper>

      <AnimatePresence mode="wait">
        {differences && (
          <motion.div
            key="comparative-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Grid container spacing={4} sx={{ mt: 4, mb: 12 }}>
              <Grid item xs={12} md={6}>
                <motion.div
                  key="sfa-card"
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{
                    type: "spring",
                    duration: 2.5,
                    bounce: 0,
                    damping: 35,
                    stiffness: 35
                  }}
                >
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3,
                      borderRadius: 2,
                      height: '100%',
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme => `0 12px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }
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
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div
                  key="comparative-card"
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  transition={{
                    type: "spring",
                    duration: 2.5,
                    bounce: 0,
                    damping: 35,
                    stiffness: 35
                  }}
                >
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3,
                      borderRadius: 2,
                      height: '100%',
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme => `0 12px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }
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
                </motion.div>
              </Grid>
            </Grid>
              
            <motion.div
              key="diagram"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                duration: 1.8,
                delay: 1.2,
                bounce: 0,
                damping: 35,
                stiffness: 35
              }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 