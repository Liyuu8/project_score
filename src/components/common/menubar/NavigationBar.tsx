import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, Grid, Menu, Sidebar } from 'semantic-ui-react';

import { ThemeContext } from 'contexts';
import paths from 'paths';
import ModalForNewProject from 'components/Project/ModalForNewProject';

const NavigationBar: FC = () => {
  const theme = useContext(ThemeContext);
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

  return (
    <NavBar>
      <Sidebar as={Menu} direction="top" width="thin" visible>
        <StyledGrid>
          <Grid.Column floated="left" width={8}>
            <Link to={paths.home}>
              <Title>Project Score</Title>
            </Link>
          </Grid.Column>
          <Grid.Column
            floated="right"
            width={8}
            verticalAlign="middle"
            textAlign="right"
          >
            <ModalForNewProject button={<Button color="teal">New</Button>} />
          </Grid.Column>
        </StyledGrid>
      </Sidebar>
    </NavBar>
  );
};

export default NavigationBar;
