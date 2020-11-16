import React, { FC } from 'react';
import { Form, Header } from 'semantic-ui-react';

const Plots: FC = () => (
  <Form>
    <Header as="h3">廟算八要素</Header>
    <Form.TextArea label="人材" placeholder="記入欄" rows={1} />
    <Form.TextArea label="予算" placeholder="記入欄" rows={1} />
    <Form.TextArea label="納期／リードタイム" placeholder="記入欄" rows={1} />
    <Form.TextArea label="クオリティ" placeholder="記入欄" rows={1} />
    <Form.TextArea label="ビジネスモデル" placeholder="記入欄" rows={1} />
    <Form.TextArea label="環境" placeholder="記入欄" rows={1} />
    <Form.TextArea label="競合" placeholder="記入欄" rows={1} />
    <Form.TextArea label="外敵" placeholder="記入欄" rows={1} />
  </Form>
);

export default Plots;
