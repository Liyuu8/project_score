import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import NavigationBar from 'components/common/menubar/NavigationBar';
import Home from 'components/Home';
import Project from 'components/Project';
import Spacer from 'components/common/atoms/Spacer';
import paths from './utils/paths';

const App: FC = () => {
  return (
    <div>
      <NavigationBar />
      <Spacer />
      <Switch>
        <Route path={paths.project} component={Project} />
        <Route path={paths.home} component={Home} exact />
        <Redirect to={paths.home} />
      </Switch>
    </div>
  );
};

export default App;
