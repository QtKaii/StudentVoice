import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchUserData } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

interface UserData {
  // Define the structure of your user data here
  // For example:
  username: string;
  email: string;
  // Add other fields as necessary
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {userData && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-2">Welcome, {userData.username}!</h2>
          <p className="mb-4">Email: {userData.email}</p>
          {/* Add more user data fields here as needed */}
        </div>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
