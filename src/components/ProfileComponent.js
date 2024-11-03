import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../queries/userQueries';

function ProfileComponent() {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id: 1 },
  });

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error fetching profile: {error.message}</p>;

  const profile = data.user;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p><strong>Email:</strong> {profile.email}</p>
      {profile.picture && <img src={profile.picture} alt="Profile" />}      
      <h2>My teams</h2>
      <ul>
        {profile.teams.length > 0 ? (
          profile.teams.map(team => (
            <li key={team.id}>{team.name}</li>
          ))
        ) : (
          <li>No teams</li>
        )}
      </ul>
    </div>
  );
}

export default ProfileComponent;
