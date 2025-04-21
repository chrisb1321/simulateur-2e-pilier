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
    if (!isLoading) return;

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
        animation: 'fadeIn 0.5s ease-in-out',
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
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="h6" component="div">
              Analyse comparative en cours...
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            {MESSAGES[messageIndex]} ({progress}%)
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '60px',
            overflow: 'hidden',
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
                  '&:hover': {
                    opacity: 1,
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
} 