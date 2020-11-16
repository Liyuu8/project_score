import React, { FC } from 'react';
// import { useHistory, useParams } from 'react-router';

// import useProject from 'hooks/use-project';
import ProjectMain from 'components/Project/ProjectMain';
// import paths from 'paths';

const ProjectContainer: FC = () => {
  // const history = useHistory();
  // const { projectId } = useParams<{ projectId: string }>();
  // if (!projectId) history.replace(paths.home);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // const { project } = useProject(projectId);

  // return project ? <ProjectMain project={project} /> : <div />;

  return <ProjectMain />;
};

export default ProjectContainer;
