import React, { FC } from 'react';
import { Grid, Tab } from 'semantic-ui-react';
import styled from '@emotion/styled';

import Score from './Score';
import Plots from './Plots';

const ProjectMain: FC = () => {
  const StyledGrid = styled(Grid)`
    &&& {
      height: calc(100vh - 900px);
      padding: 1rem;
    }
  `;

  const panes = [
    {
      menuItem: 'Stage 1',
      pane: {
        key: 'stage1',
        attached: false,
        content: <Score stageNumber={1} />,
      },
    },
    {
      menuItem: 'Stage 2',
      pane: {
        key: 'stage2',
        attached: false,
        content: <Score stageNumber={2} />,
      },
    },
  ];

  return (
    <StyledGrid columns={2}>
      <Grid.Column width={3}>
        <Plots />
      </Grid.Column>
      <Grid.Column width={13}>
        <Tab menu={{ pointing: true }} panes={panes} renderActiveOnly={false} />
      </Grid.Column>
    </StyledGrid>
  );
};

export default ProjectMain;
