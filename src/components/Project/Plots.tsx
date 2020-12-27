import React, { FC } from 'react';
import { Form, Header } from 'semantic-ui-react';

import { usePlots } from 'hooks/project';
import SizedLoader from 'components/common/atoms/SizedLoader';
import PlotTextArea from './PlotTextArea';

const Plots: FC<{ projectId: string; scoreId: string }> = ({
  projectId,
  scoreId,
}) => {
  const { plots, loading } = usePlots(projectId, scoreId);

  return (
    <Form>
      <Header as="h3">廟算八要素</Header>
      {loading ? (
        <SizedLoader size="wide" />
      ) : (
        plots.map((plot) => (
          <PlotTextArea
            key={plot.id}
            projectId={projectId}
            scoreId={scoreId}
            plot={plot}
          />
        ))
      )}
    </Form>
  );
};

export default Plots;
