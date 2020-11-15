import React, { FC } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import { Project } from 'services/projectscore/models/project';
import styled from '@emotion/styled';
import ScoreMain from './ScoreMain';

const ProjectMain: FC<{ project: Project }> = ({ project }) => {
  const GridWrapper = styled(Grid)`
    &&& {
      height: calc(100vh - 67px);
    }
  `;

  return (
    <GridWrapper columns={2} divided>
      <Grid.Column width={3}>
        <Segment>project: {project.title}</Segment>
      </Grid.Column>
      <Grid.Column width={13}>
        <ScoreMain />
      </Grid.Column>
    </GridWrapper>
  );
};

export default ProjectMain;
