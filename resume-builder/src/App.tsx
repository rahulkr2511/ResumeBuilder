import React from 'react';
import './App.css';
import './styles/common.css';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './components/Home';
import RouteTemplate from './components/RouteTemplate';
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


/**
 * 
 * @returns A wrapper component that retrieves the templateId from the URL parameters
 */
const RouteTemplateWrapper: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  return <RouteTemplate templateId={templateId} />;
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
              <Route path="/template/:templateId" element={<RouteTemplateWrapper />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App; 