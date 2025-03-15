import { useEffect, useState } from 'react';
import './UserProfile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await fetch('https://donate-api-2.onrender.com/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  const getInitials = () => {
    if (userData.username) {
      return userData.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const personalDetailsFields = [
    { key: 'fullname', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone_number', label: 'Phone Number' },
  ];

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {userData ? (
        <div className="profile-container">
          {/* Profile Photo */}
          <div className="profile-photo">
            <span>{getInitials()}</span>
          </div>

          {/* Personal Details */}
          <div className="profile-sections">
            <div className="section personal-details">
              <h3>Personal Details</h3>
              <div className="profile-details">
                {personalDetailsFields.map((field) => (
                  <p key={field.key}>
                    <strong>{field.label}:</strong> {userData[field.key]}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;