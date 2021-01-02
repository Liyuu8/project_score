import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Loader, Segment } from 'semantic-ui-react';

type loaderSize = 'wide' | 'narrow';

const WideLoader = styled(Segment)`
  &&& {
    margin-bottom: 14rem;
    margin-top: 14rem;
  }
`;
const NarrowLoader = styled(Segment)`
  &&& {
    margin-top: 0;
  }
`;

const SizedLoader: FC<{ size: loaderSize }> = ({ size }) =>
  size === 'wide' ? (
    <WideLoader basic>
      <Loader active inline="centered" />
    </WideLoader>
  ) : (
    <NarrowLoader basic>
      <Loader active inline="centered" />
    </NarrowLoader>
  );

export default SizedLoader;
