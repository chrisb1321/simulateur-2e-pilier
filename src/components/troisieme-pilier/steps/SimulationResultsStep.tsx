import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  FormControlLabel, 
  Checkbox,
  Alert,
  CircularProgress,
  Fade,
  Slide,
  useTheme
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { SimulationDataPilier3, ContactInfo } from '../../../types/pilier3';
import { Pilier3Service } from '../../../services/pilier3Service';

interface SimulationResultsStepProps {
  data: SimulationDataPilier3;
  onUpdate: (updates: Partial<SimulationDataPilier3>) => void;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}

const SimulationResultsStep: React.FC<SimulationResultsStepProps> = ({
  data,
  onBack,
  onReset
}) => {
  const theme = useTheme();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [consentRGPD, setConsentRGPD] = useState(false);

  // Calcul des résultats
  const results = Pilier3Service.calculateResults(data);
  const recommendations = Pilier3Service.generateRecommendations(data, results);
  const pilierSplit = Pilier3Service.calculatePilier3a3bSplit(data);
  
  // Calcul de la répartition du capital final
  const yearsUntilRetirement = data.retirementAge - data.age;
  const expectedReturns = data.expectedReturns / 100;
  
  // Calcul correct avec intérêts composés pour chaque pilier
  let pilier3aFinal = 0;
  let pilier3bFinal = 0;
  
  // Simulation année par année pour chaque pilier
  for (let year = 1; year <= yearsUntilRetirement; year++) {
    // Ajouter les contributions annuelles
    pilier3aFinal += pilierSplit.pilier3a;
    pilier3bFinal += pilierSplit.pilier3b;
    
    // Appliquer les intérêts composés
    pilier3aFinal *= (1 + expectedReturns);
    pilier3bFinal *= (1 + expectedReturns);
  }
  
  // Arrondir les résultats
  pilier3aFinal = Math.round(pilier3aFinal);
  pilier3bFinal = Math.round(pilier3bFinal);
  
  // Vérification de cohérence : ajuster si nécessaire
  const totalCalculated = pilier3aFinal + pilier3bFinal;
  if (Math.abs(totalCalculated - results.finalAmount) > 100) {
    // Ajuster proportionnellement pour correspondre au capital total
    const ratio = results.finalAmount / totalCalculated;
    pilier3aFinal = Math.round(pilier3aFinal * ratio);
    pilier3bFinal = Math.round(pilier3bFinal * ratio);
  }

  // Préparation des données pour le graphique
  const chartData = results.projectionData.map(d => ({
    age: d.age,
    capital: d.savings,
    contribution: d.age === data.age ? 0 : (d.age - data.age) * data.monthlyContribution * 12
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentRGPD) return;

    setIsSubmitting(true);
    
    const webhookData = {
      informationsPersonnelles: {
        ...contactInfo,
        age: data.age,
        ageRetraite: data.retirementAge,
      },
      resultatsSimulation: {
        capitalProjete: results.projectionData,
        contributionMensuelle: data.monthlyContribution,
        rendementAttendu: data.expectedReturns,
        capitalFinal: results.finalAmount,
        economieFiscale: results.taxSavings
      },
      metadata: {
        dateSimulation: new Date().toISOString(),
        source: 'simulateur-web',
        consentementRGPD: true
      }
    };

    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/15007154/2c40qr9/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Résultats de votre simulation
      </Typography>

      {/* Cartes de résultats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card 
              sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                color: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(25, 118, 210, 0.3)',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <AccountBalanceIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                  Capital Final
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {Pilier3Service.formatCurrency(results.finalAmount)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  À l'âge de {data.retirementAge} ans
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card 
              sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                color: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(46, 125, 50, 0.3)',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <TrendingUpIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                  Économie Fiscale
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {Pilier3Service.formatCurrency(results.taxSavings)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Par an
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card 
              sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)',
                color: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(245, 124, 0, 0.3)',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <SavingsIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                  Contribution Mensuelle
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {Pilier3Service.formatCurrency(results.monthlyContribution)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Épargne mensuelle
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card 
              sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
                color: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(123, 31, 162, 0.3)',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <ScheduleIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                  Période
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {results.yearsUntilRetirement}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Années d'épargne
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Répartition du capital final */}
      {pilierSplit.pilier3b > 0 && (
        <Fade in={true} timeout={800}>
          <Card 
            sx={{ 
              mb: 4,
              background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
              border: '1px solid #e0e0e0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                Répartition du capital final
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Box 
                      sx={{ 
                        textAlign: 'center', 
                        p: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)',
                        border: '1px solid #4caf50'
                      }}
                    >
                      <Typography variant="h6" color="success.main" gutterBottom sx={{ fontWeight: 600 }}>
                        Pilier 3a (Déductible)
                      </Typography>
                      <Typography variant="h3" fontWeight={700} color="success.main" sx={{ mb: 1 }}>
                        {Pilier3Service.formatCurrency(pilier3aFinal)}
                      </Typography>
                      <Typography variant="body1" color="success.dark" sx={{ mb: 2, fontWeight: 500 }}>
                        {Math.round((pilier3aFinal / results.finalAmount) * 100)}% du capital total
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Contribution : {Pilier3Service.formatCurrency(pilierSplit.pilier3a)}/an
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Box 
                      sx={{ 
                        textAlign: 'center', 
                        p: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                        border: '1px solid #ff9800'
                      }}
                    >
                      <Typography variant="h6" color="warning.main" gutterBottom sx={{ fontWeight: 600 }}>
                        Pilier 3b (Non déductible)
                      </Typography>
                      <Typography variant="h3" fontWeight={700} color="warning.main" sx={{ mb: 1 }}>
                        {Pilier3Service.formatCurrency(pilier3bFinal)}
                      </Typography>
                      <Typography variant="body1" color="warning.dark" sx={{ mb: 2, fontWeight: 500 }}>
                        {Math.round((pilier3bFinal / results.finalAmount) * 100)}% du capital total
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Contribution : {Pilier3Service.formatCurrency(pilierSplit.pilier3b)}/an
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
              
              {/* Barre de progression visuelle améliorée */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                  Répartition visuelle
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    height: 32, 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(pilier3aFinal / results.finalAmount) * 100}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{ height: '100%' }}
                  >
                    <Box 
                      sx={{ 
                        backgroundColor: 'success.main', 
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)'
                      }}
                    >
                      <Typography variant="body2" color="white" fontWeight={700}>
                        {Math.round((pilier3aFinal / results.finalAmount) * 100)}%
                      </Typography>
                    </Box>
                  </motion.div>
                  {pilier3bFinal > 0 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(pilier3bFinal / results.finalAmount) * 100}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                      style={{ height: '100%' }}
                    >
                      <Box 
                        sx={{ 
                          backgroundColor: 'warning.main', 
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)'
                        }}
                      >
                        <Typography variant="body2" color="white" fontWeight={700}>
                          {Math.round((pilier3bFinal / results.finalAmount) * 100)}%
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      )}

      {/* Graphique d'évolution */}
      <Slide direction="up" in={true} timeout={1000}>
        <Card 
          sx={{ 
            mb: 4,
            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
            border: '1px solid #e0e0e0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Évolution du capital
            </Typography>
            <Box sx={{ height: 400, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1976d2" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="age" 
                    stroke="#666"
                    fontSize={12}
                    tick={{ fill: '#666' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => Pilier3Service.formatCurrency(value)} 
                    stroke="#666"
                    fontSize={12}
                    tick={{ fill: '#666' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [Pilier3Service.formatCurrency(value), 'Capital']}
                    labelFormatter={(label) => `Âge: ${label} ans`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="capital"
                    stroke="#1976d2"
                    strokeWidth={3}
                    fill="url(#colorCapital)"
                    dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#1976d2', strokeWidth: 2, fill: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Slide>

      {/* Recommandations */}
      <Fade in={true} timeout={1200}>
        <Card 
          sx={{ 
            mb: 4,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
            border: '1px solid #e0e0e0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Recommandations personnalisées
            </Typography>
            <Grid container spacing={2}>
              {recommendations.map((recommendation, index) => (
                <Grid item xs={12} key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Box 
                      sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {recommendation}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Fade>

      {/* Formulaire de contact */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recevez vos offres 3ème pilier par email
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  value={contactInfo.prenom}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, prenom: e.target.value }))}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  value={contactInfo.nom}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, nom: e.target.value }))}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date de naissance"
                  type="date"
                  value={contactInfo.dateNaissance}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, dateNaissance: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  type="tel"
                  value={contactInfo.telephone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, telephone: e.target.value }))}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </Grid>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  checked={consentRGPD}
                  onChange={(e) => setConsentRGPD(e.target.checked)}
                  required
                />
              }
              label="J'accepte que mes données soient utilisées pour recevoir les résultats de ma simulation et être contacté à ce sujet."
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button onClick={onBack} variant="outlined">
                Retour
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={isSubmitting || !consentRGPD}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Recevoir mes résultats'}
              </Button>
            </Box>
          </form>

          {submitStatus === 'success' && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Vos résultats ont été envoyés avec succès !
            </Alert>
          )}
          {submitStatus === 'error' && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Une erreur est survenue. Veuillez réessayer.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Bouton pour recommencer */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button onClick={onReset} variant="outlined">
          Nouvelle simulation
        </Button>
      </Box>
    </Box>
  );
};

export default SimulationResultsStep;
