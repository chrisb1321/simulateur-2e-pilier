export interface AssuranceComplementaireAmbulatoire {
  id: string;
  nom: string;
  description: string;
  couverture: {
    type: 'pourcentage' | 'montant_fixe' | 'forfait';
    valeur: number;
    plafond?: number;
  };
  franchise?: number;
  prime: number;
  categorie: CategorieAmbulatoire;
  doublonsAVerifier: DoublonVerification[];
  exclusions?: string[];
  conditions?: string[];
}

export type CategorieAmbulatoire = 
  | 'medecine_generale'
  | 'medecine_specialisee' 
  | 'therapies_alternatives'
  | 'soins_dentaires'
  | 'soins_optiques'
  | 'medicaments'
  | 'analyses_laboratoire'
  | 'physiotherapie'
  | 'psychotherapie'
  | 'soins_preventifs';

export interface DoublonVerification {
  id: string;
  titre: string;
  description: string;
  priorite: 'haute' | 'moyenne' | 'basse';
  questionsAVerifier: string[];
  conseils: string[];
}

export interface CategorieAmbulatoireInfo {
  id: CategorieAmbulatoire;
  nom: string;
  description: string;
  icone: string;
  couleur: string;
}

export interface ParametresComparaison {
  age: number;
  region: string;
  revenus: number;
  situationFamiliale: 'celibataire' | 'couple' | 'famille';
  besoinsSpecifiques: string[];
}
