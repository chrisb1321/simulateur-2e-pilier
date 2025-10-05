// Types pour le simulateur 3ème pilier
export interface SimulationDataPilier3 {
  // Informations personnelles
  age: number;
  retirementAge: number;
  gender: 'male' | 'female';
  
  // Revenus et épargne
  annualIncome: number;
  monthlyContribution: number;
  
  // Objectifs de retraite
  targetRetirementIncome: number;
  targetLifestyle: 'basic' | 'moderate' | 'comfortable' | 'luxury';
  
  // Paramètres de projection
  expectedReturns: number;
}

// Données de projection
export interface ProjectionData {
  age: number;
  savings: number;
}

// Résultats de simulation
export interface SimulationResults {
  finalAmount: number;
  monthlyContribution: number;
  annualContribution: number;
  taxSavings: number;
  projectionData: ProjectionData[];
  yearsUntilRetirement: number;
}

// Informations de contact
export interface ContactInfo {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
}

// Constantes pour le 3ème pilier
export const PILIER3_CONSTANTS = {
  MAX_DEDUCTIBLE_3A: 7258, // CHF/an (2025)
  MAX_MONTHLY_3A: 605, // CHF/mois (7258/12)
  TAX_SAVINGS_RATE: 0.25, // 25% d'économie d'impôt moyenne
  MIN_AGE: 18,
  MAX_AGE: 70,
  MIN_RETIREMENT_AGE: 58,
  MAX_RETIREMENT_AGE: 75,
  DEFAULT_RETURNS: 6.3, // 6.3% de rendement par défaut (scénario moyen)
};

// Valeurs par défaut
export const DEFAULT_SIMULATION_DATA: SimulationDataPilier3 = {
  age: 30,
  retirementAge: 65,
  gender: 'male',
  annualIncome: 80000,
  monthlyContribution: 750,
  targetRetirementIncome: 5000,
  targetLifestyle: 'moderate',
  expectedReturns: 6.3,
};
