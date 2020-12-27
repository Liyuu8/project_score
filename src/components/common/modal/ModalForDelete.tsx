import React, { FC, useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

interface Props {
  id: string;
  label: string;
  content: string;
  triggerButton: React.ReactNode;
  onActionClick: (isSubmitted: boolean) => void;
}

const ModalForDelete: FC<Props> = ({
  id,
  label,
  content,
  triggerButton,
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
      trigger={triggerButton}
      size="tiny"
      open={openedModalKey === id}
      onOpen={() => setOpenedModalKey(id)}
      onClose={() => setOpenedModalKey('')}
    >
      <Header icon="checkmark" content={`${label}の削除`} />
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="grey" onClick={() => handleClick(false)}>
          <Icon name="remove" /> キャンセル
        </Button>
        <Button color="red" onClick={() => handleClick(true)}>
          <Icon name="trash" /> 削除
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export const deleteModalId = {
  note: 'note:',
  scoreMemo: 'scoreMemo:',
  finding: 'finding:',
} as const;

export default ModalForDelete;
