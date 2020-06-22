import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Main: React.FC = () => {
  useEffect(() => {
    console.log(window.location.href);
  }, []);
  return (
    <div>
      <h1>React Test</h1>
      <Link to="/">indexへ</Link>
    </div>
  );
};

export default Main;
