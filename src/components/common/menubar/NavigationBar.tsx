import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Menu, Sidebar } from 'semantic-ui-react';

import { ThemeContext } from 'contexts';
import paths from 'paths';

const NavigationBar: FC = () => {
  const theme = useContext(ThemeContext);
  const NavBar = styled.header`
    .ui.top.visible.sidebar {
      background-color: ${theme.color.white};
    }
  `;
  const Title = styled.h2`
    color: ${theme.color.black};
    padding: 1rem;
  `;

  return (
    <NavBar>
      <Sidebar as={Menu} direction="top" width="thin" visible>
        <Link to={paths.home}>
          <Title>Project Score</Title>
        </Link>
      </Sidebar>
    </NavBar>
  );
};

export default NavigationBar;
