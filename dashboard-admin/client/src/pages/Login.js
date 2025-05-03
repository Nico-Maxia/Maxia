import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Avatar, 
  Button, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // Si l'utilisateur est déjà authentifié, rediriger vers le tableau de bord
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Identifiants incorrects');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la connexion');
      console.error('Erreur de connexion:', error);
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
          Connexion Admin
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de Passe"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <FormControlLabel
            control={
              <Checkbox 
                value="remember" 
                color="primary" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink component={Link} to="/forgot-password" variant="body2">
                Mot de passe oublié ?
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
} 