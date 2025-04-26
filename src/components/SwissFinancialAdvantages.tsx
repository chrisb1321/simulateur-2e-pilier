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

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scaleX(1);
    opacity: 0.7;
  }
  50% {
    transform: scaleX(1.15);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 0.7;
  }
`;

const rippleEffect = keyframes`
  0% {
    transform: scaleX(1);
    opacity: 0.4;
  }
  100% {
    transform: scaleX(2.8);
    opacity: 0;
  }
`;

// Palette Portefeuilles (bleu vif, bleu clair, gris clair)
const COLOR_PRIMARY = '#1da1f2'; // Bleu vif Portefeuilles
const COLOR_GRADIENT = 'linear-gradient(90deg, #1da1f2 60%, #6dd5fa 100%)';
const COLOR_BG = '#fafdff'; // Fond très clair
const COLOR_CARD_BG = '#fff';
const COLOR_BORDER = '#e3f0fa';
const COLOR_TEXT = '#222';
const COLOR_TEXT_SECONDARY = '#6b7c93';

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
    <Box sx={{ width: '100%', pb: 6, background: COLOR_BG }}>
      {/* Encadré principal harmonisé avec couleurs Portefeuilles */}
      <Paper
        elevation={8}
        sx={{
          mb: 7,
          px: { xs: 2, sm: 7 },
          py: { xs: 4, sm: 7 },
          borderRadius: 6,
          maxWidth: '1200px',
          mx: 'auto',
          textAlign: 'center',
          background: COLOR_CARD_BG,
          boxShadow: '0 12px 48px 0 rgba(29,161,242,0.13), 0 2px 32px 0 rgba(29,161,242,0.08)',
          position: 'relative',
          animation: `${zoomIn} 0.7s cubic-bezier(0.4,0,0.2,1)`,
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            borderRadius: 6,
            boxShadow: '0 0 48px 12px rgba(29,161,242,0.09)',
            pointerEvents: 'none',
            zIndex: 0,
          }
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: COLOR_PRIMARY,
            fontWeight: 800,
            fontSize: { xs: '2.2rem', sm: '2.9rem' },
            mb: 1.5,
            position: 'relative',
            display: 'inline-block',
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
            opacity: 0,
            animation: `${fadeInDown} 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s forwards`,
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90px',
              height: '6px',
              background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
              borderRadius: '3px',
              animation: `${pulse} 2s infinite`,
              zIndex: 1,
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90px',
              height: '6px',
              background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
              borderRadius: '3px',
              opacity: 0.4,
              zIndex: 0,
              animation: `${rippleEffect} 2s infinite`,
            }
          }}
        >
          Swiss Financial Advice c'est
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: COLOR_TEXT_SECONDARY,
            fontSize: { xs: '1.08rem', sm: '1.28rem' },
            mt: 4,
            mb: 1,
            maxWidth: 720,
            mx: 'auto',
            fontWeight: 400,
            letterSpacing: '-0.1px',
            opacity: 0,
            animation: `${fadeInDown} 0.7s cubic-bezier(0.4,0,0.2,1) 0.35s forwards`,
          }}
        >
          Découvrez notre sélection de services adaptés à vos objectifs
        </Typography>
      </Paper>

      {/* Grille des cartes/services harmonisée avec couleurs Portefeuilles */}
      <Grid container spacing={10} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ mb: { xs: 5, md: 0 } }}>
            <Paper
              elevation={3}
              sx={{
                height: '100%',
                p: 3.5,
                pb: 1.5,
                borderRadius: '22px',
                backgroundColor: COLOR_CARD_BG,
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                opacity: 0,
                animation: `${fadeIn} 0.6s ease-out ${index * 0.12}s forwards`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '1.5px solid',
                borderColor: COLOR_BORDER,
                boxShadow: '0 2px 16px 0 rgba(29,161,242,0.07)',
                mb: { xs: 4, md: 0 },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.13)',
                  borderColor: 'transparent',
                  '& .icon-box': {
                    backgroundColor: COLOR_PRIMARY,
                    boxShadow: `0 4px 24px 0 ${COLOR_PRIMARY}22`,
                    '& svg': {
                      color: '#fff',
                      transform: 'scale(1.13)'
                    }
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: COLOR_GRADIENT,
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
                  width: 64,
                  height: 64,
                  borderRadius: '16px',
                  backgroundColor: `${COLOR_PRIMARY}13`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2.5,
                  boxShadow: '0 2px 12px 0 rgba(29,161,242,0.08)',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  '& svg': {
                    fontSize: 30,
                    color: COLOR_PRIMARY,
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)'
                  }
                }}
              >
                {service.icon}
              </Box>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1.2,
                  color: COLOR_TEXT,
                  fontSize: '1.13rem',
                  lineHeight: 1.35,
                  textAlign: 'center',
                  letterSpacing: '-0.2px',
                }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: COLOR_TEXT_SECONDARY,
                  lineHeight: 1.6,
                  fontSize: '0.97rem',
                  textAlign: 'center',
                  fontWeight: 400,
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