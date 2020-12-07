import React, { FC, useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Elements,
  Connection,
  Edge,
  ReactFlowProvider,
} from 'react-flow-renderer';

import { NoteData } from 'hooks/use-project';
import { noteElements } from 'services/projectscore/constants';
import { NoteConnection } from 'services/projectscore/models/connection';
import NoteWrapper from './NoteWrapper';

interface Props {
  noteDataList: NoteData[];
  noteConnections: NoteConnection[];
}

const strokeStyle = { stroke: '#fff', strokeWidth: '3px' };

const ScoreCore: FC<Props> = ({ noteDataList, noteConnections }) => {
  const initElements = [
    ...noteDataList.map((noteData) => ({
      id: noteData.note.id,
      type: 'noteNode',
      data: {
        id: noteData.note.id,
        title: noteElements[noteData.note.type].name,
        content: noteData.note.content
          ? noteData.note.content
          : `${noteElements[noteData.note.type].name}を記入してください`,
        hasTarget: noteElements[noteData.note.type].hasTarget,
        hasSource: noteElements[noteData.note.type].hasSourse,
      },
      position: { x: noteData.note.posX, y: noteData.note.posY },
    })),
    ...noteConnections.map((connection) => ({
      id: connection.id,
      source: connection.sourceNoteId,
      target: connection.targetNoteId,
      animated: true,
      style: strokeStyle,
    })),
  ];

  const [elements, setElements] = useState<Elements>(initElements);

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        // onElementClick={(
        //   event: React.MouseEvent<Element, MouseEvent>,
        //   element: FlowElement
        // ): void => console.log('click', element, event)}
        onElementsRemove={(elementsToRemove: Elements) =>
          setElements((element) => removeElements(elementsToRemove, element))
        }
        onConnect={(params: Edge | Connection) =>
          setElements((element) =>
            addEdge({ ...params, animated: true, style: strokeStyle }, element)
          )
        }
        style={{
          background: '#EDEDED',
          height: 'calc(100vh - 290px)',
        }}
        nodeTypes={{ noteNode: NoteWrapper }}
        connectionLineStyle={{ stroke: '#fff' }}
        onlyRenderVisibleElements={false}
      >
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default ScoreCore;
