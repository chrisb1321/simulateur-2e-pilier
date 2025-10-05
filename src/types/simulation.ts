export type ProfilType = 'EQUILIBRE' | 'CROISSANCE' | 'DYNAMIQUE';

export interface SimulationInput {
  age: number;
  capital: number;
  tauxRendementBanque: number;
  rabaisPartenaire: number;
  offreSelectionnee?: string;
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
  FRAIS_ENTREE_MARCHE: number;
  FRAIS_ENTREE_SFA: number;
} 