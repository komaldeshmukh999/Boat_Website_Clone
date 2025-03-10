import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { Context } from '../utils/context';


const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [editedUsername, setEditedUsername] = useState('');
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

 const{ProfilePage,setProfilePage}=useContext(Context)
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        const response = await axios.get('http://localhost:1337/api/users/me', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setUserData({
          username: response.data.username,
          email: response.data.email,
        });
        setEditedUsername(response.data.username);
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
      }
      setError('Failed to fetch profile data.');
    }
  };

  const handleUsernameChange = (e) => {
    setEditedUsername(e.target.value);
  };

  const handleUpdateUsername = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        await axios.put(
          'http://localhost:1337/api/users/me',
          { username: editedUsername },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setUserData({ ...userData, username: editedUsername });
        setError(null);
        setUpdateSuccess(true);
        alert("Profile updated!");
      }
    } catch (err) {
      console.error('Failed to update username:', err);
      setError('Failed to update username.');
      setUpdateSuccess(false);
    }
  };

  const handleClose = () => {

  };

  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup-content">
        <h2>Profile</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="profile-info">
          <h3>Profile Information</h3>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {updateSuccess && <p className="success-message">Username updated successfully!</p>}
        </div>

        <div className="username-edit">
          <label htmlFor="username">Edit Username:</label>
          <input
            type="text"
            id="username"
            value={editedUsername}
            onChange={handleUsernameChange}
          />
          <button onClick={handleUpdateUsername}>Update Username</button>
        </div>
        <button onClick={()=>setProfilePage(false)} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default ProfilePage;