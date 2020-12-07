import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { Dimmer, Loader } from 'semantic-ui-react';

import useProject from 'hooks/use-project';
import ProjectMain from 'components/Project/ProjectMain';
import paths from 'paths';

const ProjectContainer: FC = () => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) history.replace(paths.home);
  const { projectScore, loading, error } = useProject(projectId);

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    );
  }
  if (projectScore && !error) {
    return <ProjectMain projectScore={projectScore} />;
  }

  // TODO: エラー画面の実装
  return <div />;
};

export default ProjectContainer;
