import React, { FC } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { useNoteAction } from 'hooks/project';
import ScoreCore from './ScoreCore';
import ModalForAddOrEdit from './ModalForAddOrEdit';

interface Props {
  projectId: string;
  scoreId: string;
}

const ScoreBoard: FC<Props> = ({ projectId, scoreId }) => {
  const StyledGrid = styled(Grid)`
    &&& {
      margin-top: 1px;
    }
  `;
  const StyledButton = styled(Button)`
    &&& {
      margin-left: 10px;
      margin-right: 10px;
    }
  `;

  const { addNote } = useNoteAction();

  return (
    <>
      <ScoreCore projectId={projectId} scoreId={scoreId} />
      <StyledGrid doubling columns={2}>
        <Grid.Column width={6} verticalAlign="middle">
          <ModalForAddOrEdit
            id="newMeasure"
            label="施策"
            button={
              <StyledButton icon="add" label="施策" labelPosition="left" />
            }
            onActionClick={(isSubmitted, content) =>
              isSubmitted && addNote(projectId, scoreId, content, 'measure')
            }
          />
          <ModalForAddOrEdit
            id="newIntermediateObjective"
            label="中間目標"
            button={
              <StyledButton icon="add" label="中間目標" labelPosition="left" />
            }
            onActionClick={(isSubmitted, content) =>
              isSubmitted &&
              addNote(projectId, scoreId, content, 'intermediateObjective')
            }
          />
          <ModalForAddOrEdit
            id="newVictoryCondition"
            label="勝利条件"
            button={
              <StyledButton icon="add" label="勝利条件" labelPosition="left" />
            }
            onActionClick={(isSubmitted, content) =>
              isSubmitted &&
              addNote(projectId, scoreId, content, 'victoryCondition')
            }
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Form>
            <Form.TextArea label="メモ" placeholder="記入欄" rows={2} />
          </Form>
        </Grid.Column>
      </StyledGrid>
    </>
  );
};

export default ScoreBoard;
