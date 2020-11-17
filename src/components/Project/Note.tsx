import React, { FC, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Button, Grid, Segment, Table } from 'semantic-ui-react';

interface Props {
  title: string;
  content: string;
  findings?: string;
  isGood?: boolean;
}

const Note: FC<Props> = ({ title, content, findings, isGood }) => {
  const contextRef = useRef();

  return (
    <Table textAlign="center" celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Grid>
              <Grid.Column width={12} verticalAlign="middle">
                {title}
              </Grid.Column>
              <Grid.Column width={4} floated="right" ref={contextRef}>
                <Button icon="list" size="mini" />
              </Grid.Column>
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
    </Table>
  );
};

const createNote = ({ title, content, findings, isGood }: Props): string =>
  ReactDOMServer.renderToString(
    <Note title={title} content={content} findings={findings} isGood={isGood} />
  );

export default createNote;
