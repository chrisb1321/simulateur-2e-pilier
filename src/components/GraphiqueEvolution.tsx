import { Paper, Typography } from '@mui/material';
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
import { SimulationScenario } from '../types/simulation';

interface GraphiqueEvolutionProps {
  scenarios: SimulationScenario[];
}

export default function GraphiqueEvolution({ scenarios }: GraphiqueEvolutionProps) {
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
    return scenarioNom === 'Compte Cash' ? '#1976d2' : '#43a047';
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Évolution du capital dans le temps
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={prepareData()}>
          <CartesianGrid strokeDasharray="3 3" />
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
            label={{
              value: 'Capital',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Année ${label}`}
          />
          <Legend />
          {scenarios
            .sort((a) => (a.nom === 'Compte Cash' ? 1 : -1))
            .map((scenario) => (
            <Line
              key={scenario.nom}
              type="monotone"
              dataKey={scenario.nom}
              stroke={getLineColor(scenario.nom)}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
} 