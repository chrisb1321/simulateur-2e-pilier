import { AssuranceComplementaireAmbulatoire, CategorieAmbulatoireInfo } from '../types/assurancesComplementaires';

export const CATEGORIES_AMBULATOIRES: CategorieAmbulatoireInfo[] = [
  {
    id: 'medecine_generale',
    nom: 'Médecine Générale',
    description: 'Consultations médecins généralistes et soins de base',
    icone: 'medical_services',
    couleur: '#1976d2'
  },
  {
    id: 'medecine_specialisee',
    nom: 'Médecine Spécialisée', 
    description: 'Consultations spécialistes et examens spécialisés',
    icone: 'psychology',
    couleur: '#388e3c'
  },
  {
    id: 'therapies_alternatives',
    nom: 'Thérapies Alternatives',
    description: 'Médecines douces et thérapies complémentaires',
    icone: 'spa',
    couleur: '#7b1fa2'
  },
  {
    id: 'soins_dentaires',
    nom: 'Soins Dentaires',
    description: 'Soins dentaires et orthodontie',
    icone: 'dentistry',
    couleur: '#f57c00'
  },
  {
    id: 'soins_optiques',
    nom: 'Soins Optiques',
    description: 'Lunettes, lentilles et soins oculaires',
    icone: 'visibility',
    couleur: '#d32f2f'
  },
  {
    id: 'medicaments',
    nom: 'Médicaments',
    description: 'Médicaments non remboursés par l\'assurance de base',
    icone: 'medication',
    couleur: '#5d4037'
  },
  {
    id: 'analyses_laboratoire',
    nom: 'Analyses Laboratoire',
    description: 'Analyses médicales et examens complémentaires',
    icone: 'science',
    couleur: '#00695c'
  },
  {
    id: 'physiotherapie',
    nom: 'Physiothérapie',
    description: 'Séances de physiothérapie et rééducation',
    icone: 'fitness_center',
    couleur: '#2e7d32'
  },
  {
    id: 'psychotherapie',
    nom: 'Psychothérapie',
    description: 'Séances de psychothérapie et soutien psychologique',
    icone: 'psychology_alt',
    couleur: '#6a1b9a'
  },
  {
    id: 'soins_preventifs',
    nom: 'Soins Préventifs',
    description: 'Examens préventifs et check-ups',
    icone: 'health_and_safety',
    couleur: '#c62828'
  }
];

