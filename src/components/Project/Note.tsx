import React, { memo, FC } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import NoteCore from './NoteCore';

interface Props {
  data: {
    title: string;
    content: string;
    findings?: {
      id: string;
      title: string;
      isGood: boolean;
    }[];
    hasTarget: boolean;
    hasSource: boolean;
  };
}

const Note: FC<Props> = ({ data }) => {
  return (
    <>
      {data.hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            background: '#fff',
            padding: '3px',
            borderColor: '#aaa',
            borderWidth: '2px',
          }}
          onConnect={(params) => console.log('left handle onConnect', params)}
        />
      )}
      <NoteCore
        title={data.title}
        content={data.content}
        findings={data.findings}
      />
      {data.hasSource && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            background: '#fff',
            padding: '3px',
            borderColor: '#aaa',
            borderWidth: '2px',
          }}
          onConnect={(params) => console.log('right handle onConnect', params)}
        />
      )}
    </>
  );
};

export default memo(Note);
