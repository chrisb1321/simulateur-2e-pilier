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
} from '@mui/material';
import { SimulationScenario } from '../types/simulation';

interface TableauComparatifProps {
  scenarios: SimulationScenario[];
  capitalInitial: number;
}

export default function TableauComparatif({ scenarios, capitalInitial }: TableauComparatifProps) {
  const theme = useTheme();

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

  const calculerDifferences = () => {
    const scenarioCash = scenarios.find(s => s.nom === 'Compte Cash');
    const scenarioProfil = scenarios.find(s => s.nom !== 'Compte Cash');

    if (!scenarioCash || !scenarioProfil) return null;

    const interetsCumules = scenarioProfil.resultat.interetsCumules;
    const fraisEntree = capitalInitial * 0.03; // 3% du capital initial
    const estimationNette = interetsCumules - fraisEntree;

    return {
      interetsCumules,
      fraisEntree,
      estimationNette
    };
  };

  const differences = calculerDifferences();

  const getValueColor = (value: number) => {
    if (value > 0) return theme.palette.success.main;
    if (value < 0) return theme.palette.error.main;
    return theme.palette.text.primary;
  };

  return (
    <>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 2,
          borderRadius: 2,
          background: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            mb: 3
          }}
        >
          Comparatif des scénarios
        </Typography>
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
              {scenarios
                .sort((a, _) => (a.nom === 'Compte Cash' ? -1 : 1))
                .map((scenario) => (
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
                      color: scenario.nom === 'Banque Partenaire' ? theme.palette.primary.main : theme.palette.text.primary
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
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Analyse comparative
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Élément</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Montant</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>Intérêts cumulés</TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      color: getValueColor(differences.interetsCumules),
                      fontWeight: 500
                    }}
                  >
                    {formatCurrency(differences.interetsCumules)}
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>Droits d'entrée</TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      fontWeight: 500
                    }}
                  >
                    {formatCurrency(differences.fraisEntree)}
                  </TableCell>
                </TableRow>
                <TableRow 
                  hover
                  sx={{ 
                    backgroundColor: theme.palette.grey[50],
                  }}
                >
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Capital estimé à terme
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      color: getValueColor(differences.estimationNette)
                    }}
                  >
                    {formatCurrency(differences.estimationNette)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
} 