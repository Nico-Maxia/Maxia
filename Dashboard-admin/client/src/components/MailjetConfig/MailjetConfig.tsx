import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  TextField,
  Alert,
} from '@mui/material';
import { MailjetConfig as IMailjetConfig } from '../../types/mailjet.types';
import { mailjetService } from '../../services/mailjet.service';

export const MailjetConfig: React.FC = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IMailjetConfig>();

  // Récupérer la configuration existante
  const { isPending, data, error, isError } = useQuery({
    queryKey: ['mailjetConfig'],
    queryFn: () => mailjetService.getConfig(),
    staleTime: 0,
    gcTime: 0,
    retry: false // Ne pas réessayer en cas d'erreur 404
  });

  // Réagir aux changements de données
  React.useEffect(() => {
    if (data?.config) {
      setValue('apiKeyPublic', data.config.apiKeyPublic || '');
      setValue('apiKeyPrivate', data.config.apiKeyPrivate || '');
      setValue('senderEmail', data.config.senderEmail || '');
      setValue('senderName', data.config.senderName || '');
    }
  }, [data, setValue]);

  // Mutation pour tester la configuration
  const testMutation = useMutation({
    mutationFn: (data: IMailjetConfig) => mailjetService.testConfig(data),
    onSuccess: () => {
      toast.success('Test de configuration réussi !');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors du test');
    },
  });

  // Mutation pour sauvegarder la configuration
  const saveMutation = useMutation({
    mutationFn: (data: IMailjetConfig) => mailjetService.saveConfig(data),
    onSuccess: () => {
      toast.success('Configuration sauvegardée avec succès !');
      queryClient.invalidateQueries({ queryKey: ['mailjetConfig'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    },
  });

  const onSubmit = async (data: IMailjetConfig) => {
    await saveMutation.mutateAsync(data);
  };

  const onTest = handleSubmit(async (data: IMailjetConfig) => {
    await testMutation.mutateAsync(data);
  });

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Card>
      <CardHeader 
        title="Configuration Mailjet" 
        subheader={!data?.config ? "Aucune configuration existante. Veuillez configurer Mailjet." : undefined}
      />
      <CardContent>
        {isError && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {error instanceof Error ? error.message : "Aucune configuration existante. Veuillez configurer Mailjet."}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Clé API Publique"
                type="password"
                {...register('apiKeyPublic', { required: 'Ce champ est requis' })}
                error={!!errors.apiKeyPublic}
                helperText={errors.apiKeyPublic?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Clé API Privée"
                type="password"
                {...register('apiKeyPrivate', { required: 'Ce champ est requis' })}
                error={!!errors.apiKeyPrivate}
                helperText={errors.apiKeyPrivate?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email de l'expéditeur"
                {...register('senderEmail', { 
                  required: 'Ce champ est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Adresse email invalide'
                  }
                })}
                error={!!errors.senderEmail}
                helperText={errors.senderEmail?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom de l'expéditeur"
                {...register('senderName', { required: 'Ce champ est requis' })}
                error={!!errors.senderName}
                helperText={errors.senderName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={onTest}
                  disabled={testMutation.isPending}
                >
                  {testMutation.isPending ? <CircularProgress size={24} /> : 'Tester'}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saveMutation.isPending}
                >
                  {saveMutation.isPending ? <CircularProgress size={24} /> : 'Sauvegarder'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}; 