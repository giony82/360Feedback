import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function SomeComponent() {
  const { api } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/some-protected-endpoint');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [api]);

  return (
    <div>
      {/* Render your component using the fetched data */}
    </div>
  );
}

export default SomeComponent;
