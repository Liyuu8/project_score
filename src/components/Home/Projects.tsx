import React, { FC } from 'react';
import { Header } from 'semantic-ui-react';
import styled from '@emotion/styled';

import ProjectList from 'components/common/list/ProjectList';
import SizedLoader from 'components/common/atoms/SizedLoader';
import { usePubProjects, useMyProjects } from 'hooks/project';

const Projects: FC<{ userId: string }> = ({ userId }) => {
  const { pubProjects, pubProjectsLoading } = usePubProjects();
  const { myProjects, myProjectsLoading } = useMyProjects(userId);

  const StyledDiv = styled.div`
    padding: 1rem;
  `;

  return (
    <StyledDiv>
      <div>
        {userId && (
          <>
            <Header>My Project</Header>
            {myProjectsLoading ? (
              <SizedLoader size="narrow" />
            ) : (
              <ProjectList projects={myProjects} />
            )}
          </>
        )}
        <Header>Public Project</Header>
        {pubProjectsLoading ? (
          <SizedLoader size="narrow" />
        ) : (
          <ProjectList projects={pubProjects} />
        )}
      </div>
    </StyledDiv>
  );
};

export default Projects;
