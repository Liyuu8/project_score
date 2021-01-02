import React, { FC, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import styled from '@emotion/styled';
import { Button, Grid, Icon, Menu, Sidebar } from 'semantic-ui-react';

import { ProjectContext, ThemeContext, UserContext } from 'contexts';
import paths from 'utils/paths';
import ModalForManageProject from 'components/common/modal/ModalForManageProject';
import { useProject } from 'hooks/project';
import { auth } from 'utils/firebase';

const NavigationBar: FC = () => {
  const theme = useContext(ThemeContext);
  const { userId } = useContext(UserContext);
  const { setIsPublicProject } = useContext(ProjectContext);

  const pathnames = useLocation().pathname.split('/');
  const projectId = pathnames[1] === 'project' ? pathnames[2] : '';
  const { project } = useProject(projectId);

  useEffect(() => {
    setIsPublicProject(project?.isPublic ?? false);
  }, [project, setIsPublicProject]);

  const history = useHistory();
  const location = useLocation();
  const signOut =
    auth && userId
      ? (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          auth.signOut();
          history.replace(paths.home);
        }
      : () => null;

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
      margin-left: 10px;
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
            {userId && (
              <ModalForManageProject
                triggerButton={
                  <StyledButton color="teal">New Project</StyledButton>
                }
              />
            )}
            {userId ? (
              <StyledButton onClick={signOut} position="right">
                ログアウト&nbsp;&nbsp;
                <Icon name="sign-out" />
              </StyledButton>
            ) : (
              <Link
                to={{
                  pathname: paths.signin,
                  search: `?signInSuccessUrl=${location.pathname}`,
                }}
              >
                <StyledButton position="right">
                  ログイン&nbsp;&nbsp;
                  <Icon name="sign-in" />
                </StyledButton>
              </Link>
            )}
          </Grid.Column>
        </StyledGrid>
      </Sidebar>
    </NavBar>
  );
};

export default NavigationBar;
