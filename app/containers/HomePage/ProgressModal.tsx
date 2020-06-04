import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { PredRequest } from '@/actions/render';
import { useHistory } from 'react-router-dom';
import { doPred, IpcChannels } from '@/utils/ipc';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { ProgressRequest } from '@/utils/ipc';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  predRequest: PredRequest | null;
}

const ProgressModal: React.FC<Props> = ({
  showModal,
  closeModal,
  predRequest,
}) => {
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (!predRequest || !showModal) {
      return;
    }
    const {
      imgsPath,
      imgsMeta,
      modelName,
      gpu,
      tmpOptPath,
      prescale,
      batchSize,
    } = predRequest;
    doPred({
      imgsPath: imgsPath.map(a => a.filePath),
      imgsMeta,
      modelName,
      gpu,
      tmpOptPath,
      prescale,
      batchSize,
    });

    const handleDoPred = (event: IpcRendererEvent, args: any) => {
      debugger;
      console.info(args);
    };
    const handleNotifyProgress = (event: IpcRendererEvent, args: ProgressRequest) => {
      debugger;
      console.info(args);
      const {current: count, total, curr_filename: currFilename} = args;

      setProgress(count / total);
    };
    ipcRenderer.on(IpcChannels.DO_PRED, handleDoPred);
    ipcRenderer.on(IpcChannels.NOTIFY_PROGRESS, handleNotifyProgress);

    return () => {
      ipcRenderer.removeListener(IpcChannels.DO_PRED, handleDoPred);
      ipcRenderer.removeListener(
        IpcChannels.NOTIFY_PROGRESS,
        handleNotifyProgress
      );
    };
  });

  return (
    <Modal
      closable={false}
      visible={showModal}
      onCancel={closeModal}
      okText="Render"
      onOk={() => {
        if (predRequest && predRequest?.imgsPath) {
          history.push('/renderer');
        }
      }}
      cancelText="Cancel"
    >
      Test
    </Modal>
  );
};

export default ProgressModal;
