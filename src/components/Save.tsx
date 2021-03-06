import React, { useState, useCallback, useEffect } from 'react';
import '../types/core';

const Save: React.FC = () => {
  const [body, setBody] = useState('');
  const onSaveClick = () => {
    window.core.saveText(body);
    console.log('save');
  };
  const onLoadClick = async () => {
    const res = await window.core.openFile();
    if (res === null) {
      return;
    }
    setBody(res);
  };

  const onBodyChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      setBody(value);
    },
    [body]
  );
  useEffect(() => {
    const f = async () => {
      const res = await window.core.initialOpenFile(
        '/Users/shiga/src/github.com/shigasy/electron-example/data/test.txt'
      );
      if (res === null) {
        return;
      }
      setBody(res);
    };
    f();
  }, []);
  return (
    <div>
      <textarea value={body} onChange={onBodyChange} />
      <button type="button" onClick={onSaveClick}>
        Save
      </button>
      <button type="button" onClick={onLoadClick}>
        Load
      </button>
    </div>
  );
};

export default Save;
