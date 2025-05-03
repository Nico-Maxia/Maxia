import React from 'react';
import { Typography, Paper } from '@mui/material';

const Profile = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profil
      </Typography>
      <Typography variant="body1">
        Cette page est en cours de développement.
      </Typography>
    </Paper>
  );
};

export default Profile; 