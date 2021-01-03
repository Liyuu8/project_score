import React, { FC, useContext } from 'react';
import { Button, Message } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { useMemoAction, useMemos } from 'hooks/project';
import SizedLoader from 'components/common/atoms/SizedLoader';
import { ProjectContext, UserContext } from 'contexts';
import ModalForAddOrEdit, {
  addOrEditModalId,
} from '../common/modal/ModalForAddOrEdit';
import ModalForDelete, { deleteModalId } from '../common/modal/ModalForDelete';

interface Props {
  projectId: string;
  scoreId: string;
  scoreAuthorId: string;
}

const ScoreMemo: FC<Props> = ({ projectId, scoreId, scoreAuthorId }) => {
  const { userId } = useContext(UserContext);
  const { isPublicProject } = useContext(ProjectContext);

  const { memos, loading } = useMemos(
    projectId,
    scoreId,
    isPublicProject,
    userId
  );
  const { addMemo, updateMemo, deleteMemo } = useMemoAction();

  const StyledButton = styled(Button)`
    &&& {
      margin-left: 10px;
    }
  `;
  const ListContent = styled.div`
    margin-bottom: 8px;
    margin-top: 8px;
  `;

  return (
    <Message>
      <Message.Header>
        Memo
        {scoreAuthorId === userId && (
          <ModalForAddOrEdit
            id={addOrEditModalId.addScoreMemo}
            label="メモ"
            triggerButton={<StyledButton icon="add" size="mini" />}
            onActionClick={(isSubmitted, content) =>
              isSubmitted &&
              addMemo(projectId, scoreId, content, userId, isPublicProject)
            }
          />
        )}
      </Message.Header>
      {loading ? (
        <SizedLoader size="narrow" />
      ) : (
        <Message.List>
          {memos.map((memo) => (
            <ListContent key={memo.id}>
              ・{memo.content}
              {memo.authorId === userId && (
                <Button.Group size="mini" floated="right" compact>
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
                    triggerButton={<Button icon="trash" />}
                    onActionClick={(isSubmitted) =>
                      isSubmitted && deleteMemo(projectId, scoreId, memo.id)
                    }
                  />
                </Button.Group>
              )}
            </ListContent>
          ))}
        </Message.List>
      )}
    </Message>
  );
};

export default ScoreMemo;
