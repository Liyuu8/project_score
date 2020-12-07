import React, { FC } from 'react';

import Projects from 'components/Home/Projects';
import { blankProject } from 'services/projectscore/models/project';
import useProjects from 'hooks/use-projects';

const ProjectsContainer: FC = () => {
  const { projects, loading } = useProjects({ limit: 50 });
  const project = {
    ...blankProject,
    title: 'test',
    description: 'test',
  };

  return (
    <Projects
      projects={projects.length !== 0 ? projects : [project]}
      loading={loading}
    />
  );
};

export default ProjectsContainer;
