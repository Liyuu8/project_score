import React, { FC, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Dimmer, Form, Header, Loader, Modal } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { useProjectAction, useProjectScoreAction } from 'hooks/project';
import { Project } from 'services/projectscore/models/project';
import paths from 'utils/paths';
import ModalActionButtons from 'components/common/buttons/ModalActionButtons';
import { UserContext } from 'contexts';

interface Props {
  project?: Project;
  triggerButton: React.ReactNode;
}

const ModalForManageProject: FC<Props> = ({ project, triggerButton }) => {
  const history = useHistory();
  const { userId } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const { addProjectScore } = useProjectScoreAction();
  const { updateProject, deleteProject } = useProjectAction();

  const openModal = () => {
    setOpen(true);
    setTitle(project ? project.title : '');
    setDescription(project ? project.description : '');
    setIsPublic(project ? project.isPublic : false);
  };

  const closeModal = () => {
    setOpen(false);
    setError(false);
  };

  const handleSubmit = useCallback(async () => {
    if (!userId) return;
    if (!title) {
      setError(true);

      return;
    }

    if (!project?.title) {
      setPending(true);
      const projectId = uuid();
      await addProjectScore(projectId, title, description, userId, isPublic);
      setPending(false);
      history.push(`/project/${projectId}`);
    } else {
      setPending(true);
      await updateProject(project.id, {
        ...project,
        title,
        description,
        authorId: userId,
        isPublic,
      });
      setPending(false);
    }
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, isPublic, addProjectScore]);

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
              if (project ? project.authorId !== userId : !userId) return;
              setTitle(value ? value.toString() : '');
              if (value) setError(false);
            }}
          />
          <Form.TextArea
            label="Description"
            placeholder="記入欄"
            value={description}
            onChange={(e, { value }) =>
              (project ? project.authorId === userId : userId) &&
              setDescription(value ? value.toString() : '')
            }
          />
          <Form.Checkbox
            label="プロジェクトを公開する"
            toggle
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            disabled={!!project} // TODO: プロジェクト作成後の公開・非公開の変更
          />
        </Form>
      </Modal.Content>
      <ModalActionButtons
        isLoggedIn={!!userId}
        isAuthor={project?.authorId === userId}
        isExisting={!!project}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </Modal>
  );
};

export default ModalForManageProject;
