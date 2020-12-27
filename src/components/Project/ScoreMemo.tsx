import React, { FC } from 'react';
import { Button, Message } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { useMemoAction, useMemos } from 'hooks/project';
import ListLoader from 'components/common/atoms/ListLoader';
import ModalForAddOrEdit, {
  addOrEditModalId,
} from '../common/modal/ModalForAddOrEdit';
import ModalForDelete, { deleteModalId } from '../common/modal/ModalForDelete';

const ScoreMemo: FC<{ projectId: string; scoreId: string }> = ({
  projectId,
  scoreId,
}) => {
  const { memos, loading } = useMemos(projectId, scoreId);
  const { addMemo, updateMemo, deleteMemo } = useMemoAction();

  const StyledButton = styled(Button)`
    &&& {
      margin-left: 10px;
    }
  `;
  const StyledButtonGroup = styled(Button.Group)`
    &&& {
      margin-left: 10px;
    }
  `;

  return (
    <Message>
      <Message.Header>
        Memo
        <ModalForAddOrEdit
          id={addOrEditModalId.addScoreMemo}
          label="メモ"
          triggerButton={<StyledButton icon="add" size="mini" />}
          onActionClick={(isSubmitted, content) =>
            isSubmitted && addMemo(projectId, scoreId, content)
          }
        />
      </Message.Header>
      {loading ? (
        <ListLoader size="narrow" />
      ) : (
        <Message.List>
          {memos.map((memo) => (
            <div key={memo.id}>
              ・{memo.content}
              <StyledButtonGroup size="mini">
                <ModalForAddOrEdit
                  id={addOrEditModalId.editScoreMemo + memo.id}
                  label="メモ"
                  content={memo.content}
                  triggerButton={<Button icon="edit" />}
                  onActionClick={(isSubmitted, content) =>
                    isSubmitted &&
                    updateMemo(projectId, scoreId, { ...memo, content })
                  }
                />
                <ModalForDelete
                  id={deleteModalId.scoreMemo + memo.id}
                  label="メモ"
                  content={memo.content}
                  triggerButton={<Button icon="delete" />}
                  onActionClick={(isSubmitted) =>
                    isSubmitted && deleteMemo(projectId, scoreId, memo.id)
                  }
                />
              </StyledButtonGroup>
            </div>
          ))}
        </Message.List>
      )}
    </Message>
  );
};

export default ScoreMemo;
