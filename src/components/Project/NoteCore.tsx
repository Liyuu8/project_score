import React, { FC, useEffect, useState } from 'react';
import { Button, Grid, Popup, Segment, Table } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { Note, noteElements } from 'services/projectscore/models/note';
import { useFindingAction, useFindings, useNoteAction } from 'hooks/project';
import ModalForAddOrEdit, {
  addOrEditModalId,
} from '../common/modal/ModalForAddOrEdit';
import ModalForDelete, { deleteModalId } from '../common/modal/ModalForDelete';

interface Property {
  projectId: string;
  scoreId: string;
  note: Note;
  noteTitle: string;
}

const NoteCore: FC<Property> = ({ projectId, scoreId, note, noteTitle }) => {
  const noteContent = note.content
    ? note.content
    : `${noteElements[note.type].name}を記入してください`;
  const { findings } = useFindings(projectId, scoreId, note.id);
  const { updateNote, deleteNote } = useNoteAction();
  const { addFinding, updateFinding, deleteFinding } = useFindingAction();

  const [openedPopupKey, setOpenedPopupKey] = useState('');
  const onPopupClose = () => setOpenedPopupKey('');

  useEffect(() => {
    const popupCloseEvent = (ev: MouseEvent) =>
      !['.modal', '.popupTrigger', '.popup'].some((value) =>
        (ev.target as HTMLTextAreaElement).closest(value)
      ) && onPopupClose();

    document.addEventListener('click', popupCloseEvent);

    return () => document.removeEventListener('click', popupCloseEvent);
  }, []);

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

  const StyledTable = styled(Table)`
    &&& {
      margin: 0;
    }
  `;
  const StyledTableHeaderCell = styled(Table.HeaderCell)`
    &&& {
      cursor: grab;
    }
  `;
  const Pointer = styled.div`
    &&& {
      cursor: pointer;
    }
  `;

  // z-index: modal is 1001, and dimmer is 1000.
  const popupStyle = { padding: '8px', zIndex: 900 };

  return (
    <StyledTable textAlign="center" celled padded>
      <Table.Header>
        <Table.Row>
          <StyledTableHeaderCell>
            <Grid>
              <Grid.Column>{noteTitle}</Grid.Column>
            </Grid>
          </StyledTableHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Popup
              key={note.id}
              trigger={
                <Pointer className="popupTrigger">{noteContent}</Pointer>
              }
              on="click"
              position="top center"
              style={popupStyle}
              open={openedPopupKey === note.id}
              onOpen={() => setOpenedPopupKey(note.id)}
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
                    addFinding(projectId, scoreId, note.id, newContent, true)
                  )}
                />
                <ModalForAddOrEdit
                  id={addOrEditModalId.addBadFinding}
                  label="得られた知見"
                  triggerButton={<Button icon="thumbs down outline" />}
                  onActionClick={handleModalActionForAddOrEdit((newContent) =>
                    addFinding(projectId, scoreId, note.id, newContent, false)
                  )}
                />
                <ModalForDelete
                  id={deleteModalId.note + note.id}
                  label={noteTitle}
                  content={noteContent}
                  triggerButton={<Button icon="trash" />}
                  onActionClick={handleModalActionForDelete(() =>
                    deleteNote(projectId, scoreId, note.id)
                  )}
                />
              </Button.Group>
            </Popup>
          </Table.Cell>
        </Table.Row>
        {findings && findings.length > 0 && (
          <Table.Row>
            <Table.Cell>
              {findings.map((finding) => (
                <Popup
                  key={finding.id}
                  trigger={
                    <Segment color={finding.isGood ? 'blue' : 'red'} raised>
                      <Pointer className="popupTrigger">
                        {finding.content}
                      </Pointer>
                    </Segment>
                  }
                  on="click"
                  position="top center"
                  style={popupStyle}
                  open={openedPopupKey === finding.id}
                  onOpen={() => setOpenedPopupKey(finding.id)}
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
                      onActionClick={handleModalActionForAddOrEdit(
                        (newContent) =>
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
              ))}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </StyledTable>
  );
};

export default NoteCore;
