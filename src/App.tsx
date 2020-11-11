import React, { FC } from 'react';

const App: FC = () => {
  return (
    <div className="App">
      <header>
        <h2>Project Score</h2>
      </header>
      <div className="wrapper">
        <div className="col" />
        <div className="col-right">
          <div id="drawflow" />
        </div>
      </div>
    </div>
  );
};

export default App;