export const ASSURANCES_AMBULATOIRES: AssuranceComplementaireAmbulatoire[] = [
  // Médecine Générale
  {
    id: 'medecine-gen-1',
    nom: 'Médecine Générale Complète',
    description: 'Couverture complète des consultations de médecins généralistes',
    couverture: {
      type: 'pourcentage',
      valeur: 90,
      plafond: 3000
    },
    prime: 25,
    categorie: 'medecine_generale',
    doublonsAVerifier: [
      {
        id: 'doublon-med-gen-1',
        titre: 'Vérification avec assurance maladie de base',
        description: 'Les consultations de médecins généralistes sont généralement couvertes par l\'assurance de base',
        priorite: 'haute',
        questionsAVerifier: [
          'Avez-vous déjà atteint votre franchise annuelle ?',
          'La consultation est-elle liée à une maladie grave ?',
          'Votre médecin est-il conventionné ?'
        ],
        conseils: [
          'Vérifiez toujours avec votre assurance de base avant de souscrire',
          'Consultez votre médecin traitant en priorité',
          'Conservez tous les justificatifs de paiement'
        ]
      }
    ]
  },

  // Médecine Spécialisée
  {
    id: 'medecine-spec-1',
    nom: 'Médecine Spécialisée Complète',
    description: 'Couverture complète des consultations de médecins spécialistes',
    couverture: {
      type: 'pourcentage',
      valeur: 90,
      plafond: 5000
    },
    prime: 45,
    categorie: 'medecine_specialisee',
    doublonsAVerifier: [
      {
        id: 'doublon-med-spec-1',
        titre: 'Vérification avec assurance maladie de base',
        description: 'Certaines consultations spécialisées peuvent être couvertes par l\'assurance de base',
        priorite: 'haute',
        questionsAVerifier: [
          'Votre médecin traitant a-t-il prescrit cette consultation ?',
          'La consultation est-elle liée à une maladie grave ?',
          'Avez-vous déjà atteint votre franchise annuelle ?'
        ],
        conseils: [
          'Vérifiez toujours avec votre assurance de base avant de consulter',
          'Demandez une prescription détaillée à votre médecin traitant',
          'Conservez tous les justificatifs de paiement'
        ]
      },
      {
        id: 'doublon-med-spec-2',
        titre: 'Recouvrement avec assurance collective',
        description: 'Votre employeur peut proposer des assurances complémentaires',
        priorite: 'moyenne',
        questionsAVerifier: [
          'Votre employeur propose-t-il des assurances complémentaires ?',
          'Bénéficiez-vous d\'une assurance collective ?',
          'Y a-t-il des plafonds spécifiques ?'
        ],
        conseils: [
          'Contactez votre service RH pour connaître vos avantages',
          'Comparez les plafonds et conditions',
          'Évitez les doublons de couverture'
        ]
      }
    ]
  },

  // Thérapies Alternatives
  {
    id: 'therapies-alt-1',
    nom: 'Thérapies Alternatives',
    description: 'Couverture des médecines douces et thérapies alternatives',
    couverture: {
      type: 'montant_fixe',
      valeur: 2000
    },
    prime: 35,
    categorie: 'therapies_alternatives',
    doublonsAVerifier: [
      {
        id: 'doublon-therapies-1',
        titre: 'Recouvrement avec autres assurances complémentaires',
        description: 'Certaines thérapies peuvent être couvertes par plusieurs assurances',
        priorite: 'moyenne',
        questionsAVerifier: [
          'Avez-vous une assurance pour les soins ambulatoires ?',
          'Votre employeur propose-t-il des assurances complémentaires ?',
          'Bénéficiez-vous d\'une assurance collective ?'
        ],
        conseils: [
          'Coordonnez vos assurances pour éviter les doublons',
          'Vérifiez les plafonds de chaque assurance',
          'Tenez un registre de vos remboursements'
        ]
      }
    ]
  },

  // Soins Dentaires
  {
    id: 'dentaire-1',
    nom: 'Soins Dentaires Complète',
    description: 'Couverture des soins dentaires et orthodontie',
    couverture: {
      type: 'pourcentage',
      valeur: 80,
      plafond: 4000
    },
    prime: 55,
    categorie: 'soins_dentaires',
    doublonsAVerifier: [
      {
        id: 'doublon-dentaire-1',
        titre: 'Vérification avec assurance maladie de base',
        description: 'Certains soins dentaires d\'urgence sont couverts par l\'assurance de base',
        priorite: 'haute',
        questionsAVerifier: [
          'Le soin est-il lié à un accident ?',
          'S\'agit-il d\'une urgence dentaire ?',
          'Le soin est-il médicalement nécessaire ?'
        ],
        conseils: [
          'Vérifiez les conditions de remboursement de l\'assurance de base',
          'Demandez un devis détaillé à votre dentiste',
          'Consultez votre dentiste régulièrement pour éviter les urgences'
        ]
      }
    ]
  },

  // Soins Optiques
  {
    id: 'optique-1',
    nom: 'Soins Optiques',
    description: 'Couverture des lunettes, lentilles et soins oculaires',
    couverture: {
      type: 'montant_fixe',
      valeur: 500
    },
    prime: 20,
    categorie: 'soins_optiques',
    doublonsAVerifier: [
      {
        id: 'doublon-optique-1',
        titre: 'Vérification avec assurance maladie de base',
        description: 'Certains soins oculaires sont couverts par l\'assurance de base',
        priorite: 'moyenne',
        questionsAVerifier: [
          'Le soin est-il médicalement nécessaire ?',
          'S\'agit-il d\'une maladie oculaire ?',
          'Avez-vous une prescription médicale ?'
        ],
        conseils: [
          'Vérifiez les conditions de remboursement',
          'Consultez un ophtalmologue pour les examens',
          'Comparez les prix chez différents opticiens'
        ]
      }
    ]
  },

  // Médicaments
  {
    id: 'medicaments-1',
    nom: 'Médicaments Complémentaires',
    description: 'Couverture des médicaments non remboursés par l\'assurance de base',
    couverture: {
      type: 'pourcentage',
      valeur: 70,
      plafond: 1500
    },
    prime: 30,
    categorie: 'medicaments',
    doublonsAVerifier: [
      {
        id: 'doublon-medicaments-1',
        titre: 'Vérification avec assurance maladie de base',
        description: 'Certains médicaments peuvent être remboursés par l\'assurance de base',
        priorite: 'haute',
        questionsAVerifier: [
          'Le médicament est-il sur la liste des spécialités ?',
          'Avez-vous une prescription médicale ?',
          'Le médicament est-il médicalement nécessaire ?'
        ],
        conseils: [
          'Vérifiez la liste des médicaments remboursés',
          'Demandez à votre médecin des alternatives remboursées',
          'Consultez votre pharmacien pour les génériques'
        ]
      }
    ]
  },

  // Analyses Laboratoire
  {
    id: 'analyses-1',
    nom: 'Analyses Laboratoire',
    description: 'Couverture des analyses médicales et examens complémentaires',
    couverture: {
      type: 'pourcentage',
      valeur: 85,
      plafond: 2000
    },
    prime: 40,
    categorie: 'analyses_laboratoire',
    doublonsAVerifier: [
      {
        id: 'doublon-analyses-1',
        titre: 'Vérification avec assurance maladie de base',
        description: 'La plupart des analyses sont couvertes par l\'assurance de base',
        priorite: 'haute',
        questionsAVerifier: [
          'L\'analyse est-elle médicalement nécessaire ?',
          'Avez-vous une prescription médicale ?',
          'L\'analyse est-elle liée à une maladie grave ?'
        ],
        conseils: [
          'Vérifiez toujours avec votre assurance de base',
          'Demandez une prescription détaillée à votre médecin',
          'Consultez votre médecin traitant en priorité'
        ]
      }
    ]
  },

  // Physiothérapie
  {
    id: 'physio-1',
    nom: 'Physiothérapie Complète',
    description: 'Couverture des séances de physiothérapie et rééducation',
    couverture: {
      type: 'pourcentage',
      valeur: 80,
      plafond: 3000
    },
    prime: 50,
    categorie: 'physiotherapie',
    doublonsAVerifier: [
      {
        id: 'doublon-physio-1',
        titre: 'Vérification avec assurance maladie de base',
        description: 'La physiothérapie est souvent couverte par l\'assurance de base',
        priorite: 'haute',
        questionsAVerifier: [
          'Avez-vous une prescription médicale ?',
          'La physiothérapie est-elle médicalement nécessaire ?',
          'S\'agit-il d\'une rééducation post-opératoire ?'
        ],
        conseils: [
          'Vérifiez les conditions de remboursement',
          'Demandez une prescription détaillée',
          'Consultez votre médecin traitant'
        ]
      }
    ]
  },

  // Psychothérapie
  {
    id: 'psycho-1',
    nom: 'Psychothérapie',
    description: 'Couverture des séances de psychothérapie et soutien psychologique',
    couverture: {
      type: 'pourcentage',
      valeur: 75,
      plafond: 4000
    },
    prime: 60,
    categorie: 'psychotherapie',
    doublonsAVerifier: [
      {
        id: 'doublon-psycho-1',
        titre: 'Vérification avec assurance maladie de base',
        description: 'La psychothérapie peut être couverte par l\'assurance de base',
        priorite: 'haute',
        questionsAVerifier: [
          'Avez-vous une prescription médicale ?',
          'Le thérapeute est-il reconnu ?',
          'S\'agit-il d\'une maladie psychique grave ?'
        ],
        conseils: [
          'Vérifiez les conditions de remboursement',
          'Consultez un psychiatre pour une évaluation',
          'Demandez une prescription détaillée'
        ]
      }
    ]
  },

  // Soins Préventifs
  {
    id: 'preventif-1',
    nom: 'Soins Préventifs',
    description: 'Couverture des examens préventifs et check-ups',
    couverture: {
      type: 'montant_fixe',
      valeur: 800
    },
    prime: 25,
    categorie: 'soins_preventifs',
    doublonsAVerifier: [
      {
        id: 'doublon-preventif-1',
        titre: 'Vérification avec assurance maladie de base',
        description: 'Certains examens préventifs sont couverts par l\'assurance de base',
        priorite: 'moyenne',
        questionsAVerifier: [
          'L\'examen est-il médicalement nécessaire ?',
          'Avez-vous une prescription médicale ?',
          'L\'examen est-il lié à un facteur de risque ?'
        ],
        conseils: [
          'Vérifiez les conditions de remboursement',
          'Consultez votre médecin traitant',
          'Demandez une prescription détaillée'
        ]
      }
    ]
  }
];
