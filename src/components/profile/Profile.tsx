//Profile.ts
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState, AppDispatch } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { getProfile } from "../../features/auth/authActions";
import "../../styles/Profile.scss";

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, isLoading, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (accessToken && !profile) {
      dispatch(getProfile(accessToken));
    }
  }, [dispatch, accessToken, profile]);

  const handleLogout = () => {
    // Dispatch the logout action to clear user data
    dispatch(logout());

    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      {profile ? (
        <div className="user-info">
          <div className="user-data">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt="User Avatar"
                width="100"
                height="100"
                className="avatar-image"
              />
            )}
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>

            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
