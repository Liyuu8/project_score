import React, { FC } from 'react';
import styled from '@emotion/styled';

import { Project } from 'services/projectscore/models/project';
import ProjectList from 'components/common/list/ProjectList';
import SizedLoader from 'components/common/atoms/SizedLoader';

type ProjectsProps = { projects: Project[]; loading?: boolean };

const Projects: FC<ProjectsProps> = ({ projects, loading }) => {
  const StyledDiv = styled.div`
    padding: 1rem;
  `;

  return (
    <StyledDiv>
      {loading ? (
        <SizedLoader size="wide" />
      ) : (
        <ProjectList projects={projects} />
      )}
    </StyledDiv>
  );
};

export default Projects;
