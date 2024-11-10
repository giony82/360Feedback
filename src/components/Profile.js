import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../queries/userQueries';
import { Box, Typography, Avatar, Chip, CircularProgress } from '@mui/material';

function Profile() {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id: 0 },
  });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error fetching profile: {error.message}</p>;

  const profile = data.userQueries.user;
  return (
    <Box sx={{ pt: 5, pb: 6, background: 'linear-gradient(to right, #bbdefb, #c8e6c9)' }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar src={profile.picture} alt="user-avatar-image" sx={{ width: 128, height: 128, border: '4px solid white' }} />
        </Box>camera
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
            {profile.name}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Mrs <br /> Iasi*
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          {/* Add any additional content here if needed */}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Chip label=".NET DEV" variant="outlined" color="primary" />
          <Chip label="CX Strategy" variant="outlined" color="primary" />
          <Chip label="Project Manager" variant="outlined" color="primary" />
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
