import React, { FC, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import NodeBox from 'components/NodeBox';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Drawflow = require('drawflow');

const ScoreMain: FC = () => {
  useEffect(() => {
    const editor = new Drawflow(document.getElementById('drawflow'));

    const noteTemplete = (title: string, content: string) => `
      <div>
        <div class="title-box">${title}</div>
        <div class="box">
          <p>
            ${content}
          </p>
        </div>
      </div>
    `;

    editor.drawflow = {
      drawflow: {
        Home: {
          data: {
            1: {
              id: 1,
              name: 'measures1',
              data: {},
              class: 'measures1',
              html: noteTemplete('施策', '施策を記入してください'),
              typenode: false,
              inputs: {},
              outputs: {
                output_1: { connections: [{ node: '2', input: 'input_1' }] },
              },
              pos_x: 50,
              pos_y: 50,
            },
            2: {
              id: 2,
              name: 'intermediateObjective',
              data: {},
              class: 'intermediateObjective',
              html: noteTemplete('中間目的', '中間目的を記入してください'),
              typenode: false,
              inputs: {
                input_1: { connections: [{ node: '1', input: 'output_1' }] },
              },
              outputs: {
                output_1: { connections: [{ node: '3', input: 'input_1' }] },
              },
              pos_x: 450,
              pos_y: 50,
            },
            3: {
              id: 3,
              name: 'victoryConditions',
              data: {},
              class: 'victoryConditions',
              html: noteTemplete('勝利条件', '勝利条件を記入してください'),
              typenode: false,
              inputs: {
                input_1: { connections: [{ node: '2', input: 'output_1' }] },
              },
              outputs: {},
              pos_x: 850,
              pos_y: 50,
            },
            4: {
              id: 4,
              name: 'acquisitionGoal',
              data: {},
              class: 'acquisitionGoal',
              html: noteTemplete('獲得目標', '獲得目標を記入してください'),
              typenode: false,
              inputs: {},
              outputs: {},
              pos_x: 850,
              pos_y: 450,
            },
          },
        },
      },
    };

    editor.start();

    // const domContainer = document.querySelectorAll(
    //   '.NodeBox .drawflow_content_node'
    // );
    // domContainer.forEach((element) => {
    //   ReactDOM.render(
    //     React.createElement(NodeBox, { toWhat: 'World' }, null),
    //     element
    //   );
    // });
  }, []);

  return <div id="drawflow" />;
};

export default ScoreMain;
