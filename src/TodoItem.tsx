import { RiCloseCircleLine } from "react-icons/ri";
import Task from "./types";
import { JSX } from "react";

interface todoProps {
  todo: Task;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

function TodoItem({ todo, toggleTask, removeTask }: todoProps): JSX.Element {
  return (
    <div className={todo.completed ? "todo-row complete" : "todo-row"}>
      <div className="todo-row-main" onClick={() => toggleTask(todo.id)}>
        {todo.title}
      </div>
      <div className="iconsContainer">
        <RiCloseCircleLine onClick={() => removeTask(todo.id)} />
      </div>
    </div>
  );
}

export default TodoItem;
