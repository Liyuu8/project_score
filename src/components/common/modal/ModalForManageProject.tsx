import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { Dimmer, Form, Header, Loader, Modal } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { useProjectAction, useProjectScoreAction } from 'hooks/project';
import { Project } from 'services/projectscore/models/project';
import paths from 'utils/paths';
import ModalActionButtons from 'components/common/buttons/ModalActionButtons';

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
        icon={!project?.title ? 'file outline' : 'options'}
        content={
          !project?.title ? '新しいプロジェクトの追加' : 'プロジェクトの設定'
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
      <ModalActionButtons
        isExisting={!!project}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </Modal>
  );
};

export default ModalForManageProject;
