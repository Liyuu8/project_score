import React, { memo, FC } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Note } from 'services/projectscore/models/note';

import NoteCore from './NoteCore';

interface Props {
  data: {
    projectId: string;
    scoreId: string;
    note: Note;
    noteTitle: string;
    hasTarget: boolean;
    hasSource: boolean;
  };
}

const NoteWrapper: FC<Props> = ({ data }) => {
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
          // onConnect={(params) => console.log('left handle onConnect', params)}
        />
      )}
      <NoteCore
        projectId={data.projectId}
        scoreId={data.scoreId}
        note={data.note}
        noteTitle={data.noteTitle}
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
          // onConnect={(params) => console.log('right handle onConnect', params)}
        />
      )}
    </>
  );
};

export default memo(NoteWrapper);
