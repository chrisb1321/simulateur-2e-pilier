import { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import CustomButton from './CustomButton';
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

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Paramètres de simulation
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
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
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography gutterBottom>
              Taux de rendement des banques partenaires
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={input.tauxRendementBanque * 100}
              onChange={(e) =>
                onInputChange({
                  ...input,
                  tauxRendementBanque: Number(e.target.value) / 100,
                })
              }
              InputProps={{
                endAdornment: '%',
              }}
            />
          </Box>
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography gutterBottom>
              Rabais partenaire sur les frais d'entrée
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={input.rabaisPartenaire * 100}
              onChange={(e) =>
                onInputChange({
                  ...input,
                  rabaisPartenaire: Number(e.target.value) / 100,
                })
              }
              InputProps={{
                endAdornment: '%',
              }}
            />
          </Box>
          <Box sx={{ gridColumn: '1 / -1' }}>
            <FormControl fullWidth>
              <InputLabel id="offre-label">Offre</InputLabel>
              <Select
                labelId="offre-label"
                value={input.offreSelectionnee || 'Standard'}
                label="Offre"
                onChange={e => onInputChange({ ...input, offreSelectionnee: e.target.value })}
              >
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Confort">Confort</MenuItem>
                <MenuItem value="Complète">Complète</MenuItem>
                <MenuItem value="Premium">Premium</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ gridColumn: '1 / -1' }}>
            <CustomButton
              type="submit"
              fullWidth
              size="large"
            >
              Calculer la simulation
            </CustomButton>
          </Box>
        </Box>
      </form>
    </Paper>
  );
} 