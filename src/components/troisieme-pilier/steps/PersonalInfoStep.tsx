import React from 'react';
import { Box, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import { SimulationDataPilier3 } from '../../../types/pilier3';

interface PersonalInfoStepProps {
  data: SimulationDataPilier3;
  onUpdate: (updates: Partial<SimulationDataPilier3>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ 
  data, 
  onUpdate 
}) => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Informations personnelles
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Partagez quelques informations de base pour personnaliser votre simulation.
      </Typography>

      <Grid container spacing={3}>
        {/* Âge actuel */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Âge actuel"
            type="number"
            value={data.age}
            onChange={(e) => onUpdate({ age: Number(e.target.value) })}
            inputProps={{ min: 18, max: 70 }}
            helperText="Entre 18 et 70 ans"
          />
        </Grid>

        {/* Âge de retraite prévu */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Âge de retraite prévu"
            type="number"
            value={data.retirementAge}
            onChange={(e) => onUpdate({ retirementAge: Number(e.target.value) })}
            inputProps={{ min: 58, max: 75 }}
            helperText="Entre 58 et 75 ans"
          />
        </Grid>

        {/* Genre */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Genre</FormLabel>
            <RadioGroup
              row
              value={data.gender}
              onChange={(e) => onUpdate({ gender: e.target.value as 'male' | 'female' })}
            >
              <FormControlLabel value="male" control={<Radio />} label="Homme" />
              <FormControlLabel value="female" control={<Radio />} label="Femme" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      {/* Informations importantes */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Informations importantes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • L'âge de retraite légal en Suisse est de 65 ans pour les hommes et 64 ans pour les femmes
          <br />
          • Vous pouvez prendre votre retraite anticipée dès 58 ans (avec réduction)
          <br />
          • Le 3ème pilier peut être retiré dès 58 ans ou lors du départ à la retraite
        </Typography>
      </Box>
    </Box>
  );
};

export default PersonalInfoStep;
