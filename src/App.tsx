import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import Task, { ApiTask, TodoActionTypes } from "./types";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { useActions } from "./hooks/useActions";
import { ThunkDispatch } from "redux-thunk";

function App() {
  // Не нужно высерать кучу селекторов, достаточно одного
  const { loading, error, page, limit, todos } = useTypedSelector(
    (state) => state.todo
  );

  // По хорошему не нужно дублировать стейт, достаточно использовать селектор
  const [newTodos, setNewTodos] = useState(todos);

  // Лучше вынести в хуки
  const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();
  const { fetchTodos, setTodoPage } = useActions();
  const pages = [1, 2, 3, 4, 5];

  // Нужно сделать синхронизацию с бэком, и удалить этот useEffect
  useEffect(() => {
    setNewTodos(todos);
  }, [todos]);

  // В целом ок, типы явно не обязательно указывать, в TS контекстная типизация, он сам типы подхватит
  const addTask = (userInput: string): void => {
    if (userInput) {
      const newTask = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        title: userInput,
        completed: false,
      };
      setNewTodos([newTask, ...newTodos]);
    }
  };

  // Сделать синхронизацию с бэком
  const removeTask = (id: number): void => {
    setNewTodos([...newTodos.filter((todo) => todo.id !== id)]);
  };

  // Сделать синхронизацию с бэком
  const toggleTask = (id: number): void => {
    setNewTodos([
      ...newTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
      ),
    ]);
  };

  // Вынести в action-creators
  async function normalizeTodos() {
    const todos: ApiTask[] = await dispatch(fetchTodos(page, limit));

    const todoData: Task[] = todos.map((dataTodo: ApiTask) => ({
      id: dataTodo.id,
      title: dataTodo.title,
      completed: dataTodo.completed,
    }));
    dispatch({ type: TodoActionTypes.FETCH_TODOS_SUCCESS, payload: todoData });
    setNewTodos(todoData);
  }

  useEffect(() => {
    normalizeTodos();
  }, [page]);

  if (loading) {
    return <h1>Идёт загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <TodoForm addTask={addTask} />
      <hr className="separator" />
      {newTodos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          removeTask={removeTask}
          toggleTask={toggleTask}
        />
      ))}
      <div style={{ display: "flex" }}>
        {pages.map((p) => (
          <div
            onClick={() => setTodoPage(p)}
            style={{
              border: p === page ? "2px solid green" : "1px solid gray",
              padding: 10,
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
