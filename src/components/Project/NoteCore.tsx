import React, { FC, useEffect, useState } from 'react';
import { Button, Grid, Popup, Segment, Table } from 'semantic-ui-react';
import styled from '@emotion/styled';

import ModalForAddOrEdit from './ModalForAddOrEdit';

interface Property {
  id: string;
  title: string;
  content: string;
  findings?: {
    id: string;
    title: string;
    isGood: boolean;
  }[];
}

const NoteCore: FC<Property> = ({ id, title, content, findings = [] }) => {
  const [property, setProperty] = useState<Property>({
    id,
    title,
    content,
    findings,
  });
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

  const editNoteContent = (newContent: string) => {
    setProperty({ ...property, content: newContent });
  };

  const addFinding = (findingTitle: string, isGood: boolean) => {
    const newFindings = [
      ...property.findings,
      {
        id: `findings${property.findings ? property.findings.length + 1 : 0}`,
        title: findingTitle,
        isGood,
      },
    ];
    setProperty({ ...property, findings: newFindings });
  };
  const editFinding = (findingTitle: string, index: number) => {
    const newFindings = [...property.findings];
    newFindings[index].title = findingTitle;
    setProperty({ ...property, findings: newFindings });
  };
  const removeFinding = (index: number) => {
    const newFindings = [...property.findings];
    newFindings.splice(index, 1);
    setProperty({ ...property, findings: newFindings });
  };

  const handleModalAction = (
    popupButtonPushedAction: (newContent: string) => void
  ) => (isSubmitted: boolean, submittedContent: string) => {
    if (isSubmitted) {
      popupButtonPushedAction(submittedContent);
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
              <Grid.Column>{property.title}</Grid.Column>
            </Grid>
          </StyledTableHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Popup
              key={property.id}
              trigger={
                <Pointer className="popupTrigger">{property.content}</Pointer>
              }
              on="click"
              position="top center"
              style={popupStyle}
              open={openedPopupKey === property.id}
              onOpen={() => setOpenedPopupKey(property.id)}
              onClose={onPopupClose}
              // モーダルクリック時に閉じてしまうので、クリックイベントハンドラを別途実装する（popupCloseEvent）
              closeOnDocumentClick={false}
            >
              <Button.Group>
                <ModalForAddOrEdit
                  id={property.id}
                  label={property.title}
                  content={property.content}
                  button={<Button icon="edit" />}
                  onActionClick={handleModalAction((newContent) =>
                    editNoteContent(newContent)
                  )}
                />
                <ModalForAddOrEdit
                  id="newGoodFinding"
                  label="得られた知見"
                  button={<Button icon="thumbs up outline" />}
                  onActionClick={handleModalAction((newContent) =>
                    addFinding(newContent, true)
                  )}
                />
                <ModalForAddOrEdit
                  id="newBadFinding"
                  label="得られた知見"
                  button={<Button icon="thumbs down outline" />}
                  onActionClick={handleModalAction((newContent) =>
                    addFinding(newContent, false)
                  )}
                />
                <Button icon="delete" />
              </Button.Group>
            </Popup>
          </Table.Cell>
        </Table.Row>
        {property.findings && property.findings.length > 0 && (
          <Table.Row>
            <Table.Cell>
              {property.findings.map((finding, index) => (
                <Popup
                  key={finding.id}
                  trigger={
                    <Segment color={finding.isGood ? 'blue' : 'red'} raised>
                      <Pointer className="popupTrigger">
                        {finding.title}
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
                      id={finding.id}
                      label="得られた知見"
                      content={finding.title}
                      button={<Button icon="edit" />}
                      onActionClick={handleModalAction((newContent) =>
                        editFinding(newContent, index)
                      )}
                    />
                    <Button
                      icon="delete"
                      onClick={() => removeFinding(index)}
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
