import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Slider,
  Grid,
} from '@mui/material';
import { SimulationInput } from '../types/simulation';

interface FormulaireSimulationProps {
  input: SimulationInput;
  onInputChange: (input: SimulationInput) => void;
  onCalculer: (input: SimulationInput) => void;
  constants: {
    AGE_MIN: number;
    AGE_MAX: number;
    TAUX_RENDEMENT_BANQUE_DEFAUT: number;
    RABAIS_PARTENAIRE_DEFAUT: number;
  };
}

export default function FormulaireSimulation({
  input,
  onInputChange,
  onCalculer,
  constants,
}: FormulaireSimulationProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof SimulationInput, string>>>({});

  const validateInput = (): boolean => {
    const newErrors: Partial<Record<keyof SimulationInput, string>> = {};

    if (input.age < constants.AGE_MIN || input.age > constants.AGE_MAX) {
      newErrors.age = `L'âge doit être compris entre ${constants.AGE_MIN} et ${constants.AGE_MAX} ans`;
    }

    if (input.capital <= 0) {
      newErrors.capital = 'Le capital doit être supérieur à 0';
    }

    if (input.tauxRendementBanque <= 0) {
      newErrors.tauxRendementBanque = 'Le taux de rendement doit être supérieur à 0';
    }

    if (input.rabaisPartenaire < 0 || input.rabaisPartenaire > 1) {
      newErrors.rabaisPartenaire = 'Le rabais doit être compris entre 0 et 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput()) {
      onCalculer(input);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
    }).format(value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Paramètres de simulation
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Âge actuel"
              value={input.age}
              onChange={(e) =>
                onInputChange({ ...input, age: Number(e.target.value) })
              }
              error={!!errors.age}
              helperText={errors.age}
              inputProps={{
                min: constants.AGE_MIN,
                max: constants.AGE_MAX,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Capital 2e pilier"
              value={input.capital}
              onChange={(e) =>
                onInputChange({ ...input, capital: Number(e.target.value) })
              }
              error={!!errors.capital}
              helperText={errors.capital}
              InputProps={{
                startAdornment: 'CHF',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>
              Taux de rendement des banques partenaires
            </Typography>
            <Slider
              value={input.tauxRendementBanque * 100}
              onChange={(_, value) =>
                onInputChange({
                  ...input,
                  tauxRendementBanque: (value as number) / 100,
                })
              }
              min={0}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>
              Rabais partenaire sur les frais d'entrée
            </Typography>
            <Slider
              value={input.rabaisPartenaire * 100}
              onChange={(_, value) =>
                onInputChange({
                  ...input,
                  rabaisPartenaire: (value as number) / 100,
                })
              }
              min={0}
              max={100}
              step={5}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Calculer la simulation
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
} 