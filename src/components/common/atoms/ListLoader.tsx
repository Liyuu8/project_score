import React, { FC } from 'react';
import styled from '@emotion/styled';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';

type loaderSize = 'wide' | 'narrow';

const WideLoader = styled(Segment)`
  &&& {
    margin-top: 8rem;
  }
`;
const NarrowLoader = styled(Segment)`
  &&& {
    margin-top: 0;
  }
`;

const ListLoader: FC<{ size: loaderSize }> = ({ size }) =>
  size === 'wide' ? (
    <WideLoader basic>
      <Loader active inline="centered" />
    </WideLoader>
  ) : (
    <NarrowLoader basic>
      <Loader active inline="centered" />
    </NarrowLoader>
  );

export default ListLoader;
