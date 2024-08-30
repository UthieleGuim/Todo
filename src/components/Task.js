import styled from 'styled-components';
import { Trash, Check } from "phosphor-react";

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  background-color: #262626;
  color: #F2F2F2;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const ButtonConcluded = styled.button`
  padding: 0.4rem;
  background: transparent;
  line-height: 0;
  border: 2px solid #4EA8DE;
  border-radius: 50%;
  color: #F2F2F2;
  cursor: pointer;
  margin-top: 4px;

  &:hover {
    background: #1E6F9F;
    border-color: #4EA8DE;
    opacity: 0.7;
  }
`;

const ButtonConcludedCkeck = styled.button`
  padding: 4px;
  background: #5E60CE;
  line-height: 0;
  border: 0;
  border-radius: 50%;
  color:#F2F2F2;
  cursor: pointer;
  margin-top: 4px;

  &:hover {
    background: #8284FA;
  }
`;

const ButtonDelete = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  line-height: 0;
  border: 0;
  border-radius: 4px;
  color: #808080;
  cursor: pointer;

  &:hover {
    background: #333333;
    color: #E25858;
  }
`;

const TextTask = styled.p`
  flex: 1;
`;

const TextTaskConcluded = styled.p`
  flex: 1;
  text-decoration: line-through;
  color: #808080;
`;

export default function Task({ task, onConcludedTask, onDeleteTask }) {
  return (
    <Container>
      {task.status === "concluded" ? (
        <Content>
          <ButtonConcludedCkeck title="Concluir tarefa" onClick={() => onConcludedTask(task.id)}>
            <Check size={14} />
          </ButtonConcludedCkeck>
          <TextTaskConcluded>{task.description}</TextTaskConcluded>
          <ButtonDelete title="Deletar tarefa" onClick={() => onDeleteTask(task.id)}>
            <Trash size={14} />
          </ButtonDelete>
        </Content>
      ) : (
        <Content>
          <ButtonConcluded title="Concluir tarefa" onClick={() => onConcludedTask(task.id)} />
          <TextTask>{task.description}</TextTask>
          <ButtonDelete title="Deletar tarefa" onClick={() => onDeleteTask(task.id)}>
            <Trash size={14} />
          </ButtonDelete>
        </Content>
      )}
    </Container>
  )
}