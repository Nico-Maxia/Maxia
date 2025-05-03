import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,

  CardHeader,
  Divider,
  Box,
  CircularProgress,
  Button
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Enregistrement des composants ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanies: 0,
    totalEmails: 0,
    totalRevenue: 0,
    usersByMonth: [],
    companiesByMonth: [],
    emailsByDay: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Dans un cas réel, cette requête récupérerait les données du backend
        // Pour l'instant, nous utilisons des données fictives
        // const response = await axios.get('/api/admin/dashboard');
        // setStats(response.data);
        
        // Simulation de données (à remplacer par l'appel API réel)
        setTimeout(() => {
          const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
          const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
          
          const mockData = {
            totalUsers: 256,
            totalCompanies: 42,
            totalEmails: 1285,
            totalRevenue: 18750,
            usersByMonth: months.map((month, index) => ({
              month,
              count: Math.floor(Math.random() * 50) + 10
            })),
            companiesByMonth: months.map((month, index) => ({
              month,
              count: Math.floor(Math.random() * 15) + 2
            })),
            emailsByDay: days.map((day, index) => ({
              day,
              count: Math.floor(Math.random() * 100) + 20
            }))
          };
          
          setStats(mockData);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord:', error);
        setError('Impossible de charger les données du tableau de bord');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Configuration du graphique des utilisateurs par mois
  const userChartData = {
    labels: stats.usersByMonth.map(item => item.month),
    datasets: [
      {
        label: 'Nouveaux utilisateurs',
        data: stats.usersByMonth.map(item => item.count),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  // Configuration du graphique des entreprises par mois
  const companyChartData = {
    labels: stats.companiesByMonth.map(item => item.month),
    datasets: [
      {
        label: 'Nouvelles entreprises',
        data: stats.companiesByMonth.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  // Configuration du graphique des emails par jour
  const emailChartData = {
    labels: stats.emailsByDay.map(item => item.day),
    datasets: [
      {
        label: 'Emails envoyés',
        data: stats.emailsByDay.map(item => item.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        tension: 0.1
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    maintainAspectRatio: false
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Réessayer
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Tableau de Bord
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Vue d'ensemble des activités et statistiques
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Grid>
      
      {/* Cartes de statistiques */}
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={2}>
          <CardContent sx={{ textAlign: 'center' }}>
            <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h5" component="div">
              {stats.totalUsers}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Utilisateurs Totaux
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={2}>
          <CardContent sx={{ textAlign: 'center' }}>
            <BusinessIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h5" component="div">
              {stats.totalCompanies}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Entreprises
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={2}>
          <CardContent sx={{ textAlign: 'center' }}>
            <EmailIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h5" component="div">
              {stats.totalEmails}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Emails Envoyés
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={2}>
          <CardContent sx={{ textAlign: 'center' }}>
            <MoneyIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h5" component="div">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(stats.totalRevenue)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Revenus Totaux
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Graphiques */}
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <CardHeader title="Nouveaux Utilisateurs (par mois)" />
          <Divider />
          <Box sx={{ height: 300, p: 1 }}>
            <Bar data={userChartData} options={chartOptions} />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <CardHeader title="Nouvelles Entreprises (par mois)" />
          <Divider />
          <Box sx={{ height: 300, p: 1 }}>
            <Bar data={companyChartData} options={chartOptions} />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <CardHeader title="Emails Envoyés (par jour)" />
          <Divider />
          <Box sx={{ height: 300, p: 1 }}>
            <Line data={emailChartData} options={chartOptions} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard; 