import React from 'react';
import '../types/core';

const Save: React.FC = () => {
  const onSaveClick = () => {
    window.core.saveText('test');
    console.log('save');
  };
  return (
    <div>
      <button type="button" onClick={onSaveClick}>
        Save
      </button>
    </div>
  );
};

export default Save;
