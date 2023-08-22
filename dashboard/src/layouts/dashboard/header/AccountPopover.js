import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

import { useLogoutMutation } from '../../../slices/adminApiSlice';
import {logout} from '../../../slices/authSlice'

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    route: "/dashboard/app"
  },
  {
    label: 'Videos',
    icon: 'eva:person-fill',
    route: "/dashboard/catalog"
  },
  {
    label: 'Result',
    icon: 'eva:settings-2-fill',
    route: "/dashboard/prediction"
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [logoutApiCall] = useLogoutMutation()
  const { userInfo }  = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose =  () => {
    setOpen(null);
  };

  const logoutHandler = async () => {
    try {
      logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const navigateToRoute = (route) => {
    navigate(route);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {userInfo && (
            <>
              <Typography variant="subtitle2" noWrap>
                {/* {userInfo.username} */}
                {`${userInfo.firstName} ${userInfo.lastName}`}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {userInfo.email}
              </Typography>
            </>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose} onClick={() => navigateToRoute(option.route)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logoutHandler} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
