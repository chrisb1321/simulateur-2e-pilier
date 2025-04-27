import { Button, ButtonProps } from '@mui/material';

export default function CustomButton(props: ButtonProps) {
  const { sx, children, ...rest } = props;
  return (
    <Button
      {...rest}
      sx={{
        borderRadius: '15px',
        px: 3,
        py: 1.5,
        fontWeight: 600,
        fontSize: '1.1rem',
        textTransform: 'none',
        color: '#fff !important',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 4px 20px rgba(33,150,243,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 30px rgba(33,150,243,0.13)',
          color: '#fff !important',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(120deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.13) 100%)',
          opacity: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          transition: 'opacity 0.3s, transform 0.7s cubic-bezier(.4,0,.2,1)',
          transform: 'translate(60%,60%) rotate(10deg)',
        },
        '&:hover::after': {
          opacity: 1,
          transform: 'translate(-20%,-20%) rotate(10deg)',
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
} 