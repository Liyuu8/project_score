import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

import { Project } from 'services/projectscore/models/project';
import { getHumanDate } from '../item-tools';

const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  const CardWrapper = styled(Card)`
    &&& {
      margin: 1rem 0.5rem;
    }
  `;

  return (
    <Link to={`/project/${project.id}`}>
      <CardWrapper
        link
        header={project.title}
        meta={getHumanDate(project.updatedAt)}
        description={project.description}
      />
    </Link>
  );
};

export default ProjectCard;
