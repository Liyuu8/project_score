import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Loader,
  Modal,
} from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';

import { useProjectAction, useProjectScoreAction } from 'hooks/project';
import { Project } from 'services/projectscore/models/project';
import paths from 'utils/paths';

interface Props {
  project?: Project;
  triggerButton: React.ReactNode;
}

const ModalForManageProject: FC<Props> = ({ project, triggerButton }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addProjectScore } = useProjectScoreAction();
  const { updateProject, deleteProject } = useProjectAction();

  const openModal = () => {
    setOpen(true);
    setTitle(project ? project.title : '');
    setDescription(project ? project.description : '');
  };

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

    if (!project?.title) {
      setPending(true);
      const projectId = uuid();
      await addProjectScore(projectId, title, description);
      setPending(false);
      history.push(`/project/${projectId}`);
    } else {
      setPending(true);
      await updateProject(project.id, { ...project, title, description });
      setPending(false);
    }
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, addProjectScore]);

  const handleCancel = useCallback(async () => closeModal(), []);

  const handleDelete = useCallback(async () => {
    if (!project) {
      return;
    }

    setPending(true);
    await deleteProject(project.id);
    setPending(false);

    history.replace(paths.home);
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, deleteProject]);

  const StyledButton = styled(Button)`
    &&& {
      margin-right: 15px;
    }
  `;

  return (
    <Modal
      closeIcon
      trigger={triggerButton}
      size="tiny"
      open={open}
      onOpen={openModal}
      onClose={closeModal}
    >
      <Dimmer active={pending} inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
      <Header
        icon="edit"
        content={
          !project?.title
            ? '新しいプロジェクトを追加する'
            : 'プロジェクトを変更・削除する'
        }
      />
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
        <Grid columns={2}>
          {project && (
            <Grid.Column floated="left" textAlign="left">
              <Button color="red" onClick={handleDelete}>
                <Icon name="delete" /> 削除
              </Button>
            </Grid.Column>
          )}
          <Grid.Column floated="right" textAlign="right">
            <StyledButton color="grey" onClick={handleCancel}>
              キャンセル
            </StyledButton>
            <Button color="green" onClick={handleSubmit}>
              <Icon name="checkmark" /> 決定
            </Button>
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalForManageProject;
