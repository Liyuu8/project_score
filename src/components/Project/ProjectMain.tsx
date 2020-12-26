import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Dimmer, Grid, Loader, Popup, Tab } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { useScoreDataAction, useScores } from 'hooks/project';
import ScoreBoard from './ScoreBoard';
import Plots from './Plots';

interface Panes {
  pane: { key: string; attached: boolean; content: any };
  menuItem: string | { key: string; icon: string };
}

const ProjectMain: FC<{ projectId: string }> = ({ projectId }) => {
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

  const { scores, loading } = useScores(projectId);
  const { addScoreData, deleteScoreData } = useScoreDataAction();
  const [panes, setPanes] = useState<Panes[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const paneInfoMemo = useMemo(() => {
    // https://qiita.com/kobayang/items/88a104c0be28e16e65e8
    return () => {
      if (scores.length === 0) {
        return;
      }
      setPanes(
        scores.map((score) => ({
          menuItem: score.title,
          pane: {
            key: score.stage.toString(),
            attached: false,
            content: <ScoreBoard projectId={projectId} scoreId={score.id} />,
          },
        }))
      );
      setActiveIndex(scores.length - 1);
      console.log('scoresLength', scores.length);
    };
  }, [projectId, scores]);

  useEffect(() => {
    paneInfoMemo();
  }, [paneInfoMemo]);

  const addStage = useCallback(async () => {
    if (scores.length > 5) {
      // TODO: 警告画面を表示する
      return;
    }
    await addScoreData(projectId);
  }, [addScoreData, projectId, scores]);

  const removeStage = useCallback(async () => {
    if (scores.length === 1) {
      // TODO: 警告画面を表示する
      return;
    }
    await deleteScoreData(projectId, scores[activeIndex].id);
  }, [deleteScoreData, projectId, scores, activeIndex]);

  return loading ? (
    <Dimmer active inverted>
      <Loader inverted content="Loading" />
    </Dimmer>
  ) : (
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
        {scores[activeIndex] && (
          <Plots projectId={projectId} scoreId={scores[activeIndex].id} />
        )}
      </Grid.Column>
    </StyledGrid>
  );
};

export default ProjectMain;
