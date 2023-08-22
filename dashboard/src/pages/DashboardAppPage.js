import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import {useSelector} from 'react-redux'

// components
import Iconify from '../components/iconify';

// sections
import {
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';

import LoadingSpinner from '../components/loadingSpinner/Loader';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [loginTimesChartData, setLoginTimesChartData] = useState([])
  const { userInfo }  = useSelector((state) => state.auth)
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const val = loginTimesChartData.length;
  
  useEffect(() => {
    const getGreeting = () => {
      const currentTime = new Date();
      const nigeriaTimezoneOffset = 60; // Nigeria is UTC+1 (60 minutes ahead of UTC)

      // Adjust the current time to Nigeria time zone
      const nigeriaTime = new Date(currentTime.getTime() + nigeriaTimezoneOffset * 60000);
      const currentHour = nigeriaTime.getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return '🌅 Good Morning';
      } 
      if (currentHour >= 12 && currentHour < 18) {
        return '🌞 Good Afternoon';
      } 
  
      return '🌆 Good Evening';
    };

    const greetingMessage = getGreeting();
    setGreeting(greetingMessage);

    
    // Make an API request to retrieve login times
    // Fetch login times
    axios
      .get(`http://localhost:5000/api/admin/${userInfo._id}/loginTimes`)
      .then((response) => {
        const loginTimes = response.data;

        // Convert login times to the format compatible with chart
        const formattedLoginTimes = loginTimes.map((time) => {
          const date = new Date(time);
          return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        });

        // Process loginTimes to generate chart data
        const chartData = {
          name: 'Login Times',
          type: 'column',
          fill: 'solid',
          data: loginTimes.map((loginTime) => new Date(loginTime).getDate()),
        };

        setLoginTimesChartData(loginTimes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching login times:', error);
        setError(error);
        setIsLoading(false);
      });

  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | UC MS </title>
      </Helmet>
      
      <Container maxWidth="xl" >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi {userInfo.firstName}, {greeting}
        </Typography>

          {isLoading && <LoadingSpinner />}
          {!isLoading && error && <Typography>Error: {error.message}</Typography>}
          {!isLoading && !error && loginTimesChartData && (
            <>
            <Grid item xs={12} marginBottom={3} md={6} lg={8}>
              <AppWebsiteVisits
                title="Login Times"
                // subheader="(+43%) than last year"
                chartLabels={[
                  '01/01/2023',
                  '02/01/2023',
                  '03/01/2023',
                  '04/01/2023',
                  '05/01/2023',
                  '06/01/2023',
                  '07/01/2023',
                  '08/01/2023',
                  '09/01/2023',
                  '10/01/2023',
                  '11/01/2023',
                ]}

                chartData={[
                  {
                    name: 'Screen Time',
                    type: 'column',
                    fill: 'solid',
                    data: [0, 0, 0, 0, 0, 0, 0, val, 0, 0, 0],
                  },
                ]}
              />
            </Grid>

            <Grid container spacing={3}>

              <Grid item xs={12} md={4}>
                <AppWidgetSummary title="Prediction Summary"  sx={{color: "#263238", backgroundColor: "white"}}  icon={'material-symbols:overview-rounded'} />
              </Grid>

              <Grid item xs={12} md={4}>
                <AppWidgetSummary title="Recent Searches"  sx={{color: "#263238", backgroundColor: "white"}}  icon={'streamline:programming-browser-search-search-window-glass-app-code-programming-query-find-magnifying-apps'} />
              </Grid>

              <Grid item xs={12} md={4}>
                <AppWidgetSummary title="Suggested Courses"  sx={{color: "#263238", backgroundColor: "white"}}  icon={'ic:twotone-settings-suggest'} />
              </Grid>
            </Grid>
            </>

            )}
      </Container>
    </>
  );
}
