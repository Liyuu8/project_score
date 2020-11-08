import React from 'react';

const NodeBox = () =>
  React.createElement(
    'div',
    null,
    React.createElement('input', {
      placeholder: 'name',
      type: 'text',
      'df-name': '',
    })
  );

export default NodeBox;
