import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';
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
  const totalAvecFraisMarche = total - fraisEntreeMarche;
  const totalAvecFraisSFA = total - fraisEntreeSFA;
  const difference = totalAvecFraisSFA - totalAvecFraisMarche;

  const data = [
    { 
      name: 'Capital initial', 
      value: capitalInitial, 
      color: theme.palette.primary.main,
      percentage: formatPercentage(capitalInitial, total)
    },
    { 
      name: 'Intérêts cumulés', 
      value: interetsCumules, 
      color: theme.palette.success.main,
      percentage: formatPercentage(interetsCumules, total)
    },
    { 
      name: 'Droits d\'entrée avec SFA', 
      value: fraisEntreeSFA, 
      color: theme.palette.grey[700],
      percentage: formatPercentage(fraisEntreeSFA, total)
    },
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

  const getDocumentPath = () => {
    switch(profilInvestissement) {
      case 'Placement dynamique':
        return '/Placement dynamique - Présentation.pdf';
      case 'Faire croître mon capital':
        return '/Faire croître mon capital - Présentation.pdf';
      case 'Allier sécurité et rendement':
        return '/Allier sécurité et rendement - Présentation.pdf';
      default:
        return '';
    }
  };

  const handleDownload = () => {
    const path = getDocumentPath();
    if (path) {
      window.open(path, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 5,
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
          fontSize: '1.5rem',
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
              position: 'relative',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
                  </filter>
                  <filter id="shadowHover">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3"/>
                  </filter>
                </defs>
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
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      id={`pie-sector-${index}`}
                      fill={entry.color}
                      strokeWidth={2}
                      stroke={theme.palette.background.paper}
                      onMouseEnter={(e: React.MouseEvent<SVGElement>) => {
                        const target = e.target as SVGElement;
                        target.style.transform = 'scale(1.05)';
                        target.style.transformOrigin = 'center';
                        target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                        target.style.filter = 'url(#shadowHover)';
                      }}
                      onMouseLeave={(e: React.MouseEvent<SVGElement>) => {
                        const target = e.target as SVGElement;
                        target.style.transform = 'scale(1)';
                        target.style.filter = 'url(#shadow)';
                      }}
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: 'url(#shadow)'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2.5,
              borderRadius: 2,
              height: '100%',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              '& > *': {
                animation: `${slideIn} 0.5s ease-out forwards`,
                opacity: 0,
              },
              '& > *:nth-of-type(1)': { animationDelay: '0.1s' },
              '& > *:nth-of-type(2)': { animationDelay: '0.2s' },
              '& > *:nth-of-type(3)': { animationDelay: '0.3s' },
              '& > *:nth-of-type(4)': { animationDelay: '0.4s' },
              '&:hover': {
                transform: 'translateX(-2px)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
              }
            }}
          >
            <Typography 
              variant="h6" 
              color="primary" 
              gutterBottom
              sx={{
                position: 'relative',
                mb: 2,
                fontWeight: 600,
                fontSize: '1.1rem',
                letterSpacing: '-0.3px',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  borderRadius: '2px',
                }
              }}
            >
              Résumé
            </Typography>

            {[
              { label: 'Capital initial', value: capitalInitial, color: theme.palette.primary.main },
              { label: 'Intérêts cumulés', value: interetsCumules, color: theme.palette.success.main },
              { label: 'Droits d\'entrée avec SFA', value: fraisEntreeSFA, color: theme.palette.grey[700] }
            ].map((item, index) => (
              <Box
                key={item.label}
                sx={{ 
                  mb: 1.5,
                  '&:last-child': { mb: 2 }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(0,0,0,0.03)',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: `0 2px 12px ${item.color}10`,
                      backgroundColor: `${item.color}05`
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)`,
                      boxShadow: `0 0 0 3px ${item.color}15`
                    }} 
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        fontSize: '0.875rem'
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: item.color,
                        fontWeight: 600,
                        fontSize: '1rem',
                        letterSpacing: '-0.3px'
                      }}
                    >
                      {formatCurrency(item.value)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}

            <Box 
              sx={{ 
                p: 2, 
                borderRadius: 2,
                background: `linear-gradient(165deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
                color: 'white',
                boxShadow: '0 6px 20px rgba(76,175,80,0.2)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 70%)',
                },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(76,175,80,0.25)'
                }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.95,
                  fontWeight: 500,
                  mb: 0.5
                }}
              >
                Estimation du capital final
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  textShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  lineHeight: 1.2
                }}
              >
                {formatCurrency(totalAvecFraisSFA)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.1)' }} />
          
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
              Télécharger la présentation {profilInvestissement}
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
              Les documents sont stockés dans le dossier /public/documents/
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
} 