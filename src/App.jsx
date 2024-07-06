import React from 'react';
import { Outlet } from 'react-router-dom';
import MyNavBar from './components/Navbar';

function App() {
  return (
    <div>
      <MyNavBar />
      <Outlet />
    </div>
  );
}

export default App;