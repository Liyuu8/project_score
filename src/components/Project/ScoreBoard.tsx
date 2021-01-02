import React, { FC, useContext } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import styled from '@emotion/styled';

import { useNoteAction } from 'hooks/project';
import {
  additionalNoteTypeList,
  noteElements,
} from 'services/projectscore/models/note';
import { ProjectContext, UserContext } from 'contexts';
import ScoreCore from './ScoreCore';
import ModalForAddOrEdit, {
  addOrEditModalId,
} from '../common/modal/ModalForAddOrEdit';
import ScoreMemo from './ScoreMemo';

interface Props {
  projectId: string;
  scoreId: string;
}

const ScoreBoard: FC<Props> = ({ projectId, scoreId }) => {
  const { userId } = useContext(UserContext);
  const { isPublicProject } = useContext(ProjectContext);

  const { addNote } = useNoteAction();

  const StyledGrid = styled(Grid)`
    &&& {
      margin-top: 1px;
    }
  `;
  const StyledButton = styled(Button)`
    &&& {
      margin: 5px;
    }
  `;

  return (
    <>
      <ScoreCore projectId={projectId} scoreId={scoreId} />
      <StyledGrid doubling columns={2}>
        <Grid.Column width={10}>
          <ScoreMemo projectId={projectId} scoreId={scoreId} />
        </Grid.Column>
        <Grid.Column width={6}>
          {userId &&
            additionalNoteTypeList.map((noteType) => (
              <ModalForAddOrEdit
                key={noteType}
                id={addOrEditModalId.addNote + noteType}
                label={noteElements[noteType].name}
                triggerButton={
                  <StyledButton
                    icon="add"
                    size="mini"
                    label={noteElements[noteType].name}
                    labelPosition="left"
                  />
                }
                onActionClick={(isSubmitted, content) =>
                  isSubmitted &&
                  addNote(
                    projectId,
                    scoreId,
                    content,
                    noteType,
                    userId,
                    isPublicProject
                  )
                }
              />
            ))}
        </Grid.Column>
      </StyledGrid>
    </>
  );
};

export default ScoreBoard;
