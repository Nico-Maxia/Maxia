import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MailjetConfigPanel from '../MailjetConfig';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const TabNavigation = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="dashboard tabs">
          <Tab label="Tableau de bord" />
          <Tab label="Configuration Mailjet" />
          <Tab label="Utilisateurs" />
          <Tab label="Paramètres" />
        </StyledTabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <Typography variant="h5">Tableau de bord principal</Typography>
        {/* Contenu du tableau de bord principal */}
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <MailjetConfigPanel />
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        <Typography variant="h5">Gestion des utilisateurs</Typography>
        {/* Contenu de la gestion des utilisateurs */}
      </TabPanel>
      
      <TabPanel value={value} index={3}>
        <Typography variant="h5">Paramètres</Typography>
        {/* Contenu des paramètres */}
      </TabPanel>
    </Box>
  );
};

export default TabNavigation; 