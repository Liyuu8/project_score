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
            label="施策"
            value=""
            button={
              <StyledButton icon="add" label="施策" labelPosition="left" />
            }
          />
          <ModalTriggerButton
            label="中間目標"
            value=""
            button={
              <StyledButton icon="add" label="中間目標" labelPosition="left" />
            }
          />
          <ModalTriggerButton
            label="勝利条件"
            value=""
            button={
              <StyledButton icon="add" label="勝利条件" labelPosition="left" />
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
