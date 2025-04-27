import { useState } from 'react';
import { Box, Paper, Typography, TextField, MenuItem, Button, Grid, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomButton from './CustomButton';
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';

const AGE_RETRAITE = 65;
const RENTE_AVS_MAX = 29680; // CHF/an (2024)
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
    const tauxCotisation = Math.min(anneesCotAVS / ANNEES_COTISATION_PLEINE, 1);
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
            <TextField label="Années de cotisation AVS" type="number" value={anneesCotAVS} onChange={e => setAnneesCotAVS(Number(e.target.value))} fullWidth />
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
        <Box sx={{ mt: 4, p: 3, borderRadius: 2, background: '#fafbfc', boxShadow: 1 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Résultats détaillés
          </Typography>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={7}>
              <Typography>Rente AVS estimée :</Typography>
            </Grid>
            <Grid item xs={5} sx={{ textAlign: 'right' }}>
              <Typography fontWeight={700} color="primary">
                {resultat.renteAVS.toLocaleString('fr-CH', { style: 'currency', currency: 'CHF', minimumFractionDigits: 0 })} / an
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography>Rente LPP estimée :</Typography>
            </Grid>
            <Grid item xs={5} sx={{ textAlign: 'right' }}>
              <Typography fontWeight={700} color="primary">
                {resultat.renteLPP.toLocaleString('fr-CH', { style: 'currency', currency: 'CHF', minimumFractionDigits: 0 })} / an
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography>Total rentes 1er + 2e pilier :</Typography>
            </Grid>
            <Grid item xs={5} sx={{ textAlign: 'right' }}>
              <Typography fontWeight={700} color="secondary">
                {resultat.totalRentes.toLocaleString('fr-CH', { style: 'currency', currency: 'CHF', minimumFractionDigits: 0 })} / an
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography>Revenu souhaité :</Typography>
            </Grid>
            <Grid item xs={5} sx={{ textAlign: 'right' }}>
              <Typography fontWeight={700}>
                {revenuSouhaite.toLocaleString('fr-CH', { style: 'currency', currency: 'CHF', minimumFractionDigits: 0 })} / an
              </Typography>
            </Grid>
          </Grid>
          {resultat.manque > 0 ? (
            <Alert
              icon={<WarningAmberRounded color="warning" />}
              severity="warning"
              sx={{
                mt: 2,
                background: '#fff8e1',
                color: '#8d6e63',
                fontWeight: 500,
                border: '1px solid #ffe0b2'
              }}
            >
              <Typography component="span" fontWeight={700} color="error.main">
                Il vous manque {resultat.manque.toLocaleString('fr-CH', { style: 'currency', currency: 'CHF', minimumFractionDigits: 0 })} par an
              </Typography>
              {" pour atteindre votre objectif."}
              <br />
              <Typography component="span" fontWeight={700}>
                Un <b>3e pilier</b> pourrait vous permettre de combler ce manque.
              </Typography>
            </Alert>
          ) : (
            <Alert
              icon={<CheckCircleRounded color="success" />}
              severity="success"
              sx={{
                mt: 2,
                background: '#e8f5e9',
                color: '#388e3c',
                fontWeight: 500,
                border: '1px solid #c8e6c9'
              }}
            >
              <Typography component="span" fontWeight={700} color="success.main">
                Félicitations, votre prévoyance couvre votre objectif de revenu à la retraite !
              </Typography>
            </Alert>
          )}
        </Box>
      )}
    </Paper>
  );
} 