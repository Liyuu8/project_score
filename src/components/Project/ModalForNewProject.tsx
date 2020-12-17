import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Dimmer,
  Form,
  Header,
  Icon,
  Input,
  Loader,
  Modal,
  TextArea,
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addProjectScore } = useProjectScoreAction();

  const handleSubmit = useCallback(async () => {
    setPending(true);
    const projectId = uuid();
    await addProjectScore(projectId, title, description);
    setPending(false);
    history.push(`/project/${projectId}`);

    setOpen(false);
    setTitle('');
    setDescription('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, addProjectScore]);

  const handleCancel = useCallback(async () => {
    setOpen(false);
    setTitle('');
    setDescription('');
  }, []);

  return (
    <Modal
      closeIcon
      trigger={button}
      size="tiny"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Dimmer active={pending} inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
      <Header icon="edit" content="新しいプロジェクトを追加する" />
      <Modal.Content>
        <Form>
          <Input
            fluid
            label="Title"
            placeholder="記入欄"
            value={title}
            onChange={(e, { value }) => setTitle(value ? value.toString() : '')}
          />
          <TextArea
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
