import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Grid, InputAdornment, TextField, CircularProgress, Typography, IconButton  } from '@mui/material';
import { NavLink,  useNavigate} from 'react-router-dom';

// components
import Iconify from '../components/iconify';
import LoadingSpinner from '../components/loadingSpinner/Loader';

const UserPage = () => {  

  const [videoData, setVideoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('reactjs'); // Default search query
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = 'AIzaSyCzIYMXU6wV4h5zh5SvF8BCC5CzzwVkXGo';

  const parseDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1], 10) || 0;
    const minutes = parseInt(match[2], 10) || 0;
    const seconds = parseInt(match[3], 10) || 0;
  
    return `${hours > 0 ? `${hours}:` : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  

  useEffect(() => {
    const fetchVideos = async () => {

      try {
        setIsLoading(true);
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: searchQuery,
            maxResults: 12,
            type: 'video',
            key: API_KEY,
          },
        });
        console.log(response.data);
        const videoIds = response.data.items.map((item) => item.id.videoId);

        const videoDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'contentDetails,snippet',
            id: videoIds.join(','),
            key: API_KEY,
          },
        });

        const videos = response.data.items.map((item, index) => {
          const thumbnails = item.snippet.thumbnails;
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            image: thumbnails ? thumbnails.medium.url : '', // Check if thumbnails exists before accessing its properties
            time: parseDuration(videoDetailsResponse.data.items[index].contentDetails.duration),
            creatorName: item.snippet.channelTitle,
            creatorLogo: thumbnails ? thumbnails.default.url : '', // Check if thumbnails exists before accessing its properties
          };
        });

        setVideoData(videos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);


  return (
    <Container>
      <TextField
        fullWidth
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter search term..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="mingcute:search-line" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isLoading ? <CircularProgress size={20} /> : null}
            </InputAdornment>
          ),
          style: { paddingRight: isLoading ? 12 : 0 }, // Add some padding if loading spinner is visible
        }}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>  
          <Typography variant="h5" gutterBottom mt={2}>
            Search Results for "{searchQuery}"
          </Typography>
          <Grid container spacing={3} >
            {videoData.map((video) => (
              <Grid key={video.id} item xs={12} sm={6} md={4} lg={4}>
                <Card
                  sx={{
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <NavLink
                    to={`/dashboard/catalog/${video.id}`}
                    style={{ textDecoration: 'none', color: '#263238', }} 
                  >
                    <img
                      src={video.image}
                      alt={video.title}
                      style={{ height: 'auto', objectFit: 'cover', maxHeight: '150px', width: '100%' }}
                    />

                    <div style={{ flexGrow: 1, padding: '8px', textDecoration: "none" }}>

                      {/* Truncate the title to a maximum of 2 lines with ellipsis */}
                      <Typography variant="h6" noWrap sx={{ lineHeight: '1.2', height: '2em', overflow: 'hidden',  textDecoration: 'none', }}>
                        {video.title}
                      </Typography>

                      {/* Truncate the description to a maximum of 3 lines with ellipsis */}
                      <Typography variant="body2"  sx={{ lineHeight: '1.3', height: '3.9em', overflow: 'hidden'  }}>
                        {video.description}
                      </Typography>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px',
                        textDecoration: "none",
                      }}
                    >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={video.creatorLogo}
                        alt="Creator Logo"
                        style={{ height: '24px', width: '24px', borderRadius: '50%', marginRight: '8px' }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {video.creatorName}
                      </Typography>
                    </div>

                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {video.time}
                      </Typography>
                    </div>
                  </NavLink>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default UserPage;
