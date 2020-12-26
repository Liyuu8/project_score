import React, { FC } from 'react';
import { Form } from 'semantic-ui-react';

import { Plot, plotElements } from 'services/projectscore/models/plot';
import { usePlotAction } from 'hooks/project';

// const sleep = () => new Promise((resolve) => setTimeout(resolve, 5000));

const PlotTextArea: FC<{
  projectId: string;
  scoreId: string;
  plot: Plot;
}> = ({ projectId, scoreId, plot }) => {
  const { updatePlot } = usePlotAction();

  return (
    <Form.TextArea
      key={plot.id}
      label={plot.type ? plotElements[plot.type].name : ''}
      placeholder="記入欄"
      rows={1}
      value={plot ? plot.content : ''}
      // ISSUE:
      // 高速で入力する値を変化させると、DBへの書き込み⇨読み込みの処理が追いつかない
      onChange={(e, { value }) =>
        plot &&
        updatePlot(projectId, scoreId, {
          ...plot,
          content: value ? value?.toString() : '',
        })
      }
    />
  );
};

export default PlotTextArea;
