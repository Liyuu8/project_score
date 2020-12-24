import { useConnections, useNotes } from 'hooks/project';
import React, { FC, useEffect, useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Elements,
  Connection,
  Edge,
  ReactFlowProvider,
} from 'react-flow-renderer';

import { noteElements } from 'services/projectscore/constants';
import NoteWrapper from './NoteWrapper';

interface Props {
  projectId: string;
  scoreId: string;
}

const strokeStyle = { stroke: '#fff', strokeWidth: '3px' };

const ScoreCore: FC<Props> = ({ projectId, scoreId }) => {
  const { notes } = useNotes(projectId, scoreId);
  const { connections } = useConnections(projectId, scoreId);
  const [elements, setElements] = useState<Elements>([]);

  useEffect(() => {
    setElements([
      ...notes.map((note) => ({
        id: note.id,
        type: 'noteNode',
        data: {
          projectId,
          scoreId,
          note,
          noteTitle: noteElements[note.type].name,
          hasTarget: noteElements[note.type].hasTarget,
          hasSource: noteElements[note.type].hasSourse,
        },
        position: { x: note.posX, y: note.posY },
      })),
      ...connections.map((connection) => ({
        id: connection.id,
        source: connection.sourceNoteId,
        target: connection.targetNoteId,
        animated: true,
        style: strokeStyle,
      })),
    ]);
  }, [connections, notes, projectId, scoreId]);

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
