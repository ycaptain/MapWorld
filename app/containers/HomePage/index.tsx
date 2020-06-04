import React, { memo, useState } from 'react';
import { Box, Canvas } from '@/components/renderer';
import Title from './Title';
import Pred from './Pred';
import classnames from 'classnames';

const BackBoxes: React.FC = memo(() => {
  return (
    <Canvas className={'w-full h-full'}>
      {Array(71)
        .fill(undefined)
        .map((_, idx) => {
          const x = (Math.random() - 0.5) * 10;
          const y = (Math.random() - 0.5) * 10;
          const z = (Math.random() - 0.5) * 10;
          const rotValocity = 0.01 + (Math.random() - 0.5) * 0.02;

          return (
            <Box
              key={idx}
              position={[x, y, z]}
              size={{ x: 0.5, y: 0.5, z: 0.5 }}
              rotValocity={rotValocity}
            />
          );
        })}
    </Canvas>
  );
});

const HomePage: React.FC = () => {
  const [isOnTransition, setOnTransition] = useState(false);
  const [showPred, setShowPred] = useState(false);

  return (
    <div className="w-full h-full relative">
      <BackBoxes />
      <Title
        className={classnames(
          `transition-all duration-500 ease-in-out ${
            showPred ? 'invisible bottom-10 opacity-50 scale-50' : 'top-1/2 -translate-y-1/2'
          }`
        )}
        openPredPanel={() => {
          setOnTransition(true);
          setShowPred(true);
        }}
        onAnimationEnd={() => {
          if (!isOnTransition || !showPred) {
            return;
          }
          setOnTransition(false);
        }}
      />
      <Pred setShowPred={setShowPred} className={classnames({"invisible": !showPred || isOnTransition})} />
    </div>
  );
};

export default HomePage;
