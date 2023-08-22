import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
import { useRegisterMutation } from '../../../slices/adminApiSlice';
import { setCredentials } from '../../../slices/authSlice';

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard/app', { replace: true });
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await register({ firstName, lastName, password, email }).unwrap();
      dispatch(setCredentials(res));
      navigate('/dashboard/app', { replace: true });
    } catch (err) {
      // toast.error('Failed to register. Please check your credentials.');
      toast.error(err?.data?.message );
    }
  };

  return (
    <>
    <form onSubmit={submitHandler}>
        {/* first name and last name */}
        <Stack spacing={3} direction={"row"} sx={{ my: 2 }}>
          <TextField name="firstName" label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <TextField name="lastName" label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </Stack>


        {/* email address */}
        <Stack spacing={3} direction={"column"} sx={{ my: 2 }}>
          <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Stack>

        {/* password and confirm password */}
        <Stack spacing={3} direction={"row"} sx={{ my: 2 }}>
          <TextField
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="confirm password"
            label="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton 
          fullWidth 
          size="large" 
          type="submit" 
          variant="contained" 
          // onClick={submitHandler} 
          sx={{ backgroundColor: '#101723',
          '&:hover': {
            backgroundColor: '#060A10',
          },
          }}
          loading={isLoading} // Use the loading prop instead of isLoading
          disabled={isLoading} // Disable the button while loading
        >
          Register
        </LoadingButton>
      </form>
    </>
  );
}
