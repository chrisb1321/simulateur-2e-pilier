import React, { useState } from 'react';
import { Box, Paper, Typography, Stepper, Step, StepLabel, Button, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalInfoStep from './steps/PersonalInfoStep';
import IncomeAndSavingsStep from './steps/IncomeAndSavingsStep';
import ProjectionParamsStep from './steps/ProjectionParamsStep';
import SimulationResultsStep from './steps/SimulationResultsStep';
import { SimulationDataPilier3, DEFAULT_SIMULATION_DATA } from '../../types/pilier3';
import { Pilier3Service } from '../../services/pilier3Service';

const STEPS = [
  'Informations personnelles',
  'Revenus et épargne',
  'Paramètres de projection',
  'Résultats'
];

const SimulateurPilier3Wizard: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [simulationData, setSimulationData] = useState<SimulationDataPilier3>(DEFAULT_SIMULATION_DATA);
  const [errors, setErrors] = useState<string[]>([]);

  const theme = useTheme();

  const handleNext = () => {
    // Validation seulement pour les étapes qui nécessitent des données spécifiques
    let validation = { isValid: true, errors: [] };
    
    // Validation spécifique par étape
    switch (activeStep) {
      case 0: // Informations personnelles
        validation = validatePersonalInfo();
        break;
      case 1: // Revenus et épargne
        validation = validateIncomeAndSavings();
        break;
      case 2: // Paramètres de projection
        validation = validateProjectionParams();
        break;
      default:
        validation = { isValid: true, errors: [] };
    }

    if (validation.isValid) {
      setErrors([]);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setErrors(validation.errors);
    }
  };

  const validatePersonalInfo = () => {
    const errors: string[] = [];
    
    if (simulationData.age < 18 || simulationData.age > 70) {
      errors.push('L\'âge doit être entre 18 et 70 ans');
    }
    
    if (simulationData.retirementAge < 58 || simulationData.retirementAge > 75) {
      errors.push('L\'âge de retraite doit être entre 58 et 75 ans');
    }
    
    if (simulationData.retirementAge <= simulationData.age) {
      errors.push('L\'âge de retraite doit être supérieur à l\'âge actuel');
    }

    return { isValid: errors.length === 0, errors };
  };

  const validateIncomeAndSavings = () => {
    const errors: string[] = [];
    
    if (simulationData.annualIncome <= 0) {
      errors.push('Le revenu annuel doit être positif');
    }
    
    if (simulationData.monthlyContribution <= 0) {
      errors.push('La contribution mensuelle doit être positive');
    }
    
    // On ne bloque plus le dépassement - on l'explique dans l'interface
    // La partie excédentaire sera automatiquement en pilier 3b

    return { isValid: errors.length === 0, errors };
  };

  const validateProjectionParams = () => {
    const errors: string[] = [];
    
    if (simulationData.targetRetirementIncome <= 0) {
      errors.push('Le revenu souhaité à la retraite doit être positif');
    }
    
    if (simulationData.expectedReturns < 0 || simulationData.expectedReturns > 10) {
      errors.push('Le rendement attendu doit être entre 0% et 10%');
    }

    return { isValid: errors.length === 0, errors };
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors([]);
  };

  const handleUpdate = (updates: Partial<SimulationDataPilier3>) => {
    setSimulationData(prev => ({ ...prev, ...updates }));
    // Clear errors when data is updated
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setSimulationData(DEFAULT_SIMULATION_DATA);
    setErrors([]);
  };

  const renderStepContent = (step: number) => {
    const commonProps = {
      data: simulationData,
      onUpdate: handleUpdate,
      onNext: handleNext,
      onBack: handleBack,
    };

    switch (step) {
      case 0:
        return <PersonalInfoStep {...commonProps} />;
      case 1:
        return <IncomeAndSavingsStep {...commonProps} />;
      case 2:
        return <ProjectionParamsStep {...commonProps} />;
      case 3:
        return <SimulationResultsStep {...commonProps} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Simulateur 3ème Pilier Complet
      </Typography>

      {/* Stepper */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Errors */}
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Veuillez corriger les erreurs suivantes :
          </Typography>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/* Step Content */}
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent(activeStep)}
          </motion.div>
        </AnimatePresence>
      </Paper>

      {/* Navigation buttons */}
      {activeStep < 3 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Retour
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            {activeStep === STEPS.length - 2 ? 'Voir les résultats' : 'Continuer'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SimulateurPilier3Wizard;
