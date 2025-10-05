import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  Collapse,
  IconButton,
  Button
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Info as InfoIcon,
  Payment as PaymentIcon,
  TrendingUp as TrendingUpIcon,
  LocalHospital as LocalHospitalIcon,
  AttachMoney as MoneyIcon,
  Recommend as RecommendIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import BackButton from '../BackButton';

interface LamalDetailsProps {
  onBack: () => void;
  onNext?: () => void;
}

const LamalDetails: React.FC<LamalDetailsProps> = ({ onBack, onNext }) => {
  const [selectedDeductible, setSelectedDeductible] = useState<string>('300');
  const [selectedChildDeductible, setSelectedChildDeductible] = useState<string>('100');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    payment: true,
    deductibles: true,
    coPayment: true,
    healthcare: true,
    benefits: true,
    childrenDeductibles: false,
    adultDeductibles: false,
    recommendation: false
  });

  const deductibles = [
    { 
      amount: '300', 
      description: 'Prime d\'assurance la plus élevée', 
      icon: <TrendingUpIcon sx={{ color: 'error.main' }} />,
      color: 'error' as const,
      premium: ''
    },
    { 
      amount: '500', 
      description: '', 
      icon: null,
      color: 'default' as const,
      premium: 'Moyenne'
    },
    { 
      amount: '1000', 
      description: '', 
      icon: null,
      color: 'default' as const,
      premium: 'Moyenne'
    },
    { 
      amount: '1500', 
      description: '', 
      icon: null,
      color: 'default' as const,
      premium: 'Moyenne'
    },
    { 
      amount: '2000', 
      description: '', 
      icon: null,
      color: 'default' as const,
      premium: 'Basse'
    },
    { 
      amount: '2500', 
      description: 'Prime d\'assurance la plus basse', 
      icon: <TrendingUpIcon sx={{ color: 'success.main' }} />,
      color: 'success' as const,
      premium: ''
    }
  ];

  const deductiblesChildren = [
    { 
      amount: '0', 
      description: 'Prime d\'assurance la plus élevée', 
      icon: <TrendingUpIcon sx={{ color: 'error.main' }} />,
      color: 'error' as const,
      premium: ''
    },
    { 
      amount: '100', 
      description: '', 
      icon: null,
      color: 'default' as const,
      premium: 'Moyenne'
    },
    { 
      amount: '200', 
      description: '', 
      icon: null,
      color: 'default' as const,
      premium: 'Moyenne'
    },
    { 
      amount: '300', 
      description: '', 
      icon: null,
      color: 'default' as const,
      premium: 'Moyenne'
    },
    { 
      amount: '400', 
      description: '', 
      icon: null,
      color: 'default' as const,
      premium: 'Basse'
    },
    { 
      amount: '600', 
      description: 'Prime d\'assurance la plus basse', 
      icon: <TrendingUpIcon sx={{ color: 'success.main' }} />,
      color: 'success' as const,
      premium: ''
    }
  ];

  const healthcareSystems = [
    { 
      name: 'Basis', 
      description: 'Libre choix du médecin',
      icon: <LocalHospitalIcon />,
      popularity: 'Très populaire',
      restrictions: 'Aucune'
    },
    { 
      name: 'Callmed', 
      description: 'Appel téléphonique avant de consulter (sauf urgence)',
      icon: <InfoIcon />,
      popularity: 'Populaire',
      restrictions: 'Appel obligatoire'
    },
    { 
      name: 'Réseaux de soins', 
      description: 'Réseau de soins de la compagnie d\'assurance',
      icon: <LocalHospitalIcon />,
      popularity: 'Moyenne',
      restrictions: 'Réseau limité'
    },
    { 
      name: 'Médecin de famille', 
      description: 'Consulter le médecin avant de voir un spécialiste',
      icon: <LocalHospitalIcon />,
      popularity: 'Populaire',
      restrictions: 'Médecin de famille obligatoire'
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      {/* En-tête avec bouton retour */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <BackButton onClick={onBack} sx={{ mr: 2 }} />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 600,
              color: '#1976d2',
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Assurance de base LAMal - Détails
          </Typography>
        </Box>
      </motion.div>

      {/* Section Méthodes de paiement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 4, 
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 3,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PaymentIcon sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Méthodes de paiement
              </Typography>
            </Box>
            <IconButton 
              onClick={() => toggleSection('payment')}
              sx={{ color: 'white' }}
            >
              {expandedSections.payment ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          
          <Collapse in={expandedSections.payment}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: '100%',
                      border: '2px solid #e3f2fd',
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: '#1976d2',
                        boxShadow: '0 4px 12px rgba(25,118,210,0.15)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ 
                          p: 1, 
                          borderRadius: '50%', 
                          backgroundColor: 'rgba(25,118,210,0.1)',
                          color: '#1976d2'
                        }}>
                          <MoneyIcon />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                          Tiers Garant
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        Le patient règle lui-même la facture du médecin ou d'un autre fournisseur de prestations, 
                        puis envoie le justificatif de remboursement à l'assurance.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: '100%',
                      border: '2px solid #e3f2fd',
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: '#1976d2',
                        boxShadow: '0 4px 12px rgba(25,118,210,0.15)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ 
                          p: 1, 
                          borderRadius: '50%', 
                          backgroundColor: 'rgba(76,175,80,0.1)',
                          color: '#4caf50'
                        }}>
                          <PaymentIcon />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#4caf50' }}>
                          Tiers Payant
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        Le patient ne règle pas directement la facture du médecin ou d'un autre fournisseur de prestations, 
                        la facture est envoyé directement à la caisse.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Paper>
      </motion.div>

      {/* Section Franchises */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 4, 
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #fff8f0 0%, #ffffff 100%)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 3,
            background: 'linear-gradient(45deg, #ff9800 30%, #ffc107 90%)',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUpIcon sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Franchises
              </Typography>
            </Box>
            <IconButton 
              onClick={() => toggleSection('deductibles')}
              sx={{ color: 'white' }}
            >
              {expandedSections.deductibles ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          
          <Collapse in={expandedSections.deductibles}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Correspond au montant des prestations que l'assuré doit payer avant de pouvoir être remboursé.
              </Typography>
              
              {/* Franchises pour 0-18 ans */}
              <Box sx={{ mb: 4 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,152,0,0.1)'
                    },
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => toggleSection('childrenDeductibles')}
                >
                  <Box sx={{ 
                    p: 0.5, 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(255,152,0,0.2)',
                    color: '#ff9800'
                  }}>
                    <TrendingUpIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#ff9800',
                    flexGrow: 1
                  }}>
                    Franchises pour les 0-18 ans
                  </Typography>
                  <IconButton 
                    size="small"
                    sx={{ color: '#ff9800' }}
                  >
                    {expandedSections.childrenDeductibles ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                
                <Collapse in={expandedSections.childrenDeductibles}>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {deductiblesChildren.map((deductible, index) => (
                      <Grid item xs={12} sm={6} md={4} key={`child-${index}`}>
                        <Card 
                          variant="outlined"
                          sx={{ 
                            cursor: 'pointer',
                            border: selectedChildDeductible === deductible.amount ? '2px solid #1976d2' : '1px solid #e0e0e0',
                            borderRadius: 2,
                            '&:hover': {
                              borderColor: '#1976d2',
                              boxShadow: '0 4px 12px rgba(25,118,210,0.15)',
                              transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease',
                            backgroundColor: selectedChildDeductible === deductible.amount ? 'rgba(25,118,210,0.04)' : 'white'
                          }}
                          onClick={() => setSelectedChildDeductible(deductible.amount)}
                        >
                          <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            {deductible.icon && (
                              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                                {deductible.icon}
                              </Box>
                            )}
                            <Chip 
                              label={`${deductible.amount} CHF`} 
                              variant={selectedChildDeductible === deductible.amount ? "filled" : "outlined"}
                              color={deductible.color}
                              size="medium"
                              sx={{ mb: 1, fontWeight: 600 }}
                            />
                          {deductible.premium && (
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              Prime {deductible.premium}
                            </Typography>
                          )}
                            {deductible.description && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.8rem' }}>
                                {deductible.description}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Collapse>
              </Box>

              {/* Franchises pour plus de 18 ans */}
              <Box sx={{ mb: 4 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,152,0,0.1)'
                    },
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => toggleSection('adultDeductibles')}
                >
                  <Box sx={{ 
                    p: 0.5, 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(255,152,0,0.2)',
                    color: '#ff9800'
                  }}>
                    <TrendingUpIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#ff9800',
                    flexGrow: 1
                  }}>
                    Franchises pour les plus de 18 ans
                  </Typography>
                  <IconButton 
                    size="small"
                    sx={{ color: '#ff9800' }}
                  >
                    {expandedSections.adultDeductibles ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                
                <Collapse in={expandedSections.adultDeductibles}>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {deductibles.map((deductible, index) => (
                      <Grid item xs={12} sm={6} md={4} key={`adult-${index}`}>
                        <Card 
                          variant="outlined"
                          sx={{ 
                            cursor: 'pointer',
                            border: selectedDeductible === deductible.amount ? '2px solid #1976d2' : '1px solid #e0e0e0',
                            borderRadius: 2,
                            '&:hover': {
                              borderColor: '#1976d2',
                              boxShadow: '0 4px 12px rgba(25,118,210,0.15)',
                              transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease',
                            backgroundColor: selectedDeductible === deductible.amount ? 'rgba(25,118,210,0.04)' : 'white'
                          }}
                          onClick={() => setSelectedDeductible(deductible.amount)}
                        >
                          <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            {deductible.icon && (
                              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                                {deductible.icon}
                              </Box>
                            )}
                            <Chip 
                              label={`${deductible.amount} CHF`} 
                              variant={selectedDeductible === deductible.amount ? "filled" : "outlined"}
                              color={deductible.color}
                              size="medium"
                              sx={{ mb: 1, fontWeight: 600 }}
                            />
                          {deductible.premium && (
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              Prime {deductible.premium}
                            </Typography>
                          )}
                            {deductible.description && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.8rem' }}>
                                {deductible.description}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Collapse>
              </Box>
              
              {/* Recommandation */}
              <Box sx={{ mt: 4 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    cursor: 'pointer',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,152,0,0.08)',
                    border: '1px solid rgba(255,152,0,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,152,0,0.12)'
                    },
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => toggleSection('recommendation')}
                >
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(255,152,0,0.2)',
                    color: '#ff9800',
                    flexShrink: 0
                  }}>
                    <RecommendIcon />
                  </Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#ff9800',
                    flexGrow: 1
                  }}>
                    Notre recommandation
                  </Typography>
                  <IconButton 
                    size="small"
                    sx={{ color: '#ff9800' }}
                  >
                    {expandedSections.recommendation ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                
                <Collapse in={expandedSections.recommendation}>
                  <Box sx={{ 
                    mt: 2,
                    p: 3,
                    backgroundColor: 'rgba(255,152,0,0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(255,152,0,0.15)'
                  }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      Nous recommandons une franchise <strong>minimale ou maximale</strong>. 
                      Le seuil de rentabilité en moyenne pour la franchise minimale se situe au-delà de 
                      <strong style={{ color: '#ff9800' }}> 1700 CHF de frais annuel</strong>. 
                      En dessous de ce montant, la franchise à 2500 CHF reste plus avantageuse.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        icon={<TrendingDownIcon sx={{ color: '#4caf50 !important' }} />}
                        label="< 1700 CHF/an → Franchise 2500 CHF" 
                        size="small" 
                        variant="outlined" 
                        sx={{ 
                          borderColor: '#4caf50',
                          color: '#4caf50',
                          '& .MuiChip-icon': { color: '#4caf50' }
                        }}
                      />
                      <Chip 
                        icon={<TrendingUpIcon sx={{ color: '#f44336 !important' }} />}
                        label="> 1700 CHF/an → Franchise 300 CHF" 
                        size="small" 
                        variant="outlined" 
                        sx={{ 
                          borderColor: '#f44336',
                          color: '#f44336',
                          '& .MuiChip-icon': { color: '#f44336' }
                        }}
                      />
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            </CardContent>
          </Collapse>
        </Paper>
      </motion.div>

      {/* Section Quote-part */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 4, 
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 3,
            background: 'linear-gradient(45deg, #9c27b0 30%, #e91e63 90%)',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MoneyIcon sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Quote-part 10%
              </Typography>
            </Box>
            <IconButton 
              onClick={() => toggleSection('coPayment')}
              sx={{ color: 'white' }}
            >
              {expandedSections.coPayment ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          
          <Collapse in={expandedSections.coPayment}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ 
                p: 3, 
                backgroundColor: 'rgba(156,39,176,0.05)', 
                borderRadius: 2,
                border: '1px solid rgba(156,39,176,0.1)'
              }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Après déduction de la franchise, il faut encore déduire 10% de quote-part. 
                  Celui-ci est plafonné à <strong style={{ color: '#9c27b0' }}>700 CHF par an</strong>.
                </Typography>
                
                <Box sx={{ 
                  mt: 2,
                  p: 2,
                  backgroundColor: 'rgba(156,39,176,0.08)',
                  borderRadius: 1,
                  border: '1px solid rgba(156,39,176,0.15)'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Note importante :</strong> Pour les enfants de moins de 18 ans, 
                    le quote-part est plafonné à <strong style={{ color: '#9c27b0' }}>350 CHF par an</strong>.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Collapse>
        </Paper>
      </motion.div>

      {/* Section Système de soins */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 4, 
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f0fff4 0%, #ffffff 100%)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 3,
            background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalHospitalIcon sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Système de soins
              </Typography>
            </Box>
            <IconButton 
              onClick={() => toggleSection('healthcare')}
              sx={{ color: 'white' }}
            >
              {expandedSections.healthcare ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          
          <Collapse in={expandedSections.healthcare}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                {healthcareSystems.map((system, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%',
                        border: '1px solid #e8f5e8',
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#4caf50',
                          boxShadow: '0 4px 12px rgba(76,175,80,0.15)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ 
                            p: 1, 
                            borderRadius: '50%', 
                            backgroundColor: 'rgba(76,175,80,0.1)',
                            color: '#4caf50'
                          }}>
                            {system.icon}
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#4caf50' }}>
                            {system.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {system.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            label={system.popularity} 
                            size="small" 
                            variant="outlined" 
                            color="success"
                          />
                          <Chip 
                            label={system.restrictions} 
                            size="small" 
                            variant="outlined" 
                            color="default"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Collapse>
        </Paper>
      </motion.div>

      {/* Section Lacunes de l'assurance obligatoire */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 4, 
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #ffebee 0%, #ffffff 100%)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 3,
            background: 'linear-gradient(45deg, #f44336 30%, #ff5722 90%)',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <WarningIcon sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Lacunes de l'assurance obligatoire
              </Typography>
            </Box>
            <IconButton 
              onClick={() => toggleSection('benefits')}
              sx={{ color: 'white' }}
            >
              {expandedSections.benefits ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          
          <Collapse in={expandedSections.benefits}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                L'assurance de base ne couvre pas tous les soins. Voici les principales lacunes que vous pouvez combler avec une assurance complémentaire.
              </Typography>
              
              <Grid container spacing={2}>
                {[
                  'Soins dentaires et orthodontie',
                  'Chambre privée ou semi-privée',
                  'Médecines alternatives',
                  'Optique et lentilles',
                  'Traitement à l\'étranger',
                  'Choix du spécialiste dans toute la Suisse',
                  'Promotion de la santé',
                  'Prévention',
                  'Médicaments',
                  'Moyens et appareils auxiliaires',
                  'Protection à l\'étranger'
                ].map((lacune, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 2,
                      backgroundColor: 'rgba(244,67,54,0.05)',
                      borderRadius: 2,
                      border: '1px solid rgba(244,67,54,0.1)'
                    }}>
                      <WarningIcon sx={{ color: '#f44336', mr: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        {lacune}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              {/* Bouton suivant */}
              <Box sx={{ 
                mt: 4, 
                textAlign: 'center'
              }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(25,118,210,0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => onNext ? onNext() : window.location.href = '/assurances-complementaires'}
                >
                  Suivant
                </Button>
              </Box>
            </CardContent>
          </Collapse>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default LamalDetails;
