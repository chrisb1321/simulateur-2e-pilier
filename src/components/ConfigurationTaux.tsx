import {
  Paper,
  Typography,
  Slider,
  Grid,
  Box,
} from '@mui/material';

interface ConfigurationTauxProps {
  tauxActuels: {
    CASH: number;
    FAIBLE: number;
    MOYEN: number;
    ELEVE: number;
    FRAIS_ENTREE_MARCHE: number;
    FRAIS_ENTREE_SFA: number;
  };
  onTauxChange: (nouveauxTaux: ConfigurationTauxProps['tauxActuels']) => void;
}

export default function ConfigurationTaux({ tauxActuels, onTauxChange }: ConfigurationTauxProps) {
  const handleChange = (profil: keyof typeof tauxActuels) => (event: Event, newValue: number | number[]) => {
    const nouveauxTaux = {
      ...tauxActuels,
      [profil]: (newValue as number) / 100
    };
    onTauxChange(nouveauxTaux);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 5,
        borderRadius: 2,
        background: 'linear-gradient(to right bottom, #ffffff, #f5f5f5)',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 5, color: 'primary.main', fontWeight: 'bold' }}>
        Configuration des taux de rendement
      </Typography>

      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>
              Compte rémunéré
            </Typography>
            <Slider
              value={tauxActuels.CASH * 100}
              onChange={handleChange('CASH')}
              min={0}
              max={2}
              step={0.1}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPercentage}
              marks={[
                { value: 0, label: '0%' },
                { value: 2, label: '2%' },
              ]}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>
              Allier sécurité et rendement
            </Typography>
            <Slider
              value={tauxActuels.FAIBLE * 100}
              onChange={handleChange('FAIBLE')}
              min={0}
              max={4}
              step={0.1}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPercentage}
              marks={[
                { value: 0, label: '0%' },
                { value: 4, label: '4%' },
              ]}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>
              Faire croître mon capital
            </Typography>
            <Slider
              value={tauxActuels.MOYEN * 100}
              onChange={handleChange('MOYEN')}
              min={0}
              max={6}
              step={0.1}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPercentage}
              marks={[
                { value: 0, label: '0%' },
                { value: 6, label: '6%' },
              ]}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>
              Placement dynamique
            </Typography>
            <Slider
              value={tauxActuels.ELEVE * 100}
              onChange={handleChange('ELEVE')}
              min={0}
              max={8}
              step={0.1}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPercentage}
              marks={[
                { value: 0, label: '0%' },
                { value: 8, label: '8%' },
              ]}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>
              Droits d'entrée 3% (moy. du marché)
            </Typography>
            <Slider
              value={tauxActuels.FRAIS_ENTREE_MARCHE * 100}
              onChange={handleChange('FRAIS_ENTREE_MARCHE')}
              min={0}
              max={3}
              step={0.1}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPercentage}
              marks={[
                { value: 0, label: '0%' },
                { value: 3, label: '3%' },
              ]}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>
              Droits d'entrée avec SFA
            </Typography>
            <Slider
              value={tauxActuels.FRAIS_ENTREE_SFA * 100}
              onChange={handleChange('FRAIS_ENTREE_SFA')}
              min={0}
              max={3}
              step={0.1}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPercentage}
              marks={[
                { value: 0, label: '0%' },
                { value: 3, label: '3%' },
              ]}
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography variant="caption" color="text.secondary">
          Ajustez les curseurs pour modifier les taux de rendement de chaque profil de risque.
          Les modifications seront immédiatement reflétées dans la simulation.
        </Typography>
      </Box>
    </Paper>
  );
} 