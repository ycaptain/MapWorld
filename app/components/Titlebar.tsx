import React, { useState, useEffect } from 'react';
import { remote } from 'electron';
import styled from 'styled-components';
const currentWindow = remote.getCurrentWindow();

const Wrapper = styled.div`
  -webkit-app-region: drag;
  align-items: center;
`;

const Titlebar: React.FC = () => {
  const [isMaximize, setMaximize] = useState(false);

  useEffect(() => {
    currentWindow.on('enter-full-screen', () => {
      setMaximize(true);
    });
    currentWindow.on('leave-full-screen', () => {
      setMaximize(false);
    });

    return () => {
      currentWindow.removeAllListeners('enter-full-screen');
      currentWindow.removeAllListeners('leave-full-screen');
    };
  }, []);

  if (isMaximize) {
    return null;
  }

  return (
    <Wrapper className="flex h-9 w-full bg-gray-300 px-40 flex-grow-0 flex-shrink-0 shadow-xl">
      <div className="flex items-center m-auto font-normal text-base">
        <span role="img">🥳</span>MAP WORLD: Extract and render for your
        satellite map!!!
      </div>
    </Wrapper>
  );
};

export { Titlebar };
