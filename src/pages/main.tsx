import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

const Main: React.FC = () => {
  useEffect(() => {
    console.log(window.location.href);
  }, []);
  return (
    <div className="main">
      <h1 className="title">React Test</h1>
      <Link to="/">indexへ</Link>
    </div>
  );
};

export default Main;
