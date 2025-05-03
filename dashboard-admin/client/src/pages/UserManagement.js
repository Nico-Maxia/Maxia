import React, { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Paper, 
  Button,
  Grid,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Badge as BadgeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  VpnKey as VpnKeyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import axios from 'axios';

const UserManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'admin',
    company: '',
    phone: '',
    password: '',
    status: 'active'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Données simulées pour les administrateurs et les entreprises
  const [admins, setAdmins] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulation de données (à remplacer par l'appel API réel)
        setTimeout(() => {
          const mockAdmins = [
            { id: 1, name: 'Admin Principal', email: 'admin@maxia.fr', role: 'super_admin', status: 'active', lastLogin: '2023-05-15T10:30:00' },
            { id: 2, name: 'Jean Dupont', email: 'jean@maxia.fr', role: 'admin', status: 'active', lastLogin: '2023-05-14T09:15:00' },
            { id: 3, name: 'Marie Martin', email: 'marie@maxia.fr', role: 'support', status: 'inactive', lastLogin: '2023-04-28T14:20:00' }
          ];
          
          const mockCompanies = [
            { id: 1, name: 'Entreprise A', contactName: 'Pierre Durand', email: 'contact@entreprisea.fr', phone: '01 23 45 67 89', createdAt: '2023-04-10T08:00:00', status: 'active', licenseCount: 5 },
            { id: 2, name: 'Entreprise B', contactName: 'Sophie Bernard', email: 'sophie@entrepriseb.fr', phone: '01 98 76 54 32', createdAt: '2023-04-15T10:30:00', status: 'pending', licenseCount: 2 },
            { id: 3, name: 'Entreprise C', contactName: 'Marc Petit', email: 'marc@entreprisec.fr', phone: '01 45 67 89 10', createdAt: '2023-05-02T14:15:00', status: 'active', licenseCount: 10 }
          ];
          
          const mockLicenses = [
            { id: 1, key: 'LIC-001-2023', companyId: 1, companyName: 'Entreprise A', assignedTo: 'user1@entreprisea.fr', createdAt: '2023-04-12T08:30:00', expiresAt: '2024-04-12T08:30:00', status: 'active', type: 'standard' },
            { id: 2, key: 'LIC-002-2023', companyId: 1, companyName: 'Entreprise A', assignedTo: 'user2@entreprisea.fr', createdAt: '2023-04-12T08:35:00', expiresAt: '2024-04-12T08:35:00', status: 'active', type: 'standard' },
            { id: 3, key: 'LIC-003-2023', companyId: 2, companyName: 'Entreprise B', assignedTo: 'user1@entrepriseb.fr', createdAt: '2023-04-16T10:30:00', expiresAt: '2024-04-16T10:30:00', status: 'active', type: 'trial' },
            { id: 4, key: 'LIC-004-2023', companyId: 3, companyName: 'Entreprise C', assignedTo: 'user1@entreprisec.fr', createdAt: '2023-05-03T09:15:00', expiresAt: '2024-05-03T09:15:00', status: 'suspended', type: 'standard' }
          ];
          
          setAdmins(mockAdmins);
          setCompanies(mockCompanies);
          setLicenses(mockLicenses);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setError('Impossible de charger les données des utilisateurs');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenCreateDialog = () => {
    setFormData({
      name: '',
      email: '',
      role: 'admin',
      company: '',
      phone: '',
      password: '',
      status: 'active'
    });
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      
      // Simulation de création d'utilisateur (à remplacer par l'appel API réel)
      setTimeout(() => {
        const newUser = {
          id: admins.length + 1,
          ...formData,
          lastLogin: null
        };
        
        setAdmins(prev => [...prev, newUser]);
        setOpenCreateDialog(false);
        setNotification({
          open: true,
          message: 'Utilisateur créé avec succès',
          severity: 'success'
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      setNotification({
        open: true,
        message: 'Erreur lors de la création de l\'utilisateur',
        severity: 'error'
      });
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      
      // Simulation de suppression d'utilisateur (à remplacer par l'appel API réel)
      setTimeout(() => {
        if (tabValue === 0) {
          setAdmins(prev => prev.filter(admin => admin.id !== selectedUser.id));
        } else if (tabValue === 1) {
          setCompanies(prev => prev.filter(company => company.id !== selectedUser.id));
        } else {
          setLicenses(prev => prev.filter(license => license.id !== selectedUser.id));
        }
        
        setOpenDeleteDialog(false);
        setSelectedUser(null);
        setNotification({
          open: true,
          message: 'Suppression réussie',
          severity: 'success'
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setNotification({
        open: true,
        message: 'Erreur lors de la suppression',
        severity: 'error'
      });
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  // Colonnes pour la table des administrateurs
  const adminColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nom', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { 
      field: 'role', 
      headerName: 'Rôle', 
      width: 150,
      renderCell: (params) => {
        const roleText = {
          super_admin: 'Super Admin',
          admin: 'Admin',
          support: 'Support'
        };
        
        const roleColor = {
          super_admin: 'error',
          admin: 'primary',
          support: 'info'
        };
        
        return (
          <Chip 
            label={roleText[params.value] || params.value} 
            color={roleColor[params.value] || 'default'} 
            size="small" 
          />
        );
      } 
    },
    { 
      field: 'status', 
      headerName: 'Statut', 
      width: 130,
      renderCell: (params) => (
        <Chip 
          label={params.value === 'active' ? 'Actif' : 'Inactif'} 
          color={params.value === 'active' ? 'success' : 'default'} 
          size="small" 
        />
      ) 
    },
    { 
      field: 'lastLogin', 
      headerName: 'Dernière Connexion', 
      width: 200,
      valueFormatter: (params) => {
        if (!params.value) return 'Jamais';
        return new Date(params.value).toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => handleOpenDeleteDialog(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  // Colonnes pour la table des entreprises
  const companyColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Entreprise', width: 200 },
    { field: 'contactName', headerName: 'Contact', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Téléphone', width: 150 },
    { 
      field: 'createdAt', 
      headerName: 'Date de création', 
      width: 180,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    },
    { 
      field: 'status', 
      headerName: 'Statut', 
      width: 120,
      renderCell: (params) => {
        const statusText = {
          active: 'Actif',
          pending: 'En attente',
          suspended: 'Suspendu'
        };
        
        const statusColor = {
          active: 'success',
          pending: 'warning',
          suspended: 'error'
        };
        
        return (
          <Chip 
            label={statusText[params.value] || params.value} 
            color={statusColor[params.value] || 'default'} 
            size="small" 
          />
        );
      } 
    },
    { field: 'licenseCount', headerName: 'Licences', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => handleOpenDeleteDialog(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  // Colonnes pour la table des licences
  const licenseColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'key', headerName: 'Clé de licence', width: 150 },
    { field: 'companyName', headerName: 'Entreprise', width: 200 },
    { field: 'assignedTo', headerName: 'Assignée à', width: 250 },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value === 'trial' ? 'Essai' : 'Standard'} 
          color={params.value === 'trial' ? 'secondary' : 'primary'} 
          size="small" 
        />
      ) 
    },
    { 
      field: 'createdAt', 
      headerName: 'Date de création', 
      width: 180,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    },
    { 
      field: 'expiresAt', 
      headerName: 'Date d\'expiration', 
      width: 180,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    },
    { 
      field: 'status', 
      headerName: 'Statut', 
      width: 120,
      renderCell: (params) => {
        const statusText = {
          active: 'Active',
          suspended: 'Suspendue',
          expired: 'Expirée'
        };
        
        const statusColor = {
          active: 'success',
          suspended: 'error',
          expired: 'default'
        };
        
        return (
          <Chip 
            label={statusText[params.value] || params.value} 
            color={statusColor[params.value] || 'default'} 
            size="small" 
          />
        );
      } 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => handleOpenDeleteDialog(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  // Filtrer les données en fonction du terme de recherche
  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLicenses = licenses.filter(license => 
    license.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !(admins.length || companies.length || licenses.length)) {
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
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Gestion des Utilisateurs
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Administrez les utilisateurs, entreprises et licences
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="user management tabs">
              <Tab icon={<PersonIcon />} iconPosition="start" label="Administrateurs" />
              <Tab icon={<BusinessIcon />} iconPosition="start" label="Entreprises" />
              <Tab icon={<VpnKeyIcon />} iconPosition="start" label="Licences" />
            </Tabs>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <TextField
            fullWidth
            placeholder="Rechercher..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateDialog}
          >
            {tabValue === 0 ? 'Nouvel Administrateur' : tabValue === 1 ? 'Nouvelle Entreprise' : 'Nouvelle Licence'}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={tabValue === 0 ? filteredAdmins : tabValue === 1 ? filteredCompanies : filteredLicenses}
              columns={tabValue === 0 ? adminColumns : tabValue === 1 ? companyColumns : licenseColumns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              loading={loading}
            />
          </div>
        </Grid>
      </Grid>

      {/* Dialog de création d'utilisateur */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {tabValue === 0 ? 'Nouvel Administrateur' : tabValue === 1 ? 'Nouvelle Entreprise' : 'Nouvelle Licence'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Veuillez remplir les informations suivantes pour créer {tabValue === 0 ? 'un nouvel administrateur' : tabValue === 1 ? 'une nouvelle entreprise' : 'une nouvelle licence'}.
          </DialogContentText>
          
          {tabValue === 0 && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Nom complet"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Rôle</InputLabel>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      label="Rôle"
                    >
                      <MenuItem value="super_admin">Super Admin</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="support">Support</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Statut</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      label="Statut"
                    >
                      <MenuItem value="active">Actif</MenuItem>
                      <MenuItem value="inactive">Inactif</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </>
          )}

          {/* Formulaire pour les entreprises et licences */}
          {tabValue === 1 && (
            <Typography>Formulaire de création d'entreprise à implémenter</Typography>
          )}
          
          {tabValue === 2 && (
            <Typography>Formulaire de création de licence à implémenter</Typography>
          )}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>Annuler</Button>
          <Button 
            onClick={handleCreateUser} 
            variant="contained" 
            disabled={loading}
          >
            {loading ? 'Création...' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer {selectedUser?.name || selectedUser?.key || 'cet élément'} ? Cette action ne peut pas être annulée.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Annuler</Button>
          <Button 
            onClick={handleDeleteUser} 
            color="error" 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UserManagement; 