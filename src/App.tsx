import {useEffect} from 'react'
import './App.css'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import {useTypedSelector} from './hooks/useTypedSelector'
import {useDispatch} from 'react-redux'
import {useActions} from './hooks/useActions'
import {ThunkDispatch} from 'redux-thunk'
import {
  addTask,
  removeTask,
  updateToggleTask,
} from './store/action-creators/todos'

function App() {
  const {loading, error, page, todos} = useTypedSelector((state) => state.todo)
  const pages = [1, 2, 3, 4, 5]

  // Лучше вынести в хуки
  const dispatch: ThunkDispatch<{}, {}, any> = useDispatch()
  const {fetchNormalizedTodos, setTodoPage} = useActions()

  const handleSubmit = (userInput: string) => {
    if (userInput.trim()) {
      dispatch(addTask(userInput))
      return todos
    }
  }

  const handleRemove = (id: number) => {
    dispatch(removeTask(id))
  }

  const toggleTask = (id: number) => {
    dispatch(updateToggleTask(id))
  }

  useEffect(() => {
    fetchNormalizedTodos()
  }, [page])

  if (loading) {
    return <h1>Идёт загрузка...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <TodoForm addTask={handleSubmit} />
      <hr className="separator" />
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          removeTask={handleRemove}
          toggleTask={toggleTask}
        />
      ))}
      <div style={{display: 'flex'}}>
        {pages.map((p) => (
          <div
            onClick={() => setTodoPage(p)}
            style={{
              border: p === page ? '2px solid green' : '1px solid gray',
              padding: 10,
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
