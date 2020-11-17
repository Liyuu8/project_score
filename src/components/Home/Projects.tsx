import React, { FC } from 'react';
import styled from '@emotion/styled';

import { Project } from 'services/projectscore/models/project';
// import ProjectList from 'components/common/list/ProjectList';
// import ListLoader from 'components/common/atoms/ListLoader';

type ProjectsProps = { projects: Project[]; loading?: boolean };

const Projects: FC<ProjectsProps> = ({ projects, loading }) => {
  const StyledDiv = styled.div`
    padding: 1rem;
  `;

  return (
    <StyledDiv>
      Your Projects ／ projects: {projects[0].title}, loading: {loading}
      {/* {loading ? <ListLoader /> : <ProjectList projects={projects} />} */}
    </StyledDiv>
  );
};

export default Projects;