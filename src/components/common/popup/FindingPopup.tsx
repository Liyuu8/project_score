import React, { FC } from 'react';
import { Button, Popup, Segment } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { useFindingAction } from 'hooks/project';
import { Note } from 'services/projectscore/models/note';
import { Finding } from 'services/projectscore/models/finding';
import ModalForAddOrEdit, {
  addOrEditModalId,
} from '../modal/ModalForAddOrEdit';
import ModalForDelete, { deleteModalId } from '../modal/ModalForDelete';

interface Property {
  projectId: string;
  scoreId: string;
  note: Note;
  finding: Finding;
  userId: string;
  openedPopupKey: string;
  setOpenedPopupKey: (openedPopupKey: string) => void;
  onPopupClose: () => void;
}

const FindingPopup: FC<Property> = ({
  projectId,
  scoreId,
  note,
  finding,
  userId,
  openedPopupKey,
  setOpenedPopupKey,
  onPopupClose,
}) => {
  const { updateFinding, deleteFinding } = useFindingAction();

  const handleModalActionForAddOrEdit = (
    popupButtonPushedAction: (newContent: string) => void
  ) => (isSubmitted: boolean, submittedContent: string) => {
    if (isSubmitted) {
      popupButtonPushedAction(submittedContent);
    }
    onPopupClose();
  };

  const handleModalActionForDelete = (popupButtonPushedAction: () => void) => (
    isSubmitted: boolean
  ) => {
    if (isSubmitted) {
      popupButtonPushedAction();
    }
    onPopupClose();
  };

  const Pointer = styled.div`
    &&& {
      cursor: pointer;
    }
  `;

  // z-index: modal is 1001, and dimmer is 1000.
  const popupStyle = { padding: '8px', zIndex: 900 };

  return (
    <Popup
      key={finding.id}
      trigger={
        <Segment color={finding.isGood ? 'blue' : 'red'} raised>
          <Pointer className="popupTrigger">{finding.content}</Pointer>
        </Segment>
      }
      on="click"
      position="top center"
      style={popupStyle}
      open={openedPopupKey === finding.id}
      onOpen={userId ? () => setOpenedPopupKey(finding.id) : () => null}
      onClose={onPopupClose}
      // モーダルクリック時に閉じてしまうので、クリックイベントハンドラを別途実装する（popupCloseEvent）
      closeOnDocumentClick={false}
    >
      <Button.Group>
        <ModalForAddOrEdit
          id={addOrEditModalId.editFinding + finding.id}
          label="得られた知見"
          content={finding.content}
          triggerButton={<Button icon="edit" />}
          onActionClick={handleModalActionForAddOrEdit((newContent) =>
            updateFinding(projectId, scoreId, note.id, {
              ...finding,
              content: newContent,
            })
          )}
        />
        <ModalForDelete
          id={deleteModalId.finding + finding.id}
          label="得られた知見"
          content={finding.content}
          triggerButton={<Button icon="trash" />}
          onActionClick={handleModalActionForDelete(() =>
            deleteFinding(projectId, scoreId, note.id, finding.id)
          )}
        />
      </Button.Group>
    </Popup>
  );
};

export default FindingPopup;
