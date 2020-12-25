import React, { FC } from 'react';
import { Form } from 'semantic-ui-react';

import { usePlots } from 'hooks/project';
import { blankPlot } from 'services/projectscore/models/plot';
import PlotTextArea from './PlotTextArea';

const ScoreMemo: FC<{ projectId: string; scoreId: string }> = ({
  projectId,
  scoreId,
}) => {
  const { plots } = usePlots(projectId, scoreId);

  return (
    <Form>
      <PlotTextArea
        projectId={projectId}
        scoreId={scoreId}
        plot={plots.find((plot) => plot.type === 'memo') ?? blankPlot}
      />
    </Form>
  );
};

export default ScoreMemo;
