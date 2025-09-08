import {TodoAction, TodoActionTypes, TodoState} from '../../types'

const initialState: TodoState = {
  todos: [],
  page: 1,
  error: null,
  limit: 10,
  loading: false,
}

export const todoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS:
      return {...state, loading: true}
    case TodoActionTypes.FETCH_TODOS_SUCCESS:
      return {...state, loading: false, todos: action.payload}
    case TodoActionTypes.FETCH_TODOS_ERROR:
      return {...state, loading: false, error: action.payload}
    case TodoActionTypes.SET_TODO_PAGE:
      return {...state, page: action.payload}
    case TodoActionTypes.REMOVE_TASK:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    case TodoActionTypes.REMOVE_TASK_ERROR:
      return {...state, error: action.payload}
    case TodoActionTypes.TOGGLE_TASK:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {...todo, completed: !todo.completed}
            : {...todo}
        ),
      }
    case TodoActionTypes.TOGGLE_TASK_ERROR:
      return {...state, error: action.payload}
    case TodoActionTypes.ADD_TASK:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      }
    default:
      return state
  }
}
