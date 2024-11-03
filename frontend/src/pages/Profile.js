import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <h2>Profile Page</h2>
      <nav>
        <Link to="settings">Settings</Link>
        <Link to="activity">Activity</Link>
      </nav>
      <Routes>
        <Route path="settings" element={<Settings />} />
        <Route path="activity" element={<Activity />} />
      </Routes>
    </div>
  );
}

function Settings() {
  return <h3>Profile Settings</h3>;
}

function Activity() {
  return <h3>Profile Activity</h3>;
}

export default Profile;
