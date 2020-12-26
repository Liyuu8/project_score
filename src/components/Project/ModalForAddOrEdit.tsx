import React, { FC, useState } from 'react';
import { Button, Form, Header, Icon, Modal, TextArea } from 'semantic-ui-react';

interface Props {
  id: string;
  label: string;
  content?: string;
  button: React.ReactNode;
  onActionClick: (isSubmitted: boolean, content: string) => void;
}

const ModalForAddOrEdit: FC<Props> = ({
  id,
  label,
  content = '',
  button,
  onActionClick,
}) => {
  const [formContent, setFormContent] = useState(content);
  const [openedModalKey, setOpenedModalKey] = useState('');

  const handleClick = (isSubmitted: boolean) => {
    onActionClick(isSubmitted, formContent);
    if (openedModalKey) {
      setOpenedModalKey('');
    }
  };

  return (
    <Modal
      closeIcon
      trigger={button}
      size="tiny"
      open={openedModalKey === id}
      onOpen={() => setOpenedModalKey(id)}
      onClose={() => setOpenedModalKey('')}
    >
      <Header icon="edit" content={`${label}の${!content ? '追加' : '変更'}`} />
      <Modal.Content>
        <Form>
          <TextArea
            placeholder="記入欄"
            value={formContent}
            onChange={(e, { value }) =>
              setFormContent(value ? value.toString() : '')
            }
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => handleClick(false)}>
          <Icon name="remove" /> キャンセル
        </Button>
        <Button color="green" onClick={() => handleClick(true)}>
          <Icon name="checkmark" /> 決定
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export const addOrEditModalId = {
  addNote: 'addNote:',
  editNote: 'editNote:',
  addScoreMemo: 'addScoreMemo:',
  editScoreMemo: 'editScoreMemo:',
  addGoodFinding: 'addGoodFinding',
  addBadFinding: 'addBadFinding',
  editFinding: 'editFinding:',
} as const;

export default ModalForAddOrEdit;
