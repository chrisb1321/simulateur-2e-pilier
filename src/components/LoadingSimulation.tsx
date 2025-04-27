import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

const LOGOS = [
  { src: '/logos/axa.png', alt: 'AXA' },
  { src: '/logos/baloise.png', alt: 'Bâloise' },
  { src: '/logos/bcv.png', alt: 'BCV' },
  { src: '/logos/creditsuisse.png', alt: 'Credit Suisse' },
  { src: '/logos/gam.png', alt: 'GAM' },
  { src: '/logos/helvetia.png', alt: 'Helvetia' },
  { src: '/logos/jsafrasarasin.png', alt: 'J. Safra Sarasin' },
  { src: '/logos/lgt.png', alt: 'LGT' },
  { src: '/logos/pictet.png', alt: 'Pictet' },
  { src: '/logos/swisscanto.png', alt: 'Swisscanto' },
  { src: '/logos/swisslife.png', alt: 'Swiss Life' },
  { src: '/logos/ubs.png', alt: 'UBS' }
];

const MESSAGES = [
  "Analyse des taux d'intérêt...",
  "Comparaison des performances historiques...",
  "Évaluation des frais de gestion...",
  "Calcul des projections de rendement...",
  "Analyse des options de versement..."
];

interface LoadingSimulationProps {
  isLoading: boolean;
}

export default function LoadingSimulation({ isLoading }: LoadingSimulationProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    setProgress(0); // Réinitialise le progress quand isLoading devient true

    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => (prev + 2) % (LOGOS.length * 100));
    }, 16);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1200);

    return () => {
      clearInterval(scrollInterval);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mb: 3,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(120deg, #ffffff 0%, #f8f9fa 100%)',
        border: '4px solid',
        borderImage: 'linear-gradient(90deg, #2196F3 30%, #21CBF3 90%) 1',
        borderRadius: '18px',
        boxSizing: 'border-box',
        filter: 'none',
        animationName: 'fadeIn, borderPulse',
        animationDuration: '0.5s, 2s',
        animationTimingFunction: 'ease-in-out, ease-in-out',
        animationIterationCount: '1, infinite',
        borderColor: 'transparent',
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        '@keyframes borderPulse': {
          '0%': { borderImage: 'linear-gradient(90deg, #2196F3 30%, #21CBF3 90%) 1' },
          '50%': { borderImage: 'linear-gradient(90deg, #2196F3 60%, #21CBF3 100%) 1' },
          '100%': { borderImage: 'linear-gradient(90deg, #2196F3 30%, #21CBF3 90%) 1' },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 123, 255, 0.03), transparent)',
          animation: 'pulse 3s ease-in-out infinite',
        },
        '&::after': {
          content: 'none',
        },
        '@keyframes pulse': {
          '0%': { opacity: 0.5 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.5 },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              position: 'relative',
              animation: 'rotate 2s linear infinite',
              '@keyframes rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}>
              <CircularProgress 
                size={24}
                sx={{
                  color: 'primary.main',
                  animation: 'progress-pulse 1.5s ease-in-out infinite',
                  '@keyframes progress-pulse': {
                    '0%': { opacity: 0.6 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0.6 },
                  },
                }}
              />
            </Box>
            <Typography 
              variant="h6" 
              component="div"
              sx={{
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 600,
              }}
            >
              Analyse comparative en cours...
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace',
              color: 'text.secondary',
              animation: 'fade 0.5s ease-in-out',
              '@keyframes fade': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
            }}
          >
            {MESSAGES[messageIndex]} ({progress}%)
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '60px',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '50px',
              height: '100%',
              background: 'linear-gradient(to right, transparent, #ffffff)',
              zIndex: 2,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50px',
              height: '100%',
              background: 'linear-gradient(to left, transparent, #ffffff)',
              zIndex: 2,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              gap: 4,
              transform: `translateX(${-scrollPosition}px)`,
              transition: 'transform 0.016s linear',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <Box
                key={`${logo.alt}-${index}`}
                component="img"
                src={logo.src}
                alt={logo.alt}
                sx={{
                  height: '40px',
                  objectFit: 'contain',
                  opacity: 0.7,
                  filter: 'grayscale(30%)',
                  '&:hover': {
                    opacity: 1,
                    transform: 'scale(1.1)',
                    filter: 'grayscale(0%)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
} 