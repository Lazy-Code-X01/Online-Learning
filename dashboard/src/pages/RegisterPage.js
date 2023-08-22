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
// sections
import { RegisterForm } from '../sections/auth/register'

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
  backgroundColor: '#F9F9F9BB',
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

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate()

  const login = () => {
    navigate("/login")
  }

  return (
    <>
      <Helmet>
        <title> Register | UC MS </title>
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
              Register
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {''}
              <Link variant="subtitle2" onClick={login} color={'#FF725E'}>Login</Link>
            </Typography>

            <RegisterForm />
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
