import React from 'react';
import { useLocation } from "react-router-dom";


function MissingResultPage() {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';

  return (
    <>
      <div>
        <p>'{searchQuery}' </p>
      </div>
    </>
  )
};

export default MissingResultPage