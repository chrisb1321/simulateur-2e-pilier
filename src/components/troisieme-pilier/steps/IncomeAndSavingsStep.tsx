import React from 'react';
import { Box, Typography, TextField, Grid, Tooltip, IconButton, Alert } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { SimulationDataPilier3, PILIER3_CONSTANTS } from '../../../types/pilier3';
import { Pilier3Service } from '../../../services/pilier3Service';

interface IncomeAndSavingsStepProps {
  data: SimulationDataPilier3;
  onUpdate: (updates: Partial<SimulationDataPilier3>) => void;
  onNext: () => void;
  onBack: () => void;
}

const IncomeAndSavingsStep: React.FC<IncomeAndSavingsStepProps> = ({ 
  data, 
  onUpdate 
}) => {
  const isOverLimit = data.monthlyContribution * 12 > PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Revenus et épargne
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Indiquez vos revenus et le montant que vous souhaitez épargner chaque mois.
      </Typography>

      <Grid container spacing={3}>
        {/* Revenu annuel */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              Revenu annuel brut (CHF)
            </Typography>
            <Tooltip title="Votre revenu annuel avant impôts et déductions">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            type="number"
            value={data.annualIncome}
            onChange={(e) => onUpdate({ annualIncome: Number(e.target.value) })}
            InputProps={{
              endAdornment: ' CHF'
            }}
          />
        </Grid>

        {/* Contribution mensuelle */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              Contribution mensuelle au 3ème pilier (CHF)
            </Typography>
            <Tooltip 
              title={
                <Box>
                  <Typography variant="body2">
                    Montant total que vous souhaitez épargner chaque mois pour votre retraite
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Maximum déductible 3a : {Pilier3Service.formatCurrency(PILIER3_CONSTANTS.MAX_MONTHLY_3A)}/mois ({Pilier3Service.formatCurrency(PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A)}/an - 2025)
                  </Typography>
                </Box>
              }
            >
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            type="number"
            value={data.monthlyContribution}
            onChange={(e) => onUpdate({ monthlyContribution: Number(e.target.value) })}
            InputProps={{
              endAdornment: ' CHF'
            }}
            helperText={isOverLimit ? 
              `Répartition automatique : ${Pilier3Service.formatCurrency(PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A)} en 3a, ${Pilier3Service.formatCurrency((data.monthlyContribution * 12) - PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A)} en 3b` : 
              `Maximum déductible 3a : ${Pilier3Service.formatCurrency(PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A)}/an (2025)`
            }
          />
        </Grid>
      </Grid>

      {/* Information sur la répartition 3a/3b */}
      {isOverLimit && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>Répartition automatique de votre épargne :</strong>
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2 }}>
            <Typography component="li" variant="body2">
              <strong>Pilier 3a :</strong> {Pilier3Service.formatCurrency(PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A)}/an (déductible fiscalement)
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Pilier 3b :</strong> {Pilier3Service.formatCurrency((data.monthlyContribution * 12) - PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A)}/an (sans avantage fiscal)
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Cette répartition optimise votre avantage fiscal tout en vous permettant d'épargner davantage.
          </Typography>
        </Alert>
      )}

      {/* Informations importantes */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Informations importantes
        </Typography>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Le montant maximum déductible pour le pilier 3a est de {Pilier3Service.formatCurrency(PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A)} par an (2025)
          </Typography>
          <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Il n'y a pas de limite pour le pilier 3b, mais il n'offre pas d'avantages fiscaux
          </Typography>
          <Typography component="li" variant="body2" color="text.secondary">
            Une épargne régulière est la clé d'une retraite confortable
          </Typography>
        </Box>
      </Box>

      {/* Calcul de l'économie fiscale */}
      <Box sx={{ mt: 3, p: 3, backgroundColor: 'primary.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Économie fiscale estimée
        </Typography>
        <Typography variant="body1">
          Avec une contribution de {Pilier3Service.formatCurrency(data.monthlyContribution)}/mois, 
          votre économie fiscale annuelle sera d'environ{' '}
          <strong>
            {Pilier3Service.formatCurrency(
              Math.min(data.monthlyContribution * 12, PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A) * PILIER3_CONSTANTS.TAX_SAVINGS_RATE
            )}
          </strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default IncomeAndSavingsStep;
