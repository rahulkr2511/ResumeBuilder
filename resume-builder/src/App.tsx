import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './components/Home';
import ProfessionalResumeBasic from './templates/ProfessionalResumeBasic';
import RoutTemplate from './components/RoutTemplate';

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

// Define a wrapper component to use the templateId from the URL
const RoutTemplateWrapper: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  return <RoutTemplate templateId={templateId} />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/template/:templateId" element={<RoutTemplateWrapper />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App; 