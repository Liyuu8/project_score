import React, { FC } from 'react';
import styled from '@emotion/styled';

const Spacer: FC<{ height?: number }> = ({ height = 6 }) => {
  const SpacerSegment = styled.div`
    clear: both;
    height: ${height}rem;
    width: auto;
  `;

  return <SpacerSegment />;
};

export default Spacer;
