import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './components/Home';
import ProfessionalResumeBasic from './templates/ProfessionalResumeBasic';
import RoutTemplate from './components/RoutTemplate';
import { Provider } from 'react-redux';
import store from './store/store';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Create a provider for the redux store
// import { Provider } from 'react-redux';
// import store from './store/store';

// Define a wrapper component to use the templateId from the URL
const RoutTemplateWrapper: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  return <RoutTemplate templateId={templateId} />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/template/:templateId" element={<RoutTemplateWrapper />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App; 