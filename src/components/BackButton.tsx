import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
  onClick?: () => void;
  label?: string;
  sx?: object;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  label = 'Retour',
  sx = {}
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Utiliser l'historique du navigateur par défaut
      window.history.back();
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={handleClick}
      sx={{
        borderColor: '#1976d2',
        color: '#1976d2',
        textTransform: 'none',
        fontWeight: 500,
        '&:hover': {
          borderColor: '#1565c0',
          backgroundColor: 'rgba(25, 118, 210, 0.04)'
        },
        ...sx
      }}
    >
      {label}
    </Button>
  );
};

export default BackButton;
