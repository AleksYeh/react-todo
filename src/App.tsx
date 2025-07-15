import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import TodoService from "./API/TodoService";
import Task, { ApiTask, TodoActionTypes } from "./types";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { fetchTodos } from "./store/action-creators/todos";
import { useDispatch } from "react-redux";
import { useActions } from "./hooks/useActions";




function App() {
  const todosFromRedux = useTypedSelector(state => state.todo.todos);
  const {loading, error, page, limit} = useTypedSelector(state=> state.todo)
  const [todos, setTodos] = useState(todosFromRedux);
  const dispatch = useDispatch();
  const {fetchTodos, setTodoPage} = useActions()
  const pages = [1, 2, 3, 4, 5];

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
    normalizeTodos();
  }, [page]);

  async function normalizeTodos() {
    const todos: ApiTask[] = await fetchTodos(page, limit);
    const todoData: Task[] = todos.map((dataTodo: ApiTask) => ({
      id: dataTodo.id,
      title: dataTodo.title,
      completed: dataTodo.completed,
    }));
    dispatch({type: TodoActionTypes.FETCH_TODOS_SUCCESS, payload: todoData})
    setTodos(todoData);
  }

  if(loading) {
    return <h1>Идёт загрузка...</h1>
  }

  if(error) {
    return <h1>{error}</h1>
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
      <div style={{display: "flex"}}>
        {pages.map(p=> <div
        onClick={() => setTodoPage(p)}
        style={{border:p === page ? "2px solid green" : "1px solid gray", padding: 10}}
      >
        {p}
      </div> )}
      </div>
      
    </div>
  );
}

export default App;
