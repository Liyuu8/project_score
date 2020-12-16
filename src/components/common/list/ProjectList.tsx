import React, { FC } from 'react';
import { Card } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { Project } from 'services/projectscore/models/project';
import ProjectCard from 'components/common/card/ProjectCard';

const ProjectList: FC<{ projects: Project[] }> = ({ projects }) => {
  const CardGroupWrapper = styled(Card.Group)`
    &&& {
      margin: 0.5rem;
    }
  `;

  return (
    <CardGroupWrapper itemsPerRow={4}>
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </CardGroupWrapper>
  );
};

export default ProjectList;
