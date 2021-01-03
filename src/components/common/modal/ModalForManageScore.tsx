import React, { FC, useCallback, useContext, useState } from 'react';
import { Dimmer, Form, Header, Loader, Modal } from 'semantic-ui-react';

import { useScoreAction, useScoreDataAction } from 'hooks/project';
import { Score } from 'services/projectscore/models/score';
import ModalActionButtons from 'components/common/buttons/ModalActionButtons';
import { UserContext } from 'contexts';

interface Props {
  projectId: string;
  score?: Score;
  triggerButton: React.ReactNode;
}

const ModalForManageScore: FC<Props> = ({
  projectId,
  score,
  triggerButton,
}) => {
  const { userId } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [isCopyLastScore, setIsCopyLastScore] = useState(true);
  const {
    addScoreDataFromExisiting,
    addScoreDataFromScratch,
  } = useScoreDataAction();
  const { updateScore, deleteScore } = useScoreAction();

  const openModal = () => {
    setOpen(true);
    setTitle(score ? score.title : '');
    setIsCopyLastScore(true);
  };

  const closeModal = () => {
    setOpen(false);
    setError(false);
  };

  const handleSubmit = useCallback(async () => {
    if (!title) {
      setError(true);

      return;
    }

    setPending(true);
    if (!score?.title) {
      if (isCopyLastScore) {
        await addScoreDataFromExisiting(projectId, title);
      } else {
        await addScoreDataFromScratch(projectId, title);
      }
    } else {
      await updateScore(projectId, { ...score, title });
    }

    setPending(false);

    closeModal();
  }, [
    projectId,
    score,
    title,
    isCopyLastScore,
    addScoreDataFromExisiting,
    addScoreDataFromScratch,
    updateScore,
  ]);

  const handleCancel = useCallback(async () => closeModal(), []);

  const handleDelete = useCallback(async () => {
    if (!score) {
      return;
    }

    setPending(true);
    await deleteScore(projectId, score.id, score.index);
    setPending(false);

    closeModal();
  }, [projectId, score, deleteScore]);

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
        icon={!score?.title ? 'file outline' : 'options'}
        content={!score?.title ? '新しい譜面の追加' : '譜面の設定'}
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
              if (score?.authorId !== userId) return;
              setTitle(value ? value.toString() : '');
              if (value) setError(false);
            }}
          />
          {!score && (
            <Form.Checkbox
              label="最新の譜面から複製して作成する"
              toggle
              checked={isCopyLastScore}
              onChange={() => setIsCopyLastScore(!isCopyLastScore)}
            />
          )}
        </Form>
      </Modal.Content>
      <ModalActionButtons
        isAuthor={score?.authorId === userId}
        isExisting={!!score}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </Modal>
  );
};

export default ModalForManageScore;
