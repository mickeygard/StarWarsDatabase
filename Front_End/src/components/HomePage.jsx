import React from 'react';
import "../index.css";


const HomePage = ({ isActive }) => {

  
  const backgroundStyles = {
    backgroundImage: 'url("src/components/images/4lanscapes.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const boxStyles = {
    backgroundColor: 'rgba(128, 128, 128, 0.7)', // Gray with 50% transparency
    color: 'black',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '80%',
    margin: '0 auto'
  };

  return (
    <div style={backgroundStyles}>
     <div style={boxStyles}>
      <h3>This page was created to fill a gap in information found on the leading Star Wars APIs. I found 
        that there was a need to consolidate the information that can be found on the web into one resource,
        and this is how I've chosen to do it. Each page will show a list of resources that fall under that 
        category, with a search bar set to search that category only.
      </h3>
    </div>
    </div>
  )
};

export default HomePage;