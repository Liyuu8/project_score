import React, { FC } from 'react';

type Props = {
  name: string;
};

const NodeClick: FC<Props> = ({ name }) => {
  return (
    <div className="card-devices">
      <div className="header">
        <h1>{name}</h1>
      </div>
      <div className="body">
        <input type="text" />
        <span onClick={() => alert('hello-drawflow')}>Name :</span>
      </div>
    </div>
  );
};

export default NodeClick;
