export interface SimulationInput {
  age: number;
  capital: number;
  tauxRendementBanque: number;
  rabaisPartenaire: number;
}

export interface SimulationResult {
  capitalFinal: number;
  interetsCumules: number;
  fraisEntree: number;
  evolutionCapital: Array<{
    annee: number;
    capital: number;
  }>;
}

export interface SimulationScenario {
  nom: string;
  tauxRendement: number;
  fraisEntree: number;
  resultat: SimulationResult;
}

export interface TauxRendement {
  CASH: number;
  FAIBLE: number;
  MOYEN: number;
  ELEVE: number;
} 