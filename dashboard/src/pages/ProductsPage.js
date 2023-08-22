import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner/Loader';

const ProductsPage = () => {
  const BestScreenTime = 50;
  const screenTime = 20;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getMessage = () => {
    if (screenTime < BestScreenTime) {
      return "You are an average student. Watch more videos.";
    }
    if (screenTime === BestScreenTime) {
      return "You are the average of the best. Keep it up!";
    }

    return "You are a good student. Keep up the great work!";
  };

  const handleClick = () => {
    navigate("/dashboard/catalog");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Result
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {getMessage()}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#42474D',
                  '&:hover': {
                    backgroundColor: '#141414',
                  },
                  marginTop: "20px"
                }}
                onClick={handleClick}
              >
                Watch More Videos
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsPage;
