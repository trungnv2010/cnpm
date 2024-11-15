import React from 'react';
import {userLogout} from '@/store'
import { useDispatch } from 'react-redux'
const Home = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(userLogout())
  }
  return( <>
    
      <h2>Welcome to the Home Page 123</h2>
    
      <buntton onClick={handleLogout}>
        logout
      </buntton>
  </>)
};

export default Home;
