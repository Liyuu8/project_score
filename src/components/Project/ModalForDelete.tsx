import React, { FC, useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

interface Props {
  id: string;
  label: string;
  content: string;
  button: React.ReactNode;
  onActionClick: (isSubmitted: boolean) => void;
}

const ModalForDelete: FC<Props> = ({
  id,
  label,
  content,
  button,
  onActionClick,
}) => {
  const [openedModalKey, setOpenedModalKey] = useState('');

  const handleClick = (isSubmitted: boolean) => {
    onActionClick(isSubmitted);
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
      <Header icon="trash" content={`${label}の削除`} />
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => handleClick(false)}>
          <Icon name="remove" /> キャンセル
        </Button>
        <Button color="green" onClick={() => handleClick(true)}>
          <Icon name="checkmark" /> 削除
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalForDelete;
