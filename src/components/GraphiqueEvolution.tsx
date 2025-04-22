import { Paper, Typography, Box, useTheme } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';
import CompareIcon from '@mui/icons-material/Compare';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import { SimulationScenario } from '../types/simulation';

interface GraphiqueEvolutionProps {
  scenarios: SimulationScenario[];
  profilSelectionne: 'EQUILIBRE' | 'CROISSANCE' | 'DYNAMIQUE';
}

export default function GraphiqueEvolution({ scenarios, profilSelectionne }: GraphiqueEvolutionProps) {
  const theme = useTheme();
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Préparer les données pour le graphique
  const prepareData = () => {
    const data: any[] = [];
    const maxYears = Math.max(
      ...scenarios.map((s) => s.resultat.evolutionCapital.length)
    );

    for (let i = 0; i < maxYears; i++) {
      const point: any = { annee: i };
      scenarios.forEach((scenario) => {
        if (i < scenario.resultat.evolutionCapital.length) {
          point[scenario.nom] = scenario.resultat.evolutionCapital[i].capital;
        }
      });
      data.push(point);
    }

    return data;
  };

  const getLineColor = (scenarioNom: string) => {
    switch(scenarioNom) {
      case 'Compte rémunéré':
        return '#1976d2'; // Bleu
      case 'Allier sécurité et rendement':
        return '#43a047'; // Vert
      case 'Faire croître mon capital':
        return '#ff9800'; // Orange
      case 'Placement dynamique':
        return '#e91e63'; // Rose
      default:
        return '#1976d2';
    }
  };

  const getLineStyle = (scenarioNom: string) => {
    const isSelected = 
      (scenarioNom === 'Allier sécurité et rendement' && profilSelectionne === 'EQUILIBRE') ||
      (scenarioNom === 'Faire croître mon capital' && profilSelectionne === 'CROISSANCE') ||
      (scenarioNom === 'Placement dynamique' && profilSelectionne === 'DYNAMIQUE');

    const color = getLineColor(scenarioNom);
    
    return {
      strokeWidth: isSelected ? 4 : 2,
      opacity: isSelected ? 1 : 0.5,
      filter: isSelected ? `drop-shadow(0 0 6px ${color})` : 'none',
      cursor: 'pointer'
    };
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, mb: 3, mt: 15 }}>
        <Typography variant="h6" gutterBottom>
          Évolution du capital dans le temps
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={prepareData()}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="annee"
              label={{
                value: 'Années',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Année ${label}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
            <Legend 
              verticalAlign="top"
              height={36}
            />
            {scenarios
              .sort((a) => (a.nom === 'Compte rémunéré' ? 1 : -1))
              .map((scenario) => {
                const lineStyle = getLineStyle(scenario.nom);
                const color = getLineColor(scenario.nom);
                return (
                  <Line
                    key={scenario.nom}
                    type="monotone"
                    dataKey={scenario.nom}
                    stroke={color}
                    strokeWidth={lineStyle.strokeWidth}
                    opacity={lineStyle.opacity}
                    dot={{ 
                      r: lineStyle.strokeWidth === 4 ? 4 : 2,
                      strokeWidth: lineStyle.strokeWidth === 4 ? 2 : 1,
                      fill: color,
                      filter: lineStyle.filter
                    }}
                    activeDot={{
                      r: lineStyle.strokeWidth === 4 ? 6 : 4,
                      strokeWidth: 2,
                      filter: lineStyle.filter
                    }}
                    style={{
                      filter: lineStyle.filter,
                      transition: 'all 0.3s ease'
                    }}
                  />
                );
              })}
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
} 