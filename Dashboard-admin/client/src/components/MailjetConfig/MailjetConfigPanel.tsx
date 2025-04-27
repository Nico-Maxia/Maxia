import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

interface MailjetConfig {
  apiKeyPublic: string;
  apiKeyPrivate: string;
  senderEmail: string;
  senderName: string;
}

const MailjetConfigPanel = () => {
  const [config, setConfig] = useState<MailjetConfig>({
    apiKeyPublic: '',
    apiKeyPrivate: '',
    senderEmail: '',
    senderName: ''
  });
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({
    type: '',
    message: ''
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/mailjet/config', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération de la configuration');
      }
      
      setConfig(data.config);
    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erreur lors de la récupération de la configuration. Vérifiez que le serveur est bien démarré.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/v1/mailjet/save-config', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(config),
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || `Erreur HTTP: ${response.status}`);
      }

      setStatus({
        type: 'success',
        message: 'Configuration mise à jour avec succès'
      });
      
      // Recharger la configuration après la sauvegarde
      await fetchConfig();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erreur lors de la mise à jour de la configuration'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestConfig = async () => {
    try {
      setTestLoading(true);
      const response = await fetch('/api/v1/mailjet/test-config', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(config),
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Erreur lors du test de la configuration');
      }

      setStatus({
        type: 'success',
        message: 'Test de configuration réussi ! Un email de test a été envoyé.'
      });
    } catch (error) {
      console.error('Erreur lors du test:', error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erreur lors du test de la configuration'
      });
    } finally {
      setTestLoading(false);
    }
  };

  const handleChange = (field: keyof MailjetConfig) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfig({ ...config, [field]: e.target.value });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Configuration Mailjet
      </Typography>
      
      {status.type && (
        <Alert severity={status.type} sx={{ mb: 2 }}>
          {status.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Clé API Publique"
              value={config.apiKeyPublic}
              onChange={handleChange('apiKeyPublic')}
              margin="normal"
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Clé API Privée"
              value={config.apiKeyPrivate}
              onChange={handleChange('apiKeyPrivate')}
              margin="normal"
              required
              type="password"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email de l'expéditeur"
              value={config.senderEmail}
              onChange={handleChange('senderEmail')}
              margin="normal"
              required
              type="email"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nom de l'expéditeur"
              value={config.senderName}
              onChange={handleChange('senderName')}
              margin="normal"
              required
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleTestConfig}
            disabled={testLoading || loading || !config.apiKeyPublic || !config.apiKeyPrivate || !config.senderEmail || !config.senderName}
          >
            {testLoading ? 'Test en cours...' : 'Tester la configuration'}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || testLoading}
          >
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </Box>
      </form>
    </StyledPaper>
  );
};

export default MailjetConfigPanel; 