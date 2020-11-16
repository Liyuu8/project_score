import React, { FC } from 'react';
import { Grid } from 'semantic-ui-react';

import styled from '@emotion/styled';
import ScoreMain from './ScoreMain';
import Plots from './Plots';

const ProjectMain: FC = () => {
  const StyledGrid = styled(Grid)`
    &&& {
      height: calc(100vh - 67px);
      padding: 1rem;
    }
  `;

  return (
    <StyledGrid columns={2} divided>
      <Grid.Column width={3}>
        <Plots />
      </Grid.Column>
      <Grid.Column width={13}>
        <ScoreMain />
      </Grid.Column>
    </StyledGrid>
  );
};

export default ProjectMain;
