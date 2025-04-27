import { useState } from 'react';
import { Box, Paper, Typography, TextField, MenuItem, Button, Grid, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomButton from './CustomButton';
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import InfoIcon from '@mui/icons-material/Info';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const AGE_RETRAITE = 65;
const RENTE_AVS_MAX = 30240; // CHF/an (2025) - 2'520 CHF/mois pour 44 années de cotisation
const ANNEES_COTISATION_PLEINE = 44;
const SALAIRE_MOYEN_MAX = 88200; // CHF/an (2024)

const TAUX_CONVERSION_LPP_DEFAUT = 0.068; // 6.8%

const SITUATIONS = [
  { value: 'celibataire', label: 'Célibataire' },
  { value: 'marie', label: 'Marié(e)' },
  { value: 'enfant', label: 'Avec enfant(s) à charge' },
];

export default function RenteEtTroisiemePillier() {
  const [age, setAge] = useState(40);
  const [ageRetraite, setAgeRetraite] = useState(65);
  const [salaireMoyen, setSalaireMoyen] = useState(70000);
  const [anneesCotAVS, setAnneesCotAVS] = useState(20);
  const [capitalLPP, setCapitalLPP] = useState(200000);
  const [tauxConversion, setTauxConversion] = useState(TAUX_CONVERSION_LPP_DEFAUT);
  const [situation, setSituation] = useState('celibataire');
  const [revenuSouhaite, setRevenuSouhaite] = useState(50000);
  const [resultat, setResultat] = useState<any>(null);

  const theme = useTheme();
  const TAUXS = Array.from({length: 21}, (_, i) => (5.0 + i * 0.1));

  const calculerRentes = () => {
    // Calcul AVS
    const tauxCotisation = 1; // Toujours 44 années de cotisation
    const facteurSalaire = Math.min(salaireMoyen / SALAIRE_MOYEN_MAX, 1);
    let renteAVS = RENTE_AVS_MAX * tauxCotisation * facteurSalaire;
    if (situation === 'marie') renteAVS = Math.min(renteAVS, RENTE_AVS_MAX * 0.75); // Plafond couple

    // Calcul LPP
    const renteLPP = capitalLPP * tauxConversion;

    // Total
    const totalRentes = renteAVS + renteLPP;
    const manque = Math.max(0, revenuSouhaite - totalRentes);

    setResultat({ renteAVS, renteLPP, totalRentes, manque });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Calcul détaillé de votre rente AVS, LPP
      </Typography>
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Âge actuel" type="number" value={age} onChange={e => setAge(Number(e.target.value))} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Âge de la retraite" type="number" value={ageRetraite} onChange={e => setAgeRetraite(Number(e.target.value))} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Salaire annuel moyen (CHF)" type="number" value={salaireMoyen} onChange={e => setSalaireMoyen(Number(e.target.value))} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Capital LPP estimé à la retraite (CHF)" type="number" value={capitalLPP} onChange={e => setCapitalLPP(Number(e.target.value))} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField 
                label="Taux de conversion LPP (%)" 
                type="number" 
                value={
                  tauxConversion === null || tauxConversion === undefined || isNaN(tauxConversion) || tauxConversion === 0
                    ? '6,8'
                    : (tauxConversion * 100).toLocaleString('fr-CH', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
                }
                placeholder="6,8"
                onChange={e => {
                  let val = e.target.value.replace(',', '.');
                  if (val === '' || isNaN(Number(val))) {
                    setTauxConversion(0.068);
                  } else {
                    setTauxConversion(Math.round(parseFloat(val) * 10) / 1000);
                  }
                }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span style={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '1.1rem' }}>%</span>
                      <TextField
                        select
                        value={(tauxConversion * 100).toFixed(1)}
                        onChange={e => setTauxConversion(Number(e.target.value.replace(',', '.')) / 100)}
                        variant="standard"
                        sx={{ minWidth: 60, ml: 1, '& .MuiInputBase-input': { color: theme.palette.text.primary, fontWeight: 400, fontSize: '1.1rem', textAlign: 'right' } }}
                        inputProps={{ style: { padding: 0 } }}
                      >
                        {TAUXS.map(val => (
                          <MenuItem key={val.toFixed(1)} value={val.toFixed(1)} style={{ color: theme.palette.text.primary, fontWeight: 400, fontSize: '1.1rem' }}>{val.toLocaleString('fr-CH', { minimumFractionDigits: 1 })}</MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  )
                }}
                inputProps={{
                  style: { color: theme.palette.text.primary, fontWeight: 600, fontSize: '1.1rem' }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select label="Situation familiale" value={situation} onChange={e => setSituation(e.target.value)} fullWidth>
              {SITUATIONS.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Revenu souhaité à la retraite (CHF/an)" type="number" value={revenuSouhaite} onChange={e => setRevenuSouhaite(Number(e.target.value))} fullWidth />
          </Grid>
        </Grid>
        <CustomButton variant="contained" color="primary" sx={{ mt: 3 }} onClick={calculerRentes}>
          CALCULER MA RENTE
        </CustomButton>
      </Box>
      {resultat && (
        <Box sx={{ mt: 4, p: 3, borderRadius: 2, background: '#f5fafd', boxShadow: 1 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Résumé visuel de votre prévoyance (en CHF/mois)
          </Typography>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[
              { name: 'AVS', value: Math.round(resultat.renteAVS / 12), fill: '#1976d2' },
              { name: 'LPP', value: Math.round(resultat.renteLPP / 12), fill: '#43a047' },
              { name: 'Total', value: Math.round(resultat.totalRentes / 12), fill: '#8e24aa' },
              { name: 'Objectif', value: Math.round(revenuSouhaite / 12), fill: '#ffb300' },
            ]} layout="vertical" margin={{ left: 40, right: 40 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" />
              <Tooltip formatter={(v: number) => `${v.toLocaleString('fr-CH')} CHF/mois`} />
              <Bar dataKey="value" isAnimationActive>
                <LabelList dataKey="value" position="right" formatter={(v: number) => `${v.toLocaleString('fr-CH')} CHF/mois`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <Box sx={{ mt: 3 }}>
            <Typography>
              <b>Rente AVS :</b> <span style={{ color: '#1976d2', fontWeight: 700 }}>{Math.round(resultat.renteAVS / 12).toLocaleString('fr-CH')} CHF/mois</span>
            </Typography>
            <Typography>
              <b>Rente LPP :</b> <span style={{ color: '#43a047', fontWeight: 700 }}>{Math.round(resultat.renteLPP / 12).toLocaleString('fr-CH')} CHF/mois</span>
            </Typography>
            <Typography>
              <b>Total rentes :</b> <span style={{ color: '#8e24aa', fontWeight: 700 }}>{Math.round(resultat.totalRentes / 12).toLocaleString('fr-CH')} CHF/mois</span>
            </Typography>
            <Typography>
              <b>Objectif :</b> <span style={{ color: '#ffb300', fontWeight: 700 }}>{Math.round(revenuSouhaite / 12).toLocaleString('fr-CH')} CHF/mois</span>
            </Typography>
          </Box>
          {resultat.manque > 0 ? (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <b>Il vous manque {Math.round(resultat.manque / 12).toLocaleString('fr-CH')} CHF/mois</b> pour atteindre votre objectif.
              <br />
              <b>Un 3e pilier pourrait vous permettre de combler ce manque.</b>
            </Alert>
          ) : (
            <Alert severity="success" sx={{ mt: 2 }}>
              <b>Félicitations, votre prévoyance couvre votre objectif de revenu à la retraite !</b>
            </Alert>
          )}
        </Box>
      )}
    </Paper>
  );
} 