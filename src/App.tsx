import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Index from './pages/index';
import Main from './pages/main';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Route exact path="/" component={Index} />
      <Route path="/main" component={Main} />
    </HashRouter>
  );
};

export default App;
