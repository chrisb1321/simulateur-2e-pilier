import React from 'react';
import { Box, Typography, TextField, Grid, Slider, Alert } from '@mui/material';
import { SimulationDataPilier3 } from '../../../types/pilier3';

interface ProjectionParamsStepProps {
  data: SimulationDataPilier3;
  onUpdate: (updates: Partial<SimulationDataPilier3>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProjectionParamsStep: React.FC<ProjectionParamsStepProps> = ({ 
  data, 
  onUpdate 
}) => {

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Paramètres de projection
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Définissez votre objectif de revenu à la retraite et le rendement attendu pour la simulation.
      </Typography>

      <Grid container spacing={3}>
        {/* Revenu souhaité à la retraite */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Revenu souhaité à la retraite (CHF/mois)"
            type="number"
            value={data.targetRetirementIncome}
            onChange={(e) => onUpdate({ targetRetirementIncome: Number(e.target.value) })}
            InputProps={{
              endAdornment: ' CHF'
            }}
            helperText="Montant mensuel souhaité à la retraite"
          />
        </Grid>

        {/* Comparaison revenu actuel vs souhaité */}
        <Grid item xs={12}>
          <Box sx={{ p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Comparaison des revenus
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Revenu actuel
                </Typography>
                <Typography variant="h6" color="primary">
                  {Math.round(data.annualIncome / 12).toLocaleString('fr-CH')} CHF/mois
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Revenu souhaité
                </Typography>
                <Typography variant="h6" color="success.main">
                  {data.targetRetirementIncome.toLocaleString('fr-CH')} CHF/mois
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({Math.round((data.targetRetirementIncome / (data.annualIncome / 12)) * 100)}% du revenu actuel)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Différence
                </Typography>
                <Typography variant="h6" color="error.main">
                  {data.targetRetirementIncome > (data.annualIncome / 12) ? '+' : ''}
                  {Math.round(data.targetRetirementIncome - (data.annualIncome / 12)).toLocaleString('fr-CH')} CHF/mois
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({Math.round(((data.annualIncome / 12) - data.targetRetirementIncome) / (data.annualIncome / 12) * 100)}% de baisse)
                </Typography>
              </Grid>
            </Grid>
            
            {/* Message d'interprétation */}
            <Box sx={{ mt: 2 }}>
              {data.targetRetirementIncome > (data.annualIncome / 12) ? (
                <Alert severity="info">
                  <Typography variant="body2">
                    <strong>Objectif ambitieux :</strong> Vous souhaitez un revenu de retraite supérieur à votre revenu actuel. 
                    Cela nécessitera une épargne importante et/ou des rendements élevés.
                  </Typography>
                </Alert>
              ) : data.targetRetirementIncome < (data.annualIncome / 12) * 0.7 ? (
                <Alert severity="success">
                  <Typography variant="body2">
                    <strong>Objectif réaliste :</strong> Votre objectif est inférieur à 70% de votre revenu actuel, 
                    ce qui est une approche prudente pour la retraite.
                  </Typography>
                </Alert>
              ) : (
                <Alert severity="info">
                  <Typography variant="body2">
                    <strong>Objectif équilibré :</strong> Votre objectif représente environ {Math.round((data.targetRetirementIncome / (data.annualIncome / 12)) * 100)}% 
                    de votre revenu actuel, ce qui est un bon équilibre.
                  </Typography>
                </Alert>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Scénarios de rendement */}
        <Grid item xs={12}>
          <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
            Choisissez votre scénario de rendement
          </Typography>
          <Grid container spacing={2}>
            {/* Scénario Sécurisé */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: data.expectedReturns === 2.1 ? '2px solid #4caf50' : '1px solid #e0e0e0',
                  borderRadius: 2,
                  backgroundColor: data.expectedReturns === 2.1 ? '#f1f8e9' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#4caf50',
                    backgroundColor: '#f1f8e9',
                  }
                }}
                onClick={() => onUpdate({ expectedReturns: 2.1 })}
              >
                <Typography variant="h6" color="success.main" gutterBottom>
                  Sécurisé
                </Typography>
                <Typography variant="h4" fontWeight={700} color="success.main">
                  2.1%
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Investissements très conservateurs, faible risque
                </Typography>
              </Box>
            </Grid>

            {/* Scénario Moyen */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: data.expectedReturns === 6.3 ? '2px solid #2196f3' : '1px solid #e0e0e0',
                  borderRadius: 2,
                  backgroundColor: data.expectedReturns === 6.3 ? '#e3f2fd' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#2196f3',
                    backgroundColor: '#e3f2fd',
                  }
                }}
                onClick={() => onUpdate({ expectedReturns: 6.3 })}
              >
                <Typography variant="h6" color="primary.main" gutterBottom>
                  Moyen
                </Typography>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  6.3%
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Équilibre entre sécurité et rendement
                </Typography>
              </Box>
            </Grid>

            {/* Scénario Dynamique */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: data.expectedReturns === 9.7 ? '2px solid #ff9800' : '1px solid #e0e0e0',
                  borderRadius: 2,
                  backgroundColor: data.expectedReturns === 9.7 ? '#fff3e0' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#ff9800',
                    backgroundColor: '#fff3e0',
                  }
                }}
                onClick={() => onUpdate({ expectedReturns: 9.7 })}
              >
                <Typography variant="h6" color="warning.main" gutterBottom>
                  Dynamique
                </Typography>
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  9.7%
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Investissements plus risqués, rendement élevé
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Scénario sélectionné : {data.expectedReturns}%
          </Typography>
        </Grid>
      </Grid>


      {/* Avertissement sur les rendements */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Important :</strong> Les rendements passés ne préjugent pas des rendements futurs. 
          Cette simulation est basée sur des hypothèses et ne constitue pas un conseil en investissement.
        </Typography>
      </Alert>

      {/* Résumé de la simulation */}
      <Box sx={{ mt: 3, p: 3, backgroundColor: 'primary.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Résumé de votre simulation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Période d'épargne :</strong> {data.retirementAge - data.age} ans
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Contribution totale :</strong> {((data.monthlyContribution * 12) * (data.retirementAge - data.age)).toLocaleString('fr-CH')} CHF
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Rendement attendu :</strong> {data.expectedReturns}% par an
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Objectif mensuel :</strong> {data.targetRetirementIncome.toLocaleString('fr-CH')} CHF
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProjectionParamsStep;
