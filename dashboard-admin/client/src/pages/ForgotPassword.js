import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Avatar, 
  Button, 
  TextField, 
  Link as MuiLink, 
  Grid, 
  Box, 
  Typography, 
  Container, 
  Paper,
  Alert
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { forgotPassword } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email) {
      setError('Veuillez saisir votre adresse email.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const result = await forgotPassword(email);
      
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la demande');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ 
      height: '100vh', 
      display: 'flex',
      alignItems: 'center'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Récupération de mot de passe
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
            Un email avec les instructions de réinitialisation a été envoyé à votre adresse email.
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={success}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || success}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer les instructions'}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <MuiLink component={Link} to="/login" variant="body2">
                Retour à la page de connexion
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
} 