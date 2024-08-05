'use client'; // Client Component로 설정

import React from 'react';
import Login from './Login';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Chat App</h1>
      <Login />
    </div>
  );
};

export default HomePage;
