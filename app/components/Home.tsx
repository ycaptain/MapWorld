import React from 'react';
import path from 'path';
import { remote } from 'electron';

let styles = require('./Home.scss');

const Home = (): JSX.Element => {
  // test python script
  let pyProc = null;
  const createPyProc = () => {
    console.warn(remote.app.getAppPath());
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
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
      </div>
    </div>
  )
}

export default Home;
