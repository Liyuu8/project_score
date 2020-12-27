import React, { FC } from 'react';
import { Button, Grid, Icon, Modal } from 'semantic-ui-react';
import styled from '@emotion/styled';

interface Props {
  isExisting: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
  handleDelete?: () => void;
}

const ModalActionButtons: FC<Props> = ({
  isExisting,
  handleSubmit,
  handleCancel,
  handleDelete,
}) => {
  const StyledButton = styled(Button)`
    &&& {
      margin-right: 15px;
    }
  `;

  return (
    <Modal.Actions>
      <Grid columns={2}>
        {isExisting && (
          <Grid.Column floated="left" textAlign="left" width={6}>
            <Button color="red" onClick={handleDelete}>
              <Icon name="trash" /> 削除
            </Button>
          </Grid.Column>
        )}
        <Grid.Column floated="right" textAlign="right" width={10}>
          <StyledButton color="grey" onClick={handleCancel}>
            <Icon name="remove" /> キャンセル
          </StyledButton>
          <Button color="green" onClick={handleSubmit}>
            <Icon name="checkmark" /> 決定
          </Button>
        </Grid.Column>
      </Grid>
    </Modal.Actions>
  );
};

export default ModalActionButtons;
