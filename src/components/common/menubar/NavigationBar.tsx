import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import styled from '@emotion/styled';
import { Button, Grid, Icon, Menu, Sidebar } from 'semantic-ui-react';

import { ThemeContext } from 'contexts/contexts';
import paths from 'utils/paths';
import ModalForManageProject from 'components/common/modal/ModalForManageProject';
import { useProject } from 'hooks/project';

const NavigationBar: FC = () => {
  const theme = useContext(ThemeContext);

  const pathnames = useLocation().pathname.split('/');
  const projectId = pathnames[1] === 'project' ? pathnames[2] : '';
  const { project } = useProject(projectId);

  const NavBar = styled.header`
    .ui.top.visible.sidebar {
      background-color: ${theme.color.white};
    }
  `;
  const Title = styled.h2`
    color: ${theme.color.black};
  `;
  const StyledGrid = styled(Grid)`
    &&& {
      margin: 0;
      width: 100%;
    }
  `;
  const StyledButton = styled(Button)`
    &&& {
      margin-right: 15px;
    }
  `;

  return (
    <NavBar>
      <Sidebar as={Menu} direction="top" width="thin" visible>
        <StyledGrid columns={2}>
          <Grid.Column floated="left">
            <Link to={paths.home}>
              <Title>Project Score</Title>
            </Link>
          </Grid.Column>
          <Grid.Column floated="right" textAlign="right">
            {project && (
              <ModalForManageProject
                project={project}
                triggerButton={
                  <StyledButton basic icon labelPosition="right">
                    <Icon name="options" />
                    {project?.title}
                  </StyledButton>
                }
              />
            )}
            <ModalForManageProject
              triggerButton={<Button color="teal">New Project</Button>}
            />
          </Grid.Column>
        </StyledGrid>
      </Sidebar>
    </NavBar>
  );
};

export default NavigationBar;
