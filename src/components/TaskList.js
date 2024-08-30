import { useState } from "react";
import { PlusCircle } from "phosphor-react";
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid"

import Task from "./Task";

import Clipboard from "../assets/clipboard.svg";

const Container = styled.main`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 736px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  margin-top: calc(0px - 1.5rem - 3px);
`;

const Input = styled.input`
  flex: 1;
  height: 36px;
  background: #262626;
  color: #F2F2F2;
  font-size: 0.875rem;
  border: 1px solid #0D0D0D;
  border-radius: 8px;
  padding: 1rem;

  transition: all 0.1s;

  &:focus {
    border-color: #5E60CE;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 64px;
  background: #1E6F9F;
  color: #F2F2F2;
  font-size: 0.875rem;
  font-weight: bold;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  gap: 0.5rem;

  transition: all 0.1s;

  &:not(:disabled):hover {
    background: var(--blue-200);
  }

  &:disabled {
    opacity: 0.9;
    cursor: not-allowed;
  }
`;

const ContainerTaskInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 64px;
  font-size: 12px;
  margin-bottom: 20px;
`;

const DescriptionCreate = styled.strong`
  display: flex;
  height: 20px;
  gap: 0.5rem;
  color: #4EA8DE;
  padding: 2px 4px;
`;

const CountCreate = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: #333333;
  color: #D9D9D9;
  padding: 2px 4px;
`;

const DescriptionCompleted = styled.strong`
  display: flex;
  height: 20px;
  gap: 0.5rem;
  color: #8284FA;
  padding: 2px 4px;
`;

const CountCompleted = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: #333333;
  color: #D9D9D9;
  padding: 2px 4px;
`;

const ContainerEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid #333333;
  border-radius: 8px;
  padding: 64px 0;
  line-height: 1.4;
`;

const TitleEmpty = styled.strong`
  padding-top: 16px;
  color: #808080;
`;

const DescriptionEmpty = styled.span`
  color: #808080;
`;

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  
  function handleCreateNewTask(event) {
    event.preventDefault();

    const task = {
      id: uuidv4(),
      description: newTask,
      status: "pending",
    }

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function handleNewTaskChange(event) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event) {
    event.target.setCustomValidity("Esse Campo é obrigatório");
  }

  function concludedTask(idTaskToConcluded) {
    const tasksWithChangeStatus = tasks.map(task => {
      if(task.id === idTaskToConcluded) {
        if(task.status === "concluded") {
          task.status = "pending";
        } else {
          task.status = "concluded";
        }
        return task;
      } else {
        return task;
      }
    });

    setTasks(tasksWithChangeStatus);
  }

  function deleteTask(idTaskToDelete) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      if(task.id !== idTaskToDelete) {
        return task;
      }
    });

    setTasks(tasksWithoutDeletedOne);
  }
  return (
    <Container>
      <Content>
        <Form onSubmit={handleCreateNewTask}>
          <Input type="text" name="task" placeholder="Adicione uma nova tarefa" value={newTask} onChange={handleNewTaskChange} onInvalid={handleNewTaskInvalid} required />
          <Button>
            Criar <PlusCircle size={20} />
          </Button>
        </Form>

        <ContainerTaskInfo>
          <DescriptionCreate>
            Tarefas criadas <CountCreate>{tasks.length}</CountCreate>
          </DescriptionCreate>

          <DescriptionCompleted>
            Concluídas <CountCompleted>{tasks.filter(task => task.status === 'concluded').length}</CountCompleted>
          </DescriptionCompleted>
        </ContainerTaskInfo>
        
        {tasks.length === 0 ? (
          <ContainerEmpty>
            <img src={Clipboard} alt="Clipboard" />
            <TitleEmpty>Você ainda não tem tarefas cadastradas</TitleEmpty>
            <DescriptionEmpty>Crie tarefas e organize seus itens a fazer</DescriptionEmpty>
          </ContainerEmpty>
        ) : (
          tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onConcludedTask={concludedTask}
              onDeleteTask={deleteTask} 
            />
          ))
        )}
      </Content>
    </Container>
  )
}