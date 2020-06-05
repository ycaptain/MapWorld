import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Modal } from 'antd';
import { openFiles, loadImg } from '@/utils/file';
import { Tooltip } from '@/components';
import styled, { keyframes } from 'styled-components';
// @ts-ignore
import { bounce } from 'react-animations';
import { renderStateType } from '@/reducers/render';
import { bindActionCreators, Dispatch } from 'redux';
import { setPredRequest, PredRequest, addBuildings } from '@/actions/render';
import ProgressPanel from './ProgressPanel';


// const bounceAnimation = keyframes`${bounce}`;

// const BounceBtn = styled(Button)`
//   animation: 1s ${bounceAnimation};
// `;

const TransInput = styled(Input)`
  .ant-input-group-addon,
  .ant-input {
    background: transparent;
    color: white;
  }
`;

const Wrapper = styled.div`
  background: rgba(10, 10, 10, 0.5);
`;

type Props = {
  className?: string;
  setShowPred: Function;
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Pred: React.FC<Props> = ({
  className,
  setShowPred,
  predRequest,
  setPredRequest,
  ...rest
}) => {
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>(
    []
  );
  const history = useHistory();

  return (
    <Wrapper
      className={classnames(
        'absolute flex flex-col left-0 right-0 mx-auto w-1/2 h-3/4 rounded-lg top-1/2 transform -translate-y-1/2 shadow-xl',
        className
      )}
      {...rest}
    >
      <header className="w-full flex items-center bg-indigo-500 rounded-t-lg p-2">
        <FontAwesomeIcon
          size="lg"
          className="absolute right-0 mr-3 my-auto cursor-pointer hover:text-teal-500"
          icon={faTimesCircle}
          onClick={() => setShowPred(false)}
        />
        <div className="flex w-full text-gray-100 text-lg justify-center">
          Choose Satellite Map Images to Render
        </div>
      </header>
      <main className="flex flex-col px-8 py-4 w-full h-full">
        <div className="overflow-y-auto h-1/2 px-4 mb-4">
          <div className="w-full mb-20 flex flex-wrap">
            {predRequest.imgsPath.length !== 0 ? (
              predRequest.imgsPath.map(({ filePath, blob }, idx) => (
                <div className="flex w-1/2 h-20 p-2 items-center" key={idx}>
                  <Tooltip title={filePath}>
                    <img
                      src={blob}
                      className="w-16 h-16 bg-teal-500 transform hover:scale-125"
                    />
                  </Tooltip>
                  <div className="flex flex-col items-center justify-around px-4">
                    <TransInput
                      addonBefore="X"
                      addonAfter="px"
                      type="number"
                      value={positions[idx] ? positions[idx].x : undefined}
                      onChange={e =>
                        setPositions(
                          Array.from({
                            ...positions,
                            [idx]: {
                              y: positions[idx].y,
                              x: Number(e.target.value),
                            },
                            length: positions.length,
                          })
                        )
                      }
                    />
                    <TransInput
                      addonBefore="Y"
                      addonAfter="px"
                      type="number"
                      value={positions[idx] ? positions[idx].y : undefined}
                      onChange={e =>
                        setPositions(Array.from({
                          ...positions,
                          [idx]: {
                            x: positions[idx].x,
                            y: Number(e.target.value),
                          },
                          length: positions.length,
                        }))
                      }
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex w-full h-full text-lg text-gray-200">
                You chose nothing...
              </div>
            )}
          </div>
        </div>
        <ProgressPanel predRequest={predRequest} addBuildings={addBuildings} positions={positions} />
      </main>
      <footer className="absolute bottom-0 h-12 w-full flex justify-center mb-4">
        <Tooltip title="Open">
          <Button
            shape="round"
            className="mr-2 bg-gray-300 my-auto hover:bg-teal-500 text-gray-200 hover:text-gray-300"
            onClick={async () => {
              const { fs, os, path } = window;
              const tmpFolder =
                predRequest.tmpOptPath ||
                (await fs.promises.mkdtemp(path.join(os.tmpdir(), 'mapworld')));

              const filePaths = await openFiles();
              if (!filePaths) {
                return;
              }
              const blobs = await Promise.all(filePaths.map(a => loadImg(a)));

              const nextPredRequest = {
                ...predRequest,
                imgsPath: filePaths.map((filePath, idx) => ({
                  filePath,
                  blob: blobs[idx],
                })),
                tmpOptPath: tmpFolder,
              } as PredRequest;
              setPositions(Array(filePaths.length).fill({ x: 0, y: 0 }));
              setPredRequest(nextPredRequest);
            }}
          >
            Choose Images
          </Button>
        </Tooltip>

        <Tooltip title="you need to choose files and get analyzation">
          <Button
            shape="round"
            className="ml-2 bg-gray-300 my-auto hover:bg-teal-500 text-gray-200 hover:text-gray-300"
            onClick={() => {
              // setPredRequest({
              //   ...predRequest,
              //   imgsMeta: positions.map(a => ({ origin: a })),
              // } as PredRequest);
              history.push('/renderer');
            }}
          >
            Render
          </Button>
        </Tooltip>
      </footer>
    </Wrapper>
  );
};

function mapStateToProps(state: renderStateType) {
  return {
    predRequest: state.render.predRequest,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setPredRequest,
      addBuildings,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Pred);
