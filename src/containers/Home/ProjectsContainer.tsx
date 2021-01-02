import React, { FC, useContext } from 'react';

import Projects from 'components/Home/Projects';
import { UserContext } from 'contexts';

const ProjectsContainer: FC = () => {
  const { userId, authLoading } = useContext(UserContext);

  return authLoading ? <></> : <Projects userId={userId} />;
};

export default ProjectsContainer;
