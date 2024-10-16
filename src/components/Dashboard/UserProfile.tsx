import React from 'react';

type UserData = {
  id: string;
  username: string;
  email: string;
};

interface UserProfileProps {
  userData: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-2">Welcome, {userData.username}!</h2>
      <p className="mb-4">Email: {userData.email}</p>
      {/* Add more user data fields here as needed */}
    </div>
  );
};

export default UserProfile;
