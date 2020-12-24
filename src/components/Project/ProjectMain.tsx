import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Grid, Popup, Tab } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { Project } from 'services/projectscore/models/project';
import { useScoreDataAction, useScores } from 'hooks/project';
import ListLoader from 'components/common/atoms/ListLoader';
import ScoreBoard from './ScoreBoard';
import Plots from './Plots';

interface Panes {
  pane: { key: string; attached: boolean; content: any };
  menuItem: string | { key: string; icon: string };
}

const ProjectMain: FC<{ project: Project }> = ({ project }) => {
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

  const { scores, loading } = useScores(project.id);
  const { addScoreData, deleteScoreData } = useScoreDataAction();
  const [panes, setPanes] = useState<Panes[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setPanes(
      scores.map((score) => ({
        menuItem: score.title,
        pane: {
          key: score.stage.toString(),
          attached: false,
          content: <ScoreBoard projectId={project.id} scoreId={score.id} />,
        },
      }))
    );
    setActiveIndex(scores.length - 1);
  }, [project, scores]);

  const addStage = useCallback(async () => {
    if (scores.length > 5) {
      // TODO: 警告画面を表示する
      return;
    }
    await addScoreData(project.id);
  }, [addScoreData, project, scores]);

  const removeStage = useCallback(async () => {
    if (scores.length === 1) {
      // TODO: 警告画面を表示する
      return;
    }
    await deleteScoreData(project.id, scores[activeIndex].id);
  }, [deleteScoreData, project, scores, activeIndex]);

  return (
    <StyledGrid doubling columns={2}>
      <Grid.Column width={13}>
        {loading ? (
          <ListLoader />
        ) : (
          <>
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
          </>
        )}
      </Grid.Column>
      <Grid.Column width={3}>
        <Plots />
      </Grid.Column>
    </StyledGrid>
  );
};

export default ProjectMain;
