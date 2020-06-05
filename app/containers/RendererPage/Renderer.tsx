import React, { useEffect, useState } from 'react';
import { Canvas, Axes, Controller, Ground } from '@/components/renderer';
import sateTextureUrl from '../../../resources/textures/a00d13ba_RAW_0.png';
import roadTextureUrl from '../../../resources/textures/a00d13ba_0_road.png';
import { TextureLoader } from 'three';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { renderStateType } from '@/reducers/render';
import { addBuildings, reset } from '@/actions/render';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Renderer: React.FC<Props> = ({ buildings }) => {
  const [texture, setTexture] = useState<any>(null);
  const [texture2, setTexture2] = useState<any>(null);

  useEffect(() => {
    setTexture(new TextureLoader().load(sateTextureUrl));
    setTexture2(new TextureLoader().load(roadTextureUrl));
  }, [sateTextureUrl, roadTextureUrl]);

  return (
    <Canvas camera={{ position: [15, 15, 5], up: [0, 0, 1] }}>
      {[buildings[0]].map((rawBuilding, idx) => {
        return (
          <Ground
            key={idx}
            buildings={rawBuilding.buildings}
            // sateImage={texture}
            // roadImage={texture2}
            sateImage={new TextureLoader().load(rawBuilding.rawImg)}
            roadImage={new TextureLoader().load(rawBuilding.roadImg)}
            meta={rawBuilding.meta}
          />
        );
      })}
      <Axes />
      <Controller />
    </Canvas>
  );
};

function mapStateToProps(state: renderStateType) {
  return {
    buildings: state.render.buildings,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addBuildings,
      reset,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Renderer);
