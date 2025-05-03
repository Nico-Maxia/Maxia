import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!password || !confirmPassword) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await resetPassword(token, password);
      
      if (result.success) {
        setSuccess(true);
        // Rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(result.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la réinitialisation');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
          Réinitialisation du mot de passe
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
            Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Nouveau mot de passe"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={success}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmer le mot de passe"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={success}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || success}
          >
            {loading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
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