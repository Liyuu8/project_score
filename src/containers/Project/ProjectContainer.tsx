import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { Dimmer, Loader } from 'semantic-ui-react';

import { useProject } from 'hooks/project';
import ProjectMain from 'components/Project/ProjectMain';
import paths from 'utils/paths';

const ProjectContainer: FC = () => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) history.replace(paths.home);
  const { project, loading, error } = useProject(projectId);

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    );
  }
  if (project && !error) {
    return <ProjectMain project={project} />;
  }

  // TODO: エラー画面の実装
  return <div />;
};

export default ProjectContainer;
