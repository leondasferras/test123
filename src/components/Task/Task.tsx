import { FC, FormEvent, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { v4 as uuidv4 } from "uuid";
import { TaskModel } from "../../models/task";

type TTasklistProps = {
  task: TaskModel;
};

const StyledTask = styled.li`

  padding: 2px;
  box-sizing: border-box;

  > form {
    display:flex;
    flex-direction:row;
    position: absolute;
    z-index: 10;
  }

  span {
    display: inline-flex;
  }

  > span:nth-last-of-type(-n+2) {
    cursor: pointer;
    border:1px solid tomato;
    border-radius: 5px;
    padding:1px;
    margin: 0 5px;
  }

  input {
    cursor: pointer;
    border:none;
    max-width: 100%
  }

  input:focus {
  outline: none;
}

form:focus-within { 
  outline: 1px solid blue 
}

form > button {
  border:1px solid blue;
  background:blue;
  color:white;
}
`;

export const Task: FC<TTasklistProps> = observer(({ task }) => {
  const [isNewTask, setIsNewTask] = useState(false);
  const [newTask, setNewTask] = useState('')

const onSubmit = (e:FormEvent) => {
  e.preventDefault()
  task.addNewTask(newTask, uuidv4())
  setNewTask('')
  setIsNewTask(false)
}

  return (
    <StyledTask key={task.id} onMouseLeave={() => setIsNewTask(false)}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => task.toggleIsDone()}
      />
      <span>{task.title}</span>
      <span onClick={()=> setIsNewTask(true)}>&#10133;</span>
      <span onClick={()=> task.deleteTask(task.id)}>&#10060;</span>
      {isNewTask ? (
        <form onSubmit={onSubmit}>
          <input autoFocus type="text" value={newTask} onChange={(e)=> setNewTask(e.target.value)} minLength={5} required />
          <button>ADD</button>
        </form>
      ) : null}
      {
        <ul>
          {task.subTasks.map((subtask) => {
            return <Task key={subtask.id} task={subtask} />;
          })}
        </ul>
      }
    </StyledTask>
  );
});
