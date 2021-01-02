import React, { FC, useContext, useEffect, useState } from 'react';
import { Grid, Table } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { Note } from 'services/projectscore/models/note';
import { useFindings } from 'hooks/project';
import { ProjectContext, UserContext } from 'contexts';
import NotePopup from 'components/common/popup/NotePopup';
import FindingPopup from 'components/common/popup/FindingPopup';

interface Property {
  projectId: string;
  scoreId: string;
  note: Note;
  noteTitle: string;
}

const NoteCore: FC<Property> = ({ projectId, scoreId, note, noteTitle }) => {
  const { userId } = useContext(UserContext);
  const { isPublicProject } = useContext(ProjectContext);

  const { findings } = useFindings(
    projectId,
    scoreId,
    note.id,
    isPublicProject,
    userId
  );

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
            <NotePopup
              projectId={projectId}
              scoreId={scoreId}
              note={note}
              noteTitle={noteTitle}
              isPublicProject={isPublicProject}
              userId={userId}
              openedPopupKey={openedPopupKey}
              setOpenedPopupKey={setOpenedPopupKey}
              onPopupClose={onPopupClose}
            />
          </Table.Cell>
        </Table.Row>
        {findings && findings.length > 0 && (
          <Table.Row>
            <Table.Cell>
              {findings.map((finding) => (
                <FindingPopup
                  key={finding.id}
                  projectId={projectId}
                  scoreId={scoreId}
                  note={note}
                  finding={finding}
                  userId={userId}
                  openedPopupKey={openedPopupKey}
                  setOpenedPopupKey={setOpenedPopupKey}
                  onPopupClose={onPopupClose}
                />
              ))}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </StyledTable>
  );
};

export default NoteCore;
