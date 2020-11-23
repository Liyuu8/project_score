import React, { FC } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import styled from '@emotion/styled';

import Score from './Score';
import ModalTriggerButton from './ModalTriggerButton';

interface Props {
  stageNumber: number;
}

const ScoreBoard: FC<Props> = ({ stageNumber }) => {
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

  return (
    <>
      <Score stageNumber={stageNumber} />
      <StyledGrid doubling columns={2}>
        <Grid.Column width={6} verticalAlign="middle">
          <ModalTriggerButton
            id="newMeasure"
            label="施策"
            button={
              <StyledButton icon="add" label="施策" labelPosition="left" />
            }
            onActionClick={(isSubmitted, content) =>
              isSubmitted && console.log('newMeasure is', content)
            }
          />
          <ModalTriggerButton
            id="newIntermediateObjective"
            label="中間目標"
            button={
              <StyledButton icon="add" label="中間目標" labelPosition="left" />
            }
            onActionClick={(isSubmitted, content) =>
              isSubmitted && console.log('newIntermediateObjective is', content)
            }
          />
          <ModalTriggerButton
            id="newVictoryCondition"
            label="勝利条件"
            button={
              <StyledButton icon="add" label="勝利条件" labelPosition="left" />
            }
            onActionClick={(isSubmitted, content) =>
              isSubmitted && console.log('newVictoryCondition is', content)
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
