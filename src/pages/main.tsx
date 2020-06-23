import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import '../types/core';

const Main: React.FC = () => {
  const onClickSendKey = () => {
    window.core.sendKeyTest();
  };
  const onClickMouseSinWave = () => {
    window.core.sendSineWave();
  };
  useEffect(() => {
    console.log(window.location.href);
  }, []);
  return (
    <div className="main">
      <h1 className="title">React Test</h1>
      <Link to="/">indexへ</Link>
      <button type="button" onClick={onClickSendKey}>
        キー送信
      </button>
      <button type="button" onClick={onClickMouseSinWave}>
        sin波
      </button>
    </div>
  );
};

export default Main;
