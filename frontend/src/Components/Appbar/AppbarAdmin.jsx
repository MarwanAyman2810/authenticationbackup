import React from 'react';
import { AppBar, Tabs, Tab, Avatar, Typography, Toolbar, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import { Link, useLocation, useParams , useNavigate } from 'react-router-dom';
import Logo from './Logo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00008B',
    },
    secondary: {
      main: '#0070F3',
    },
  },
});

function AppBarComponent({ userName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSignOut = () => {
    // Sign out logic goes here
    navigate('/'); // Redirects to the login page
  };

  const appBarStyle = {
    backgroundColor: 'white',
    height: '172px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const toolbarStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '20px',
    paddingRight: '20px',
  };

  const tabContainerStyle = {
    marginTop: '60px',
    width: '100%',
  };

  const imgStyle = {
    width: '120px',
    height: 'auto',
    marginTop: '30px',
  };

  const nameStyle = {
    marginLeft: '10px',
  };

  const tabStyle = {
    '&.MuiTab-root': {
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  };

  const customIndicatorStyle = {
    backgroundColor: theme.palette.secondary.main,
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar style={toolbarStyle}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', marginLeft: '20px' }}>
            <Avatar src={AccountCircle} alt="Zeina Avatar" />
            <Typography variant="h6" component="div" color="primary" style={nameStyle}>
              {/* {userName} will be later on edited depending on logged in user*/} Zeina Elmofty
            </Typography>
          </div>
          <Button color="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
          <img src={Logo} style={imgStyle} alt="Logo" />
        </Toolbar>
        <div style={tabContainerStyle}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            centered={false}
            sx={{ '& .MuiTabs-indicator': customIndicatorStyle }}
          >
            <Tab
              label="Home"
              sx={tabStyle}
              component={Link}
              to={`/admin-home`} 
              selected={location.pathname === `/admin-home`}  
            />
            <Tab
              label="Doctor Requests"
              sx={tabStyle}
              component={Link}
              to={`/doctor-requests`} 
              selected={location.pathname === `/doctor-requests`}  
            />
            <Tab
              label="Pharmacist Requests"
              sx={tabStyle}
              component={Link}
              to={`/pharmacist-requests`}  
              selected={location.pathname === `/pharmacist-requests`} 
            />
            <Tab
              label="User Management"
              sx={tabStyle}
              component={Link}
              to={`/userManagement`} 
              selected={location.pathname === `/userManagement`}  
            />
            <Tab
              label="Health Packages"
              sx={tabStyle}
              component={Link}
              to={`/health-packages`} 
              selected={location.pathname === `/health-packages`} 
            />
            <Tab
              label="Medications"
              sx={tabStyle}
              component={Link}
              to={`/admin-meds`} 
              selected={location.pathname === `/admin-meds`} 
            />
          </Tabs>
        </div>
      </AppBar>
    </ThemeProvider>
  );
}

export default AppBarComponent;
