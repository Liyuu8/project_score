import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router';

import ProjectMain from 'components/Project/ProjectMain';
import paths from 'utils/paths';

const ProjectContainer: FC = () => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) history.replace(paths.home);

  return <ProjectMain projectId={projectId} />;
};

export default ProjectContainer;
