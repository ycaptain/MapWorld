import React from 'react';
import path from 'path';
import { remote } from 'electron';
import { Button } from 'antd';
import { Canvas } from "react-three-fiber";
import Box from './Demo3D';

let styles = require('./Home.less');

const Home = (): JSX.Element => {
  // test python script
  let pyProc = null;
  const createPyProc = () => {
    console.info(remote.app.getAppPath());
    let script = path.join(remote.app.getAppPath(), '..', 'py', 'test.py');
    console.log(script);
    let ch = require('child_process');
    pyProc = ch.spawn('python', [script])
    if (pyProc != null) {
      console.log('child process success')
      pyProc.stdout.on('data', (data: any) => {
        console.log(`stdout: ${data}`);
        new Notification('python', {
          body: `stdout: ${data}`
        })
      });
    } else {
      console.log('hello failed');
    }
  }
  createPyProc();

  return (
    <div>
      <div className={styles.container}>
        <h2>Home</h2>
        <Button type="primary">button</Button>
      </div>
      <div className={styles.container}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
    </div>
  )
}

export default Home;
