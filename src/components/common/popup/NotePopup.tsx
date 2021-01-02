import React, { FC } from 'react';
import { Button, Popup } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { useFindingAction, useNoteAction } from 'hooks/project';
import { Note, noteElements } from 'services/projectscore/models/note';
import ModalForAddOrEdit, {
  addOrEditModalId,
} from '../modal/ModalForAddOrEdit';
import ModalForDelete, { deleteModalId } from '../modal/ModalForDelete';

interface Property {
  projectId: string;
  scoreId: string;
  note: Note;
  noteTitle: string;
  isPublicProject: boolean;
  userId: string;
  openedPopupKey: string;
  setOpenedPopupKey: (openedPopupKey: string) => void;
  onPopupClose: () => void;
}

const NotePopup: FC<Property> = ({
  projectId,
  scoreId,
  note,
  noteTitle,
  isPublicProject,
  userId,
  openedPopupKey,
  setOpenedPopupKey,
  onPopupClose,
}) => {
  const noteContent = note.content
    ? note.content
    : `${noteElements[note.type].name}を記入してください`;

  const { updateNote, deleteNote } = useNoteAction();
  const { addFinding } = useFindingAction();

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
      key={note.id}
      trigger={<Pointer className="popupTrigger">{noteContent}</Pointer>}
      on="click"
      position="top center"
      style={popupStyle}
      open={openedPopupKey === note.id}
      onOpen={userId ? () => setOpenedPopupKey(note.id) : () => null}
      onClose={onPopupClose}
      // モーダルクリック時に閉じてしまうので、クリックイベントハンドラを別途実装する（popupCloseEvent）
      closeOnDocumentClick={false}
    >
      <Button.Group>
        <ModalForAddOrEdit
          id={addOrEditModalId.editNote + note.id}
          label={noteTitle}
          content={noteContent}
          triggerButton={<Button icon="edit" />}
          onActionClick={handleModalActionForAddOrEdit((newContent) =>
            updateNote(projectId, scoreId, {
              ...note,
              content: newContent,
            })
          )}
        />
        <ModalForAddOrEdit
          id={addOrEditModalId.addGoodFinding}
          label="得られた知見"
          triggerButton={<Button icon="thumbs up outline" />}
          onActionClick={handleModalActionForAddOrEdit((newContent) =>
            addFinding(
              projectId,
              scoreId,
              note.id,
              newContent,
              true,
              userId,
              isPublicProject
            )
          )}
        />
        <ModalForAddOrEdit
          id={addOrEditModalId.addBadFinding}
          label="得られた知見"
          triggerButton={<Button icon="thumbs down outline" />}
          onActionClick={handleModalActionForAddOrEdit((newContent) =>
            addFinding(
              projectId,
              scoreId,
              note.id,
              newContent,
              false,
              userId,
              isPublicProject
            )
          )}
        />
        {noteTitle !== noteElements.acquisitionGoal.name && (
          <ModalForDelete
            id={deleteModalId.note + note.id}
            label={noteTitle}
            content={noteContent}
            triggerButton={<Button icon="trash" />}
            onActionClick={handleModalActionForDelete(() =>
              deleteNote(projectId, scoreId, note.id)
            )}
          />
        )}
      </Button.Group>
    </Popup>
  );
};

export default NotePopup;
