import React from 'react';

let styles = require('./Home.scss');

const Home = (): JSX.Element => {
  return (
    <div>
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
      </div>
    </div>
  )
}

export default Home;
