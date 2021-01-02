import React, { FC, useContext } from 'react';
import firebase from 'firebase/app';
import { useHistory } from 'react-router';
import { Grid, Header, Segment } from 'semantic-ui-react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from '@emotion/styled';

import paths from 'utils/paths';
import { auth } from 'utils/firebase';
import { UserContext } from 'contexts';

const GridWrapper = styled.main`
  &&& h2 {
    font-size: 1.25rem;
  }

  &&& .column {
    max-width: 480px;
    padding: 0 2rem;
  }

  .ui.grid {
    height: 85vh;
  }

  .ui.message {
    padding: 0.8rem 1rem;
    text-align: left;
  }

  .ui.message p {
    margin: 0.3rem 0;
  }

  &&& .mdl-button {
    border-radius: 0.33rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.14);
  }
`;

const Signin: FC = () => {
  const { setAuthLoading, setCredential } = useContext(UserContext);
  const history = useHistory();
  const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'redirect',
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: { lang: 'ja' },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        setAuthLoading(true);
        setCredential(authResult as firebase.auth.UserCredential);
        const dest = redirectUrl || paths.home;
        history.replace(dest);

        return false;
      },
    },
  };

  return (
    <GridWrapper>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <Header as="h2" textAlign="center">
            ログイン／新規登録
          </Header>
          <Segment basic>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </Segment>
        </Grid.Column>
      </Grid>
    </GridWrapper>
  );
};

export default Signin;
