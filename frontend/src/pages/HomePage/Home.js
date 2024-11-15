import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '@/store';
const Home = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(userLogout())
  }
  return( <>
    
      <h2>Welcome to the Home Page 123</h2>
      <button onClick={handleLogout}>Đăng xuất</button>
    

  </>)
};

export default Home;
