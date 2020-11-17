import React, { FC, useEffect } from 'react';

import createNote from 'components/Project/Note';
import 'styles/drawflow.css';
// import { Menu, Popup } from 'semantic-ui-react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Drawflow = require('drawflow');

const Score: FC = () => {
  // const [open, setOpen] = useState(false);
  // const onMenuClick = () => setOpen((prevOpen) => !prevOpen);
  const onMenuClick = () => console.log('clicked!!');

  useEffect(() => {
    const editor = new Drawflow(document.getElementById('drawflow'));

    editor.drawflow = {
      drawflow: {
        Home: {
          data: {
            1: {
              id: 1,
              name: 'measures1',
              data: {},
              class: 'measures1',
              html: createNote({
                title: '施策',
                content: '施策を記入してください',
                findings: '得られた知見を入力する',
                isGood: true,
              }),
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
              html: createNote({
                title: '中間目的',
                content: '中間目的を記入してください',
              }),
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
              html: createNote({
                title: '勝利条件',
                content: '勝利条件を記入してください',
              }),
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
              html: createNote({
                title: '獲得目標',
                content: '獲得目標を記入してください',
              }),
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
  }, []);

  useEffect(() => {
    const domContainer = document.querySelectorAll('button.ui.mini.icon');
    domContainer.forEach((element) => {
      element.addEventListener('click', onMenuClick);
      // <Popup basic onClose={() => setOpen(false)} open={open}>
      //   <Menu
      //     items={[
      //       { key: 'copy', content: 'Copy', icon: 'copy' },
      //       { key: 'code', content: 'View source code', icon: 'code' },
      //     ]}
      //     onItemClick={() => setOpen(false)}
      //     secondary
      //     vertical
      //   />
      // </Popup>;
    });
  }, []);

  return <div id="drawflow" />;
};

export default Score;
