import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';


// @mui
import { styled } from '@mui/material/styles';
// import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
import { Link, Container, Typography, } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },

}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  // backgroundColor: theme.palette.background.default,
  backgroundColor: '#F9F9F9',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),

}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate()

  const register = () => {
    navigate("/register")
  }
  return (
    <>
      <Helmet>
        <title> Login | UC MS </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subt2itle2" onClick={register} color={"#FF725E"}>Register</Link>
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>

        
        {mdUp && (
          <StyledSection>
            <img src="/assets/illustrations/illustration_login2.png" alt="login" />
          </StyledSection>
        )}

      </StyledRoot>
    </>
  );
}
