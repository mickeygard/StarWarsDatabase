import React from 'react'
import "../Error404Page.css";


function Error404Page() {

  const backgroundStyles = {
    backgroundImage: 'url("src/components/images/yoda.jpg")',
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

  return (
    <div style={backgroundStyles}>
      <div className="error-page-container">
      <h2>Page not found, 404 is</h2>
    </div>
    </div>
  );
}

export default Error404Page;