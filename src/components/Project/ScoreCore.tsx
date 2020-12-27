import React, { FC, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Controls,
  Elements,
  Connection,
  Edge,
  ReactFlowProvider,
  FlowElement,
} from 'react-flow-renderer';

import { Note, noteElements } from 'services/projectscore/models/note';
import {
  useConnectionAction,
  useConnections,
  useNoteAction,
  useNotes,
} from 'hooks/project';
import NoteWrapper from './NoteWrapper';

interface Props {
  projectId: string;
  scoreId: string;
}

const strokeStyle = { stroke: '#fff', strokeWidth: '3px' };
const selectedStrokeStyle = { stroke: '#f00', strokeWidth: '3px' };

const ScoreCore: FC<Props> = ({ projectId, scoreId }) => {
  const { notes } = useNotes(projectId, scoreId);
  const { connections } = useConnections(projectId, scoreId);
  const { updateNote } = useNoteAction();
  const { addConnection, deleteConnection } = useConnectionAction();
  const [flowElements, setFlowElements] = useState<Elements>([]);

  const flowElementsMemo = useMemo(() => {
    return () => {
      if (notes.length === 0 && connections.length === 0) {
        return;
      }
      setFlowElements([
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
    };
  }, [connections, notes, projectId, scoreId]);

  useEffect(() => {
    flowElementsMemo();
  }, [flowElementsMemo]);

  const styleSelectedConnection = (elements: Elements | null) => {
    const selectedConnection =
      elements &&
      connections.find((connection) => connection.id === elements[0].id);

    const getSelectedElement = (flowElement: FlowElement) => ({
      ...flowElement,
      style: selectedStrokeStyle,
    });
    const getNotSelectedElement = (flowElement: FlowElement) =>
      connections.some((connection) => connection.id === flowElement.id)
        ? { ...flowElement, style: strokeStyle }
        : flowElement;

    const updatedFlowElements: Elements = flowElements.map((flowElement) =>
      flowElement.id === selectedConnection?.id
        ? getSelectedElement(flowElement)
        : getNotSelectedElement(flowElement)
    );

    setFlowElements(updatedFlowElements);
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={flowElements}
        style={{
          background: '#EDEDED',
          height: 'calc(100vh - 290px)',
        }}
        nodeTypes={{ noteNode: NoteWrapper }}
        connectionLineStyle={{ stroke: '#fff' }}
        onlyRenderVisibleElements={false}
        onNodeDragStop={(e, node) => {
          const updatedNote = {
            ...notes.find((note) => note.id === node.id),
            posX: node.position.x,
            posY: node.position.y,
          } as Note;
          updateNote(projectId, scoreId, updatedNote);
        }}
        onConnect={(params: Edge | Connection) =>
          params.source &&
          params.target &&
          addConnection(projectId, scoreId, params.source, params.target)
        }
        onElementsRemove={(elements: Elements) =>
          deleteConnection(projectId, scoreId, elements[0].id)
        }
        onSelectionChange={styleSelectedConnection}
      >
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default ScoreCore;
