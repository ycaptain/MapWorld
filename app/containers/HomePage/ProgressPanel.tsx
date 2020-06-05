import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import { doPred, IpcChannels, ResultRequest } from '@/utils/ipc';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { ProgressRequest, ProdMidRequest } from '@/utils/ipc';
import {
  setPredRequest,
  PredRequest,
  reset,
  addBuildings,
} from '@/actions/render';
import { Progress, Select } from 'antd';
import styled from 'styled-components';
import { renderStateType } from '@/reducers/render';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

const { readJSON } = window;

const TransSelect = styled(Select)`
  .ant-select-selector {
    background-color: transparent !important;
    color: #e2e8f0;
  }
`;

const StyledProgress = styled(Progress)`
  .ant-progress-text {
    color: #e2e8f0;
  }
`;

const { Option } = Select;

type Props = {
  positions: { x: number; y: number }[];
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type AlgorithmTypes =
  | 'best'
  | 'deeplab'
  | 'unet'
  | 'cyclegan2map'
  | 'cyclegan2Sate';

const ProgressPanel: React.FC<Props> = ({
  positions,
  predRequest,
  addBuildings,
}) => {
  const [algorithm, setAlgorithm] = useState<AlgorithmTypes>('best');
  const [progress, setProgress] = useState([0, 0]);
  const [results, setResults] = useState<Array<string>>([]);

  const predict = useCallback(() => {
    if (!predRequest || !positions.length) {
      return;
    }

    const {
      imgsPath,
      modelName,
      gpu,
      tmpOptPath,
      prescale,
      batchSize,
    } = predRequest;

    const baseRequest = {
      id: '',
      imgsPath: imgsPath.map(a => a.filePath),
      imgsMeta: positions.map(a => ({ origin: a })),
      modelName,
      gpu,
      tmpOptPath,
      prescale,
      batchSize,
    };

    switch (algorithm) {
      case 'best':
        const buildingRequest = Object.assign({}, baseRequest);
        const roadRequest = Object.assign({}, baseRequest);
        buildingRequest.modelName = 'Building-Deeplab';
        buildingRequest.id = 'Building-Deeplab';
        roadRequest.modelName = 'Road-Deeplab';
        roadRequest.id = 'Road-Deeplab';

        doPred([buildingRequest, roadRequest]);
        break;
      default:
        break;
    }
  }, [predRequest, algorithm]);

  useEffect(() => {
    if (!predRequest) {
      return;
    }

    const handleBatchPred = (event: IpcRendererEvent, args: ProdMidRequest) => {
      const { count, total, id } = args;
      const nextProgress = Array.from(progress);
      console.info('handleBatchPred', args);
      console.info("id === 'Building-Deeplab'", id === 'Building-Deeplab')
      if (id === 'Building-Deeplab') {
        nextProgress[0] = count / total;
      } else {
        nextProgress[1] = count / total;
      }
      setProgress(nextProgress);
    };

    const handleNotifyProgress = (
      event: IpcRendererEvent,
      args: ProgressRequest
    ) => {
      console.info(args);
      const {
        current: count,
        total,
        curr_filename: currFilename,
        id,
        json_path,
      } = args;

      setResults(results.concat(currFilename));
      // setProgress(count / total);
    };

    const handleNotifyResult = async (
      event: IpcRendererEvent,
      args: ResultRequest
    ) => {
      console.info(args);
      const { label_path, json_path, current, total, id } = args;

      const imgNum = predRequest.imgsPath.length;

      const prog = ((1 / imgNum) * current) / total;

      if (id === 'Building-Deeplab') {
        const data = await readJSON(json_path);
        const prefix = label_path.split('_')[0];
        const idx = label_path[label_path.length - 5];
        const rawImg = `${prefix}_Building-Deeplab_RAW_${idx}.png`;
        const roadImg = `${prefix}_${idx}_road.png`;
        addBuildings([{ ...data, labelImg: label_path, rawImg, roadImg }]);
        console.info(data);
      }
    };

    ipcRenderer.on(IpcChannels.NOTIFY_PROGRESS, handleNotifyProgress);
    ipcRenderer.on(IpcChannels.NOTIFY_RESULT, handleNotifyResult);
    ipcRenderer.on(IpcChannels.NOTIFY_BATCH_PRED, handleBatchPred);

    return () => {
      ipcRenderer.removeListener(
        IpcChannels.NOTIFY_PROGRESS,
        handleNotifyProgress
      );
      ipcRenderer.removeListener(IpcChannels.NOTIFY_RESULT, handleNotifyResult);
      ipcRenderer.removeListener(
        IpcChannels.NOTIFY_BATCH_PRED,
        handleBatchPred
      );
    };
  }, []);

  return (
    <div className="flex flex-col items-center py-4 px-12 rounded-lg border border-gray-100 shadow-xl">
      <div className="flex w-full justify-center">
        {/* <div className="flex items-center w-1/4 justify-center">
          <Progress
            percent={Math.round(progress[0] * 100)}
            status="active"
            size="small"
            type="dashboard"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div> */}
        <div className="flex items-center w-1/4 justify-center">
          <StyledProgress
            percent={Math.round(progress[1] * 100)}
            status="active"
            size="small"
            type="dashboard"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>
        {/* <div className="flex py-4 text-gray-200 font-medium justify-center items-center">Batch predict ...</div> */}
      </div>
      <div className="flex flex-col items-center w-full mt-4">
        <div className="flex items-center w-full px-4 justify-center">
          <TransSelect
            showArrow={false}
            className="w-80 mx-2"
            value={algorithm}
            onChange={val => setAlgorithm(val as AlgorithmTypes)}
          >
            <Option value="best">
              <Tooltip
                title="Best: Deep Lab(buildings), UNet(roads)"
                mouseEnterDelay={0.3}
              >
                <span>Best: Deep Lab(buildings), UNet(roads)</span>
              </Tooltip>
            </Option>
            <Option value="deeplab">Deep Lab: buildings and roads</Option>
            <Option value="unet">UNet: buildings and roads</Option>
            <Option value="cyclegan2map">Cycle GAN: satellite to map</Option>
            <Option value="cyclegan2sate">Cycle GAN: map to satellite</Option>
          </TransSelect>
          <Button
            className="mx-2 bg-transparent text-gray-200 hover:bg-teal-500 hover:text-gray-300"
            onClick={() => {
              predict();
              setProgress([0, 0]);
            }}
          >
            Analyze
          </Button>
        </div>
      </div>
    </div>
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
      addBuildings,
      reset,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressPanel);
