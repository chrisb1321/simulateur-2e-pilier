import { Box, Typography, Grid, Paper } from '@mui/material';
import { keyframes } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const SwissFinancialAdvantages = () => {
  const services = [
    {
      icon: <PersonIcon />,
      title: "Conseiller dédié et expérimenté",
      description: "Un interlocuteur unique vous accompagne à chaque étape, avec une expertise spécialisée dans les comptes de libre passage."
    },
    {
      icon: <BarChartIcon />,
      title: "Suivi personnalisé de votre compte",
      description: "Accédez aux performances de votre placement via un reporting régulier et clair."
    },
    {
      icon: <TrendingUpIcon />,
      title: "Accompagnement jusqu'à la retraite",
      description: "Nous restons à vos côtés pour ajuster votre stratégie selon l'évolution de votre situation et des opportunités du marché."
    },
    {
      icon: <CompareArrowsIcon />,
      title: "Comparaison régulière avec le marché",
      description: "Votre solution est réévaluée périodiquement pour s'assurer qu'elle reste compétitive et alignée avec vos objectifs."
    },
    {
      icon: <SwapHorizIcon />,
      title: "Changement de fondation sans frais",
      description: "Grâce à nos partenaires, vous pouvez modifier votre fondation à tout moment, sans frais de transfert."
    },
    {
      icon: <SavingsIcon />,
      title: "Optimisation fiscale au moment du retrait",
      description: "Nous vous accompagnons pour choisir l'option de retrait la plus avantageuse (capital, rente ou combinaison), en tenant compte de votre fiscalité."
    },
    {
      icon: <AccountBalanceIcon />,
      title: "Accès à des Banques privées en gestion de fortune",
      description: "Profitez de placements sélectionnés en fonction de votre profil, via notre réseau partenaire."
    },
    {
      icon: <SecurityIcon />,
      title: "Indépendance et transparence",
      description: "Nos conseils sont orientés vers la valorisation durable de votre capital."
    }
  ];

  return (
    <Box>
      <Paper
        elevation={6}
        sx={{
          mb: 6,
          px: { xs: 2, sm: 6 },
          py: { xs: 4, sm: 6 },
          borderRadius: 5,
          maxWidth: '1100px',
          mx: 'auto',
          textAlign: 'center',
          background: theme => `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
          boxShadow: '0 8px 32px 0 rgba(33,150,243,0.18), 0 2px 24px 0 rgba(33,150,243,0.10)',
          position: 'relative',
          animation: `${zoomIn} 0.7s cubic-bezier(0.4,0,0.2,1)`,
          '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            borderRadius: 5,
            boxShadow: '0 0 32px 8px rgba(33,150,243,0.07)',
            pointerEvents: 'none',
            zIndex: 0,
          }
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: theme => theme.palette.primary.main,
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.7rem' },
            mb: 1.5,
            position: 'relative',
            display: 'inline-block',
            '&:after': {
              content: '""',
              display: 'block',
              width: '120px',
              height: '7px',
              borderRadius: '6px',
              background: 'linear-gradient(90deg, #2196f3 60%, #6dd5fa 100%)',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '-14px',
              opacity: 0.18
            }
          }}
        >
          Swiss Financial Advice c'est
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: theme => theme.palette.text.secondary,
            fontSize: { xs: '1.05rem', sm: '1.25rem' },
            mt: 4,
            mb: 1,
            maxWidth: 700,
            mx: 'auto',
          }}
        >
          Découvrez notre sélection de services adaptés à vos objectifs
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                height: '100%',
                p: 3,
                borderRadius: '16px',
                backgroundColor: '#fff',
                transition: 'all 0.3s ease-in-out',
                opacity: 0,
                animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s forwards`,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme => `0 16px 40px ${theme.palette.primary.main}15`,
                  borderColor: 'transparent',
                  '& .icon-box': {
                    backgroundColor: theme => theme.palette.primary.main,
                    '& svg': {
                      color: '#fff',
                      transform: 'scale(1.1)'
                    }
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: theme => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out'
                },
                '&:hover::before': {
                  opacity: 1
                }
              }}
            >
              <Box
                className="icon-box"
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '12px',
                  backgroundColor: theme => `${theme.palette.primary.main}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  transition: 'all 0.3s ease-in-out',
                  '& svg': {
                    fontSize: 28,
                    color: theme => theme.palette.primary.main,
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
              >
                {service.icon}
              </Box>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: theme => theme.palette.text.primary,
                  fontSize: '1.1rem',
                  lineHeight: 1.4
                }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme => theme.palette.text.secondary,
                  lineHeight: 1.6,
                  fontSize: '0.9rem'
                }}
              >
                {service.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SwissFinancialAdvantages; 