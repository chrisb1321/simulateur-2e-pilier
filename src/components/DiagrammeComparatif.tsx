import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from 'recharts';
import { Paper, Typography, Box, Divider, Grid, keyframes, Button } from '@mui/material';
import { useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

interface DiagrammeComparatifProps {
  capitalInitial: number;
  interetsCumules: number;
  fraisEntreeMarche: number;
  fraisEntreeSFA: number;
  profilInvestissement: string;
}

export default function DiagrammeComparatif({ 
  capitalInitial,
  interetsCumules, 
  fraisEntreeMarche,
  fraisEntreeSFA,
  profilInvestissement
}: DiagrammeComparatifProps) {
  const theme = useTheme();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number, total: number) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / total);
  };

  const total = capitalInitial + interetsCumules;
  const totalAvecFraisSFA = total - fraisEntreeSFA;

  const data = [
    { name: 'Capital initial', value: capitalInitial, color: theme.palette.primary.main },
    { name: 'Intérêts cumulés', value: interetsCumules, color: theme.palette.success.main },
    { name: 'Droits d\'entrée (SFA)', value: fraisEntreeSFA, color: theme.palette.text.secondary }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (value / total < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="middle"
        style={{ fontSize: '0.875rem', fontWeight: 'bold' }}
      >
        {formatPercentage(value, total)}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper 
          sx={{ 
            p: 2,
            boxShadow: theme.shadows[3],
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,0,0,0.05)',
            transform: 'scale(1.05)',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {data.name}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {formatCurrency(data.value)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatPercentage(data.value, total)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {payload.map((entry: any, index: number) => (
          <Box 
            key={`legend-${index}`}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              p: 1.5,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: `${entry.color}15`,
                transform: 'translateX(8px) scale(1.02)',
                boxShadow: theme.shadows[2],
              }
            }}
          >
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%',
                backgroundColor: entry.color,
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.2)',
                  boxShadow: `0 0 0 3px ${theme.palette.background.paper}, 0 0 8px ${entry.color}`,
                }
              }} 
            />
            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: entry.color,
                  }
                }}
              >
                {entry.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatCurrency(data[index].value)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  const getDocumentPath = () => {
    console.log('Profil actuel:', profilInvestissement);
    let path = '';
    
    switch(profilInvestissement) {
      case 'Allier sécurité et rendement':
        path = '/Allier sécurité et rendement - Présentation.pdf';
        break;
      case 'Faire croître mon capital':
        path = '/Faire croître mon capital - Présentation.pdf';
        break;
      case 'Placement dynamique':
        path = '/Placement dynamique - Présentation.pdf';
        break;
      default:
        console.log('Profil non reconnu');
        return '';
    }
    
    console.log('Chemin du document:', path);
    return path;
  };

  const handleDownload = () => {
    const path = getDocumentPath();
    if (path) {
      try {
        // Créer un lien temporaire
        const link = document.createElement('a');
        link.href = path;
        link.setAttribute('download', path.split('/').pop() || '');
        document.body.appendChild(link);
        console.log('Tentative de téléchargement avec le chemin:', path);
        
        // Simuler un clic
        link.click();
        
        // Nettoyer
        document.body.removeChild(link);
      } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
      }
    } else {
      console.error('Aucun document trouvé pour le profil:', profilInvestissement);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 5,
        mt: 15,
        borderRadius: 2,
        height: 'auto',
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '3px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2px',
          }
        }}
      >
        Analyse par répartition des montants
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box 
            sx={{ 
              height: 500,
              position: 'relative'
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={180}
                  innerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={2000}
                  animationEasing="ease-out"
                  onMouseEnter={(_, index) => {
                    const sector = document.querySelector(`#pie-sector-${index}`) as HTMLElement;
                    if (sector) {
                      sector.style.transform = 'scale(1.1)';
                      sector.style.transformOrigin = 'center';
                      sector.style.transition = 'transform 0.3s ease-out';
                    }
                  }}
                  onMouseLeave={(_, index) => {
                    const sector = document.querySelector(`#pie-sector-${index}`) as HTMLElement;
                    if (sector) {
                      sector.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      id={`pie-sector-${index}`}
                      fill={entry.color}
                      strokeWidth={2}
                      stroke={theme.palette.background.paper}
                      style={{
                        filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.2))',
                        transition: 'all 0.3s ease-out',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={<CustomTooltip />}
                  animationDuration={200}
                />
                <Legend 
                  content={<CustomLegend />}
                  layout="vertical" 
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{
                    paddingLeft: '20px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2}
            sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              '& > *': {
                animation: `${slideIn} 0.5s ease-out forwards`,
                opacity: 0,
              },
              '& > *:nth-of-type(1)': { animationDelay: '0.1s' },
              '& > *:nth-of-type(2)': { animationDelay: '0.2s' },
              '& > *:nth-of-type(3)': { animationDelay: '0.3s' },
              '& > *:nth-of-type(4)': { animationDelay: '0.4s' },
              '& > *:nth-of-type(5)': { animationDelay: '0.5s' },
              '& > *:nth-of-type(6)': { animationDelay: '0.6s' },
              '&:hover': {
                transform: 'translateX(-4px)',
                boxShadow: theme.shadows[4],
              }
            }}
          >
            <Typography 
              variant="h6" 
              color="primary" 
              gutterBottom
              sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '40px',
                  height: '2px',
                  backgroundColor: theme.palette.primary.main,
                }
              }}
            >
              Résumé
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Capital initial
              </Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(capitalInitial)}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Droits d'entrée
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(fraisEntreeSFA)}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Intérêts cumulés
              </Typography>
              <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(interetsCumules)}
              </Typography>
            </Box>

            <Box 
              sx={{ 
                p: 2, 
                mt: 3,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
                color: 'white',
                boxShadow: '0 4px 12px rgba(76,175,80,0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 8px 24px rgba(76,175,80,0.3)',
                  background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                }
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Estimation du capital final
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(totalAvecFraisSFA)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 12, borderColor: 'rgba(0,0,0,0.1)' }} />
          
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              mt: 2
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                textAlign: 'center',
                fontWeight: 500
              }}
            >
              Documents relatifs à votre profil d'investissement
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<ArticleIcon />}
              endIcon={<DownloadIcon />}
              onClick={handleDownload}
              disabled={!getDocumentPath()}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                }
              }}
            >
              Télécharger la présentation
            </Button>
            
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                mt: 1,
                textAlign: 'center',
                fontStyle: 'italic'
              }}
            >
              Document associé : {profilInvestissement || 'Aucun profil sélectionné'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
} 