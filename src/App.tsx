import React, { FC, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import NavigationBar from 'components/common/menubar/NavigationBar';
import Home from 'components/Home';
import Project from 'components/Project';
import Signin from 'components/Signin';
import Spacer from 'components/common/atoms/Spacer';
import { UserContext } from 'contexts';
import paths from './utils/paths';

const App: FC = () => {
  const { userId } = useContext(UserContext);

  return (
    <div>
      <NavigationBar />
      <Spacer />
      <Switch>
        <Route path={paths.project} component={Project} />
        <Route path={paths.home} component={Home} exact />
        {!userId && <Route path={paths.signin} component={Signin} />}
        <Redirect to={paths.home} />
      </Switch>
    </div>
  );
};

export default App;
