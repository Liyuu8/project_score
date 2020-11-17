import React, { FC } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Divider, Segment } from 'semantic-ui-react';

interface Props {
  title: string;
  content: string;
  findings?: string;
  isGood?: boolean;
}

const Note: FC<Props> = ({ title, content, findings, isGood }) => (
  <div>
    <div className="title-box">{title}</div>
    <div className="box">
      <p>{content}</p>
      {findings && (
        <div>
          <Divider horizontal />
          <Segment color={isGood ? 'blue' : 'red'} raised>
            {findings}
          </Segment>
        </div>
      )}
    </div>
  </div>
);

const createNote = ({ title, content, findings, isGood }: Props): string =>
  ReactDOMServer.renderToStaticMarkup(
    <Note title={title} content={content} findings={findings} isGood={isGood} />
  );

export default createNote;
