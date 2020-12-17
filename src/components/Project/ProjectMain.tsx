import React, { FC, useEffect, useState } from 'react';
import { Button, Grid, Popup, Tab } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { ProjectScore } from 'services/projectscore/models/projectscore';
import ScoreBoard from './ScoreBoard';
import Plots from './Plots';

interface Panes {
  pane: { key: string; attached: boolean; content: any };
  menuItem: string | { key: string; icon: string };
}

const ProjectMain: FC<{ projectScore: ProjectScore }> = ({ projectScore }) => {
  const StyledGrid = styled(Grid)`
    &&& {
      padding: 1rem;
    }
  `;
  const StyledButtonGroup = styled(Button.Group)`
    &&& {
      margin-left: 1rem;
    }
  `;

  const [updatedProjectScore, setUpdatedProjectScore] = useState(projectScore);
  useEffect(() => {
    setUpdatedProjectScore(projectScore);
  }, [projectScore]);

  const [panes, setPanes] = useState<Panes[]>(
    updatedProjectScore.scoreDataList.map((scoreData) => ({
      menuItem: scoreData.score.title,
      pane: {
        key: scoreData.score.stage.toString(),
        attached: false,
        content: <ScoreBoard scoreData={scoreData} />,
      },
    }))
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const addStage = () => {
    if (panes.length > 5) {
      return;
    }
    const newPanes = [...panes];
    const newStageIndex = parseInt(panes[panes.length - 1].pane.key, 10) + 1;
    newPanes.push({
      // TODO: 仮処理
      menuItem: `Stage ${newStageIndex}`,
      pane: {
        key: `${newStageIndex}`,
        attached: false,
        content: (
          <ScoreBoard scoreData={updatedProjectScore.scoreDataList[0]} />
        ),
      },
    });
    setPanes(newPanes);
    setActiveIndex(panes.length);
  };

  const removeStage = () => {
    if (panes.length === 1) {
      return;
    }
    const newPanes = [...panes];
    newPanes.splice(activeIndex, 1);
    setPanes(newPanes);
    setActiveIndex(0);
  };

  return (
    <StyledGrid doubling columns={2}>
      <Grid.Column width={13}>
        <StyledButtonGroup floated="right" size="large">
          <Popup
            content="Add new stage"
            trigger={<Button icon="add" onClick={addStage} />}
          />
          <Popup
            content="Delete stage"
            trigger={<Button icon="delete" onClick={removeStage} />}
          />
        </StyledButtonGroup>
        <Tab
          menu={{ pointing: true }}
          panes={panes}
          renderActiveOnly={false}
          activeIndex={activeIndex}
          onTabChange={(event, data) => {
            let index;
            switch (typeof data.activeIndex) {
              case 'string':
                index = parseInt(data.activeIndex, 10);
                break;
              case 'number':
                index = data.activeIndex;
                break;
              default:
                index = 0;
            }
            setActiveIndex(index);
          }}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <Plots />
      </Grid.Column>
    </StyledGrid>
  );
};

export default ProjectMain;
