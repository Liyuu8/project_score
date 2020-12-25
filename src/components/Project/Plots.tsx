import React, { FC } from 'react';
import { Form, Header } from 'semantic-ui-react';

import { usePlots } from 'hooks/project';
import PlotTextArea from './PlotTextArea';

const Plots: FC<{ projectId: string; scoreId: string }> = ({
  projectId,
  scoreId,
}) => {
  const { plots } = usePlots(projectId, scoreId);

  return (
    <Form>
      <Header as="h3">廟算八要素</Header>
      {plots.map((plot) => (
        <PlotTextArea
          key={plot.id}
          projectId={projectId}
          scoreId={scoreId}
          plot={plot}
        />
      ))}
    </Form>
  );
};

export default Plots;
