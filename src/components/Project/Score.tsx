import React, { FC, useEffect, useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Elements,
  Position,
  Connection,
  Edge,
  FlowElement,
} from 'react-flow-renderer';

import Note from './Note';

const initialElements = [
  {
    id: 'measures1',
    type: 'noteNode',
    data: {
      title: '施策',
      content: '施策を記入してください',
      findings: [
        {
          id: 'findings11',
          title: '得られた知見を入力する',
          isGood: true,
        },
      ],
      hasTarget: false,
      hasSource: true,
    },
    position: { x: 50, y: 50 },
    sourcePosition: Position.Right,
  },
  {
    id: 'measures2',
    type: 'noteNode',
    data: {
      title: '施策',
      content: '施策を記入してください',
      findings: [
        {
          id: 'findings21',
          title: '得られた知見を入力する',
          isGood: false,
        },
      ],
      hasTarget: false,
      hasSource: true,
    },
    position: { x: 50, y: 250 },
    sourcePosition: Position.Right,
  },
  {
    id: 'intermediateObjective1',
    type: 'noteNode',
    data: {
      title: '中間目的',
      content: '中間目的を記入してください',
      hasTarget: true,
      hasSource: true,
    },
    position: { x: 450, y: 50 },
  },
  {
    id: 'victoryConditions1',
    type: 'noteNode',
    data: {
      title: '勝利条件',
      content: '勝利条件を記入してください',
      hasTarget: true,
      hasSource: false,
    },
    position: { x: 850, y: 50 },
  },
  {
    id: 'acquisitionGoal',
    type: 'noteNode',
    data: {
      title: '獲得目標',
      content: '獲得目標を記入してください',
      hasTarget: false,
      hasSource: false,
    },
    position: { x: 850, y: 450 },
  },
  {
    id: 'm1-i1',
    source: 'measures1',
    target: 'intermediateObjective1',
    animated: true,
    style: { stroke: '#fff', strokeWidth: '3px' },
  },
  {
    id: 'i1-v1',
    source: 'intermediateObjective1',
    target: 'victoryConditions1',
    animated: true,
    style: { stroke: '#fff', strokeWidth: '3px' },
  },
];

const Score: FC = () => {
  const [elements, setElements] = useState<Elements>([]);
  useEffect(() => {
    setElements(initialElements);
  }, []);

  return (
    <ReactFlow
      elements={elements}
      onElementClick={(
        event: React.MouseEvent<Element, MouseEvent>,
        element: FlowElement
      ): void => console.log('click', element, event)}
      onElementsRemove={(elementsToRemove: Elements) =>
        setElements((els) => removeElements(elementsToRemove, els))
      }
      onConnect={(params: Edge | Connection) =>
        setElements((els) =>
          addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, els)
        )
      }
      style={{ background: '#cacaca' }}
      onLoad={(reactFlowInstance: any) => {
        console.log('flow loaded:', reactFlowInstance);
        setTimeout(() => reactFlowInstance.fitView(), 1);
      }}
      nodeTypes={{ noteNode: Note }}
      connectionLineStyle={{ stroke: '#fff' }}
      snapToGrid
      defaultZoom={1.5}
    >
      <Controls />
    </ReactFlow>
  );
};

export default Score;
