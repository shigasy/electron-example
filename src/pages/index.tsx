import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Save from '../components/Save';

const App: React.FC = () => {
  useEffect(() => {
    console.log(window.location.href);
  }, []);
  return (
    <div>
      <h1>React Test</h1>
      <Link to="/main">メインリンク</Link>
      <Save />
    </div>
  );
};

export default App;
