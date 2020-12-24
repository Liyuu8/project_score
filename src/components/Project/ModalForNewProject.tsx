import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Dimmer,
  Form,
  Header,
  Icon,
  Loader,
  Modal,
} from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { useProjectScoreAction } from 'hooks/project';

interface Props {
  button: React.ReactNode;
}

const ModalForNewProject: FC<Props> = ({ button }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addProjectScore } = useProjectScoreAction();

  const closeModal = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    setError(false);
  };

  const handleSubmit = useCallback(async () => {
    if (!title) {
      setError(true);

      return;
    }

    setPending(true);
    const projectId = uuid();
    await addProjectScore(projectId, title, description);
    setPending(false);
    history.push(`/project/${projectId}`);
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, addProjectScore]);

  const handleCancel = useCallback(async () => closeModal(), []);

  return (
    <Modal
      closeIcon
      trigger={button}
      size="tiny"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={closeModal}
    >
      <Dimmer active={pending} inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
      <Header icon="edit" content="新しいプロジェクトを追加する" />
      <Modal.Content>
        <Form>
          <Form.Input
            fluid
            label="Title"
            placeholder="記入欄"
            value={title}
            error={error}
            onChange={(e, { value }) => {
              setTitle(value ? value.toString() : '');
              if (value) {
                setError(false);
              }
            }}
          />
          <Form.TextArea
            label="Description"
            placeholder="記入欄"
            value={description}
            onChange={(e, { value }) =>
              setDescription(value ? value.toString() : '')
            }
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleCancel}>
          <Icon name="remove" /> キャンセル
        </Button>
        <Button color="green" onClick={handleSubmit}>
          <Icon name="checkmark" /> 決定
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalForNewProject;
