import React from 'react';

import Header from '../../components/header/Header';
import Topbar from '../../components/topbar/Topbar';
import './Home.css';

function Home() {
  // Accessing user ID from URL parameters


  return (
    <div className='home'>
      <Topbar />
      <Header />
   
    </div>
  );
}

export default Home;
