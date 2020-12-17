import React, { FC } from 'react';

import Projects from 'components/Home/Projects';
import { useProjects } from 'hooks/project';

const ProjectsContainer: FC = () => {
  const { projects, loading } = useProjects({ limit: 50 });

  return projects.length === 0 && !loading ? (
    <></>
  ) : (
    <Projects projects={projects} loading={loading} />
  );
};

export default ProjectsContainer;
