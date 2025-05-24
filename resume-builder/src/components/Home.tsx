import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Stack, Card, CardContent, CardActionArea } from '@mui/material';
import availableTemplates from '../configs/templates'; 
import IApplicationConstants from '../constants/Constants';

/**
 * 
 * @returns The Home component displays a list of available resume templates
 *         and allows users to select one to start building their resume.
 */

const Home: React.FC = () => {

  const navigate = useNavigate();
  const handleTemplateSelect = (templateId: string) => {
    navigate(`/template/${templateId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        {IApplicationConstants.APP_NAME}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
        {IApplicationConstants.APP_DESCRIPTION}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
        {IApplicationConstants.CHOOSE_TEMPLATE_DESCRIPTION}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={4}
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 4
          }}
        >
          {availableTemplates.map((template) => (
            <Card 
              key={template.id}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3
                }
              }}
            >
              <CardActionArea onClick={() => handleTemplateSelect(template.id)}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {template.description}
                  </Typography>
                  {/* Add template thumbnail here */}
                  <Box 
                    sx={{ 
                      mt: 2,
                      height: 200,
                      bgcolor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {IApplicationConstants.TEMPLATE_PREVIEW}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Home; 