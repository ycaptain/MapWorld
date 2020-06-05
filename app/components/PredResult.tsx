import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { loadImg } from '@/utils/file';

const Wrapper = styled.div`
  background: rgba(10, 10, 10, 0.5);
`;

interface Props {
  className?: string;
}

const PredResult: React.FC<Props> = ({ className, ...rest }) => {
  const [blobUrl, setBlobUrl] = useState('');
  const [predBlobUrl, setPredBlobUrl] = useState('');
  const [showPred, setShowPred] = useState(false);

  useEffect(() => {
    (async () => {
      const img = await loadImg(
        '/Users/ycaptain/workspace/2020/learning/electron/MapWorld/MapWorld-pred/tmp/results/6ca2d6f6_0.png'
      );
      setBlobUrl(img);

      const predImg = await loadImg(
        '/Users/ycaptain/workspace/2020/learning/electron/MapWorld/MapWorld-pred/tmp/results/6ca2d6f6_Building-Deeplab_0.png'
      );
      setPredBlobUrl(predImg);
    })();
  }, []);

  return (
    <Wrapper
      className={classnames(
        'group flex h-32 py-2 items-center hover:bg-teal-500 hover:text-black',
        className
      )}
      {...rest}
    >
      <img
        className="ml-4 w-20 h-20 bg-red-500 object-contain rounded"
        onMouseEnter={() => setShowPred(true)}
        onMouseOut={() => setShowPred(false)}
        {...(blobUrl && { src: showPred ? predBlobUrl : blobUrl })}
      />
      <div className="flex flex-col items-center flex-1">
        <div className="font-medium text-lg">6ca2d6f6_0</div>
        <div>description</div>
      </div>
    </Wrapper>
  );
};

export { PredResult };
