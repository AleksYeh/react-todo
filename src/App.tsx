import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import TodoService from "./API/TodoService";
import Task, { ApiTask } from "./types";

function App() {
  const [todos, setTodos] = useState<Task[]>([]);

  const addTask = (userInput: string): void => {
    if (userInput) {
      const newTask: Task = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        title: userInput,
        completed: false,
      };
      setTodos([newTask, ...todos]);
    }
  };

  const removeTask = (id: number): void => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const toggleTask = (id: number): void => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
      ),
    ]);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const todos: ApiTask[] = await TodoService.getAll();
    const todoData: Task[] = todos.map((dataTodo: ApiTask) => ({
      id: dataTodo.id,
      title: dataTodo.title,
      completed: dataTodo.completed,
    }));
    setTodos(todoData);
  }
  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <TodoForm addTask={addTask} />
      <hr className="separator" />
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          removeTask={removeTask}
          toggleTask={toggleTask}
        />
      ))}
    </div>
  );
}

export default App;
