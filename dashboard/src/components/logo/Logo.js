import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
        <g clipPath="url(#clip0_442_153)">
          <mask id="mask0_442_153" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="61" height="61">
            <path d="M61 0H0V61H61V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_442_153)">
            <path d="M30.5 61C47.3447 61 61 47.3447 61 30.5C61 13.6553 47.3447 0 30.5 0C13.6553 0 0 13.6553 0 30.5C0 47.3447 13.6553 61 30.5 61Z" fill="#101723" />
            <path d="M30.5002 43.2814C26.9317 43.2814 24.1581 42.3092 22.1794 40.3648C20.2007 38.4205 19.2114 35.664 19.2114 32.0955V18.7823H26.0053V31.8897C26.0053 35.7327 27.5264 37.6542 30.5688 37.6542C33.5883 37.6542 35.0981 35.7327 35.0981 31.8897V18.7823H41.789V32.0955C41.789 35.664 40.7997 38.4205 38.821 40.3648C36.8423 42.3092 34.0687 43.2814 30.5002 43.2814Z" fill="white" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_442_153">
            <rect width="61" height="61" fill="white" />
          </clipPath>
        </defs>
      </svg>

    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
