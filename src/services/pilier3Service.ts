import { SimulationDataPilier3, ProjectionData, SimulationResults, PILIER3_CONSTANTS } from '../types/pilier3';

export class Pilier3Service {
  /**
   * Calcule la projection du capital sur la période d'épargne
   */
  static calculateProjection(data: SimulationDataPilier3): ProjectionData[] {
    const yearsUntilRetirement = data.retirementAge - data.age;
    const monthlyContribution = data.monthlyContribution;
    const annualContribution = monthlyContribution * 12;
    const expectedReturns = data.expectedReturns / 100;

    let projectionData: ProjectionData[] = [];
    let totalSavings = 0;

    for (let year = 0; year <= yearsUntilRetirement; year++) {
      // Ajouter les contributions de l'année
      if (year > 0) {
        totalSavings += annualContribution;
        // Appliquer les rendements
        totalSavings *= (1 + expectedReturns);
      }
      
      projectionData.push({
        age: data.age + year,
        savings: Math.round(totalSavings)
      });
    }

    return projectionData;
  }

  /**
   * Calcule les résultats complets de la simulation
   */
  static calculateResults(data: SimulationDataPilier3): SimulationResults {
    const projectionData = this.calculateProjection(data);
    const finalAmount = projectionData[projectionData.length - 1].savings;
    const yearsUntilRetirement = data.retirementAge - data.age;
    const annualContribution = data.monthlyContribution * 12;
    
    // Calcul de l'économie fiscale basée uniquement sur le pilier 3a
    const pilier3aAmount = Math.min(annualContribution, PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A);
    const taxSavings = pilier3aAmount * PILIER3_CONSTANTS.TAX_SAVINGS_RATE;

    return {
      finalAmount,
      monthlyContribution: data.monthlyContribution,
      annualContribution,
      taxSavings,
      projectionData,
      yearsUntilRetirement
    };
  }

  /**
   * Valide les données de simulation
   */
  static validateData(data: SimulationDataPilier3): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (data.age < PILIER3_CONSTANTS.MIN_AGE || data.age > PILIER3_CONSTANTS.MAX_AGE) {
      errors.push(`L'âge doit être entre ${PILIER3_CONSTANTS.MIN_AGE} et ${PILIER3_CONSTANTS.MAX_AGE} ans`);
    }

    if (data.retirementAge < PILIER3_CONSTANTS.MIN_RETIREMENT_AGE || data.retirementAge > PILIER3_CONSTANTS.MAX_RETIREMENT_AGE) {
      errors.push(`L'âge de retraite doit être entre ${PILIER3_CONSTANTS.MIN_RETIREMENT_AGE} et ${PILIER3_CONSTANTS.MAX_RETIREMENT_AGE} ans`);
    }

    if (data.retirementAge <= data.age) {
      errors.push('L\'âge de retraite doit être supérieur à l\'âge actuel');
    }

    if (data.monthlyContribution <= 0) {
      errors.push('La contribution mensuelle doit être positive');
    }

    if (data.monthlyContribution * 12 > PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A) {
      errors.push(`La contribution annuelle ne peut pas dépasser ${PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A} CHF pour le pilier 3a`);
    }

    if (data.expectedReturns < 0 || data.expectedReturns > 10) {
      errors.push('Le rendement attendu doit être entre 0% et 10%');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Formate un montant en CHF
   */
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
      maximumFractionDigits: 0
    }).format(amount);
  }

  /**
   * Calcule l'économie fiscale totale sur la période
   */
  static calculateTotalTaxSavings(data: SimulationDataPilier3): number {
    const yearsUntilRetirement = data.retirementAge - data.age;
    const annualContribution = data.monthlyContribution * 12;
    const pilier3aAmount = Math.min(annualContribution, PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A);
    const annualTaxSavings = pilier3aAmount * PILIER3_CONSTANTS.TAX_SAVINGS_RATE;
    return annualTaxSavings * yearsUntilRetirement;
  }

  /**
   * Calcule la répartition entre pilier 3a et 3b
   */
  static calculatePilier3a3bSplit(data: SimulationDataPilier3): { pilier3a: number; pilier3b: number } {
    const annualContribution = data.monthlyContribution * 12;
    const pilier3a = Math.min(annualContribution, PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A);
    const pilier3b = Math.max(0, annualContribution - PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A);
    
    return { pilier3a, pilier3b };
  }

  /**
   * Génère des recommandations basées sur la simulation
   */
  static generateRecommendations(data: SimulationDataPilier3, results: SimulationResults): string[] {
    const recommendations: string[] = [];
    const split = this.calculatePilier3a3bSplit(data);

    // Recommandation sur la contribution
    if (data.monthlyContribution * 12 < PILIER3_CONSTANTS.MAX_DEDUCTIBLE_3A) {
      const maxMonthly = PILIER3_CONSTANTS.MAX_MONTHLY_3A;
      recommendations.push(`Considérez augmenter votre contribution à ${this.formatCurrency(maxMonthly)}/mois pour maximiser l'avantage fiscal du pilier 3a`);
    } else if (split.pilier3b > 0) {
      recommendations.push(`Votre épargne est optimisée : ${this.formatCurrency(split.pilier3a)} en pilier 3a (déductible) et ${this.formatCurrency(split.pilier3b)} en pilier 3b`);
    }

    // Recommandation sur le rendement
    if (data.expectedReturns < 3) {
      recommendations.push('Un rendement plus élevé pourrait considérablement améliorer votre capital final. Consultez un conseiller pour des options d\'investissement adaptées');
    }

    // Recommandation sur la durée
    if (results.yearsUntilRetirement < 10) {
      recommendations.push('Avec moins de 10 ans avant la retraite, privilégiez la sécurité des investissements');
    } else {
      recommendations.push('Avec plus de 10 ans avant la retraite, vous pouvez considérer des investissements plus dynamiques');
    }

    // Recommandation sur l'économie fiscale
    const totalTaxSavings = this.calculateTotalTaxSavings(data);
    recommendations.push(`Votre économie fiscale totale sur la période sera de ${this.formatCurrency(totalTaxSavings)} (basée uniquement sur le pilier 3a)`);

    return recommendations;
  }
}
