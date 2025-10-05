import { useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, CardActions, Button, Chip, Alert, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomButton from '../CustomButton';
import { AssuranceComplementaireAmbulatoire, CategorieAmbulatoire, DoublonVerification } from '../../types/assurancesComplementaires';
import { CATEGORIES_AMBULATOIRES, ASSURANCES_AMBULATOIRES } from '../../data/assurancesComplementairesAmbulatoires';

export default function ComparateurAssurancesComplementaires() {
  const [categorieSelectionnee, setCategorieSelectionnee] = useState<CategorieAmbulatoire>('medecine_generale');
  const [assuranceSelectionnee, setAssuranceSelectionnee] = useState<AssuranceComplementaireAmbulatoire | null>(null);
  const [doublonsActifs, setDoublonsActifs] = useState<DoublonVerification[]>([]);
  const [doublonsExpanded, setDoublonsExpanded] = useState<{ [key: string]: boolean }>({});

  const theme = useTheme();

  const assurancesDeLaCategorie = ASSURANCES_AMBULATOIRES.filter(
    assurance => assurance.categorie === categorieSelectionnee
  );

  const categorieInfo = CATEGORIES_AMBULATOIRES.find(
    cat => cat.id === categorieSelectionnee
  );

  const handleAssuranceClick = (assurance: AssuranceComplementaireAmbulatoire) => {
    setAssuranceSelectionnee(assurance);
    setDoublonsActifs(assurance.doublonsAVerifier);
  };

  const toggleDoublonExpanded = (doublonId: string) => {
    setDoublonsExpanded(prev => ({
      ...prev,
      [doublonId]: !prev[doublonId]
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'haute': return theme.palette.error.main;
      case 'moyenne': return theme.palette.warning.main;
      case 'basse': return theme.palette.info.main;
      default: return theme.palette.text.secondary;
    }
  };

  const getPrioriteIcon = (priorite: string) => {
    switch (priorite) {
      case 'haute': return <WarningIcon />;
      case 'moyenne': return <InfoIcon />;
      case 'basse': return <CheckCircleIcon />;
      default: return <InfoIcon />;
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Assurances Complémentaires Ambulatoires
      </Typography>

      {/* Navigation par catégories */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Choisissez une catégorie d'assurance :
        </Typography>
        <Grid container spacing={2}>
          {CATEGORIES_AMBULATOIRES.map((categorie) => (
            <Grid item xs={12} sm={6} md={4} key={categorie.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: categorieSelectionnee === categorie.id ? `2px solid ${categorie.couleur}` : '1px solid #e0e0e0',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  }
                }}
                onClick={() => setCategorieSelectionnee(categorie.id)}
              >
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: `${categorie.couleur}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>🏥</span>
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    {categorie.nom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {categorie.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Liste des assurances de la catégorie */}
      {categorieInfo && (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ color: categorieInfo.couleur }}>
            {categorieInfo.nom}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {categorieInfo.description}
          </Typography>
          
          <Grid container spacing={3}>
            {assurancesDeLaCategorie.map((assurance) => (
              <Grid item xs={12} md={6} key={assurance.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: assuranceSelectionnee?.id === assurance.id ? `2px solid ${categorieInfo.couleur}` : '1px solid #e0e0e0',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    }
                  }}
                  onClick={() => handleAssuranceClick(assurance)}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {assurance.nom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {assurance.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" color="primary" fontWeight={700}>
                        {formatCurrency(assurance.prime)}/mois
                      </Typography>
                      <Chip
                        label={`${assurance.couverture.valeur}${assurance.couverture.type === 'pourcentage' ? '%' : ' CHF'}`}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </Box>

                    {assurance.couverture.plafond && (
                      <Typography variant="body2" color="text.secondary">
                        Plafond annuel : {formatCurrency(assurance.couverture.plafond)}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Section vérification des doublons */}
      {assuranceSelectionnee && doublonsActifs.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="warning" />
            Vérifications importantes pour : {assuranceSelectionnee.nom}
          </Typography>
          
          {doublonsActifs.map((doublon) => (
            <Box key={doublon.id} sx={{ mb: 3 }}>
              <Alert
                severity={doublon.priorite === 'haute' ? 'error' : doublon.priorite === 'moyenne' ? 'warning' : 'info'}
                sx={{ mb: 2 }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => toggleDoublonExpanded(doublon.id)}
                    endIcon={doublonsExpanded[doublon.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  >
                    {doublonsExpanded[doublon.id] ? 'Moins' : 'Plus'}
                  </Button>
                }
              >
                <Typography variant="h6" fontWeight={600}>
                  {doublon.titre}
                </Typography>
                <Typography variant="body2">
                  {doublon.description}
                </Typography>
              </Alert>

              <Collapse in={doublonsExpanded[doublon.id]}>
                <Box sx={{ pl: 2, borderLeft: `3px solid ${getPrioriteColor(doublon.priorite)}` }}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Questions à vérifier :
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {doublon.questionsAVerifier.map((question, index) => (
                      <Box component="li" key={index} sx={{ mb: 1 }}>
                        <Typography variant="body2">{question}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    Conseils :
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {doublon.conseils.map((conseil, index) => (
                      <Box component="li" key={index} sx={{ mb: 1 }}>
                        <Typography variant="body2">{conseil}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}
