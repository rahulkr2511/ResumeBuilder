import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Stack, Card, CardContent, CardActionArea } from '@mui/material';

// Template components will be imported here
// import Template1 from '../templates/Template1';

interface Template {
  id: string;
  name: string;
  description: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: 'professionalBasic',
      name: 'Professional Basic',
      description: 'A clean and professional template suitable for most industries',
      // thumbnail: 'path-to-thumbnail'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'A modern and creative template for design and creative roles',
      // thumbnail: 'path-to-thumbnail'
    },
    // Add more templates as needed
  ];

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/template/${templateId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Resume Builder
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
        Choose a template to get started
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
          {templates.map((template) => (
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
                      Template Preview
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