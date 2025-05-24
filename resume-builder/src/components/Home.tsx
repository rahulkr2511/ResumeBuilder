import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import availableTemplates from '../configs/templates';
import IApplicationConstants from '../constants/Constants';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/template/${templateId}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f8fafc, #ffffff)',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ color: 'primary.main' }}
          >
            {IApplicationConstants.APP_NAME}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {IApplicationConstants.APP_DESCRIPTION}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {IApplicationConstants.CHOOSE_TEMPLATE_DESCRIPTION}
          </Typography>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {availableTemplates.map((template) => (
            <Card
              key={template.id}
              elevation={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea onClick={() => handleTemplateSelect(template.id)}>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    color="text.primary"
                  >
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {template.description}
                  </Typography>

                  <Box
                    sx={{
                      mt: 3,
                      height: 200,
                      backgroundColor: 'grey.100',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      border: '1px solid #ddd',
                    }}
                  >
                    {template.thumbnail ? (
                      <img
                        src={template.thumbnail}
                        alt={`${template.name} preview`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {IApplicationConstants.TEMPLATE_PREVIEW}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>

        <Typography
          variant="caption"
          color="text.disabled"
          textAlign="center"
          mt={6}
          display="block"
        >
          {IApplicationConstants.FOOT_NOTE}
        </Typography>
      </Container>
    </Box>
  );
};

export default React.memo(Home);
