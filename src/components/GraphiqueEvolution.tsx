import { Paper, Typography, Box, useTheme, Grid } from '@mui/material';
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
      opacity: isSelected ? 1 : 0.3,
      filter: isSelected ? `drop-shadow(0 0 6px ${color})` : 'none',
      cursor: 'pointer'
    };
  };

  return (
    <>
      <Paper elevation={3} sx={{ 
        p: 3, 
        mb: 3,
        mt: { xs: 8, sm: 10, md: 12 }
      }}>
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
                <PersonIcon color="primary" sx={{ fontSize: 28 }} />
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
                <AssessmentIcon color="primary" sx={{ fontSize: 28 }} />
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
                <TimelineIcon color="primary" sx={{ fontSize: 28 }} />
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
                <CompareIcon color="primary" sx={{ fontSize: 28 }} />
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
                <SwapHorizIcon color="primary" sx={{ fontSize: 28 }} />
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
                <AccountBalanceIcon color="primary" sx={{ fontSize: 28 }} />
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
                <BusinessIcon color="primary" sx={{ fontSize: 28 }} />
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
                <SecurityIcon color="primary" sx={{ fontSize: 28 }} />
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
    </>
  );
} 