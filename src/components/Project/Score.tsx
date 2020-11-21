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
  ReactFlowProvider,
} from 'react-flow-renderer';

import Note from './Note';

interface Props {
  stageNumber: number;
}

const strokeStyle = { stroke: '#fff', strokeWidth: '3px' };

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
    position: { x: 50, y: 25 },
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
    position: { x: 450, y: 25 },
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
    position: { x: 850, y: 25 },
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
    position: { x: 850, y: 340 },
  },
  {
    id: 'm1-i1',
    source: 'measures1',
    target: 'intermediateObjective1',
    animated: true,
    style: strokeStyle,
  },
  {
    id: 'i1-v1',
    source: 'intermediateObjective1',
    target: 'victoryConditions1',
    animated: true,
    style: strokeStyle,
  },
];
const initialElements2 = [
  ...initialElements,
  {
    id: 'intermediateObjective2',
    type: 'noteNode',
    data: {
      title: '中間目的',
      content: '中間目的を記入してください',
      hasTarget: true,
      hasSource: true,
    },
    position: { x: 450, y: 240 },
  },
];

const Score: FC<Props> = ({ stageNumber }) => {
  const [elements, setElements] = useState<Elements>([]);
  useEffect(() => {
    setElements(stageNumber === 1 ? initialElements : initialElements2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        onElementClick={(
          event: React.MouseEvent<Element, MouseEvent>,
          element: FlowElement
        ): void => console.log('click', element, event)}
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
        nodeTypes={{ noteNode: Note }}
        connectionLineStyle={{ stroke: '#fff' }}
        onlyRenderVisibleElements={false}
      >
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default Score;
