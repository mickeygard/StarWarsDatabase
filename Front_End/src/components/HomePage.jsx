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
        category, with a search bar set to search that category only. <br/>
        <br/>
        The Star Wars franchise depicts the adventures of characters "A long time ago in a galaxy far, far away" 
        across multiple fictional eras, in which humans and many species of aliens (often humanoid) co-exist 
        with robots (typically referred to in the films as 'droids'), which may be programmed for personal 
        assistance or battle. Space travel between planets is common due to lightspeed hyperspace technology. 
        The planets range from wealthy, planet-wide cities to deserts scarcely populated by primitive tribes. 
        Virtually any Earth biome, along with many fictional ones, has its counterpart as a Star Wars planet 
        which, in most cases, teem with sentient and non-sentient alien life. The franchise also makes use of 
        other astronomical objects such as asteroid fields and nebulae. Spacecraft range from small starfighters
         to large capital ships, such as the Star Destroyers, as well as space stations such as the moon-sized 
         Death Stars. Telecommunication includes two-way audio and audiovisual screens, holographic projections,
          and hyperspace transmission.
      </h3>
    </div>
    </div>
  )
};

export default HomePage;