import React from 'react';
import { useLocation } from "react-router-dom";


function MissingResourcePage() {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';

  return (
    <>
      <div>
        <p>No such resource with name '{searchQuery}' exists!</p>
      </div>
    </>
  )
};

export default MissingResourcePage