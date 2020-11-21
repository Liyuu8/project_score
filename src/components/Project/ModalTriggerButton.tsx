import React, { FC, useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

interface Props {
  label: string;
  value: string;
  button: React.ReactNode;
}

const ModalTriggerButton: FC<Props> = ({ label, value, button }) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const headerContent = `${label}の${!value ? '追加' : '変更'}`;

  return (
    <Modal
      closeIcon
      open={open}
      trigger={button}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Header icon="archive" content={headerContent} />
      <Modal.Content>
        <p>value is {value}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onClose}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={onClose}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalTriggerButton;
