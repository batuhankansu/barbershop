import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Haircut',
      description: 'Professional haircut service with wash and style',
      image: 'https://source.unsplash.com/400x300/?haircut',
      price: '$30'
    },
    {
      title: 'Beard Trim',
      description: 'Expert beard trimming and shaping',
      image: 'https://source.unsplash.com/400x300/?beard',
      price: '$20'
    },
    {
      title: 'Hair & Beard',
      description: 'Complete grooming package',
      image: 'https://source.unsplash.com/400x300/?barbershop',
      price: '$45'
    }
  ];

  return (
    <Container>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Barbershop
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Professional grooming services for the modern gentleman
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/book')}
          sx={{ mt: 2 }}
        >
          Book Now
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={service.image}
                alt={service.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {service.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  {service.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 