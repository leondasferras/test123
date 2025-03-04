import { FC } from "react";
import styled from "styled-components";
import { TaskModel } from "../../models/task";
import { Task } from "../Task/Task";

type TTasklistProps = {
  tasks: TaskModel[];
};


const StyledTaskList = styled.ul`
min-width: 200px;
display: flex;
flex-direction: column;
height: 1000px;

  li:first-of-type {
    margin-top: 10px;
  }

  li:last-of-type {
    margin-bottom: 10px;
  }

  input {
    cursor: pointer;
  }
`;

export const Tasklist: FC<TTasklistProps> = ({ tasks }) => {
  return (
    <StyledTaskList>
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </StyledTaskList>
  );
};
