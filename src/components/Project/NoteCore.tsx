import React, { FC, useState } from 'react';
import { Button, Grid, Popup, Segment, Table } from 'semantic-ui-react';
import styled from '@emotion/styled';

import ModalTriggerButton from './ModalTriggerButton';

interface Property {
  title: string;
  content: string;
  findings?: {
    id: string;
    title: string;
    isGood: boolean;
  }[];
}

const NoteCore: FC<Property> = ({ title, content, findings = [] }) => {
  const [property, setProperty] = useState<Property>({
    title,
    content,
    findings,
  });

  // const addFinding = (isGood: boolean) => {
  //   const newFindings = [
  //     ...property.findings,
  //     {
  //       id: `findings${property.findings ? property.findings.length + 1 : 0}`,
  //       title: '新しく追加された知見',
  //       isGood,
  //     },
  //   ];
  //   setProperty({ ...property, findings: newFindings });
  // };
  // const editFinding = (index: number) => {
  //   const newFindings = [...property.findings];
  //   newFindings[index].title = '編集された知見';
  //   setProperty({ ...property, findings: newFindings });
  // };
  const removeFinding = (index: number) => {
    const newFindings = [...property.findings];
    newFindings.splice(index, 1);
    setProperty({ ...property, findings: newFindings });
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
              trigger={<Pointer>{property.content}</Pointer>}
              on="click"
              position="top center"
              style={popupStyle}
            >
              <Button.Group>
                <ModalTriggerButton
                  label={property.title}
                  value={property.content}
                  button={<Button icon="edit" />}
                />
                <ModalTriggerButton
                  label="得られた知見"
                  value=""
                  button={<Button icon="thumbs up outline" />}
                />
                <ModalTriggerButton
                  label="得られた知見"
                  value=""
                  button={<Button icon="thumbs down outline" />}
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
                      <Pointer>{finding.title}</Pointer>
                    </Segment>
                  }
                  on="click"
                  position="top center"
                  style={popupStyle}
                >
                  <Button.Group>
                    <ModalTriggerButton
                      label="得られた知見"
                      value={finding.title}
                      button={<Button icon="edit" />}
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
