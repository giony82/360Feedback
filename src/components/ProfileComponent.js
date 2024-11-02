import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

function ProfileComponent() {
  const { api } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [api]);

  return (
    <div>
      {profile ? (
        <div className="mt-6">
          <p className="text-lg"><strong>Name:</strong> {profile.name}</p>
          <p className="text-lg"><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : (
        <p className="mt-6">Loading profile...</p>
      )}
    </div>
  );
}

export default ProfileComponent;
