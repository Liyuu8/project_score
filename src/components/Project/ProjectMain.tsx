import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Button, Dimmer, Grid, Icon, Loader, Tab } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { useScores } from 'hooks/project';
import ModalForManageScore from 'components/common/modal/ModalForManageScore';
import { ProjectContext, UserContext } from 'contexts';
import ScoreBoard from './ScoreBoard';
import Plots from './Plots';

interface Panes {
  pane: { key: string; attached: boolean; content: any };
  menuItem: string | { key: string; icon: string };
}

const ProjectMain: FC<{ projectId: string }> = ({ projectId }) => {
  const { userId } = useContext(UserContext);
  const { isPublicProject } = useContext(ProjectContext);

  const { scores, loading } = useScores(projectId, isPublicProject, userId);
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
          menuItem: score.index.toString(),
          pane: {
            key: score.id,
            attached: false,
            content: <ScoreBoard projectId={projectId} scoreId={score.id} />,
          },
        }))
      );
      const latestScoreId =
        scores.length === 1
          ? scores[0].id
          : scores
              .slice()
              .sort((a, b) =>
                a.updatedAt && b.updatedAt && a.updatedAt < b.updatedAt ? 1 : -1
              )[0].id;
      setActiveIndex(scores.findIndex((score) => score.id === latestScoreId));
    };
  }, [projectId, scores]);

  useEffect(() => {
    paneInfoMemo();
  }, [paneInfoMemo]);

  const StyledGrid = styled(Grid)`
    &&& {
      padding: 1rem;
    }
  `;
  const StyledButton = styled(Button)`
    &&& {
      margin-left: 10px;
      margin-top: 5px;
    }
  `;

  return loading ? (
    <Dimmer active inverted>
      <Loader inverted content="Loading" />
    </Dimmer>
  ) : (
    <StyledGrid doubling columns={2}>
      <Grid.Column width={13}>
        <ModalForManageScore
          projectId={projectId}
          triggerButton={
            <StyledButton color="teal" floated="right">
              New Score
            </StyledButton>
          }
        />
        <ModalForManageScore
          projectId={projectId}
          score={scores[activeIndex]}
          triggerButton={
            <StyledButton basic icon labelPosition="right" floated="right">
              <Icon name="options" />
              {scores[activeIndex]?.title}
            </StyledButton>
          }
        />
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
