
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import {  useParams, useNavigate, Link, NavLink } from 'react-router-dom';
import { Card, Container, Grid, Typography } from '@mui/material';
import LoadingSpinner from '../components/loadingSpinner/Loader';


const VideoPlayer = ({ match }) => {

  const navigate = useNavigate()

  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

    const params = useParams()
  const { videoId } = params;

  const API_KEY = 'AIzaSyCzIYMXU6wV4h5zh5SvF8BCC5CzzwVkXGo';

  const parseDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1], 10) || 0;
    const minutes = parseInt(match[2], 10) || 0;
    const seconds = parseInt(match[3], 10) || 0;
  
    return `${hours > 0 ? `${hours}:` : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet',
            id: videoId,
            key: API_KEY,
          },
        });
        setVideoData(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            relatedToVideoId: videoId,
            maxResults: 6, // You can adjust the number of related videos here
            type: 'video',
            key: API_KEY,
          },
        });
        const videoIds = response.data.items.map((item) => item.id.videoId);

        const videoDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'contentDetails',
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

        setRelatedVideos(videos);
      } catch (error) {
        console.error('Error fetching related videos:', error);
      }
    };

    fetchVideoDetails();
    fetchRelatedVideos();
  }, [videoId]);

  return (
    <Container>
      {videoData ? (
        <>
          <YouTube videoId={videoId} opts={{ width: '100%', height: '500px' }} />
          <h2>{videoData.snippet.title}</h2>
          {showFullDescription ? (
            <>
              <p>{videoData.snippet.description}</p>
              <button onClick={toggleDescription}
              style={{ backgroundColor: '#263238', color: '#fff', padding: '8px 16px', cursor: 'pointer' }}
              >Read Less</button>
            </>
          ) : (
            <>
              <p>{videoData.snippet.description.substring(0, 200)}...</p>
              <button onClick={toggleDescription}
              style={{ backgroundColor: '#263238', color: '#fff', padding: '8px 16px', cursor: 'pointer' }}>Read More</button>
            </>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}

      <h3>Related Videos</h3>
      <Grid container spacing={3}>
        {relatedVideos.map((video) => (
          <Grid key={video.id} item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s', // Add a smooth transition for the hover effect
                '&:hover': {
                  transform: 'scale(1.1)', // Apply the scale transformation on hover
                },
              }}
            >
              <NavLink
                to={`/dashboard/catalog/${video.id}`}
                style={{textDecoration: "none", color: '#263238',}}
              >
                <img
                  src={video.image}
                  alt={video.title}
                  style={{ height: 'auto', objectFit: 'cover', maxHeight: '150px', width: "100%" }}
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
    </Container>
  );
};

export default VideoPlayer;
