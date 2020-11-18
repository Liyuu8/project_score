import React, { FC } from 'react';
import { Grid, Segment, Table } from 'semantic-ui-react';
import styled from '@emotion/styled';

interface Props {
  title: string;
  content: string;
  findings?: string;
  isGood?: boolean;
}

const NoteCore: FC<Props> = ({ title, content, findings, isGood }) => {
  const StyledTable = styled(Table)`
    &&& {
      margin: 0;
    }
  `;

  return (
    <StyledTable textAlign="center" celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Grid>
              <Grid.Column>{title}</Grid.Column>
            </Grid>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <p>{content}</p>
          </Table.Cell>
        </Table.Row>
        {findings && (
          <Table.Row>
            <Table.Cell>
              <Segment color={isGood ? 'blue' : 'red'} raised>
                {findings}
              </Segment>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </StyledTable>
  );
};

export default NoteCore;
