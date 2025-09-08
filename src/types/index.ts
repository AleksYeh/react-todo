export default interface Task {
  id: number
  title: string
  completed: boolean
}

export interface ApiTask {
  userId?: number
  id: number
  title: string
  completed: boolean
}

export interface TodoState {
  todos: any[]
  loading: boolean
  error: null | string
  page: number
  limit: number
}

export enum TodoActionTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
  SET_TODO_PAGE = 'SET_TODO_PAGE',
  REMOVE_TASK = 'REMOVE_TASK',
  REMOVE_TASK_ERROR = 'REMOVE_TASK_ERROR',
  TOGGLE_TASK = 'TOGGLE_TASK',
  TOGGLE_TASK_ERROR = 'TOGGLE_TASK_ERROR',
  ADD_TASK = 'ADD_TASK ',
}

interface FetchTodoAction {
  type: TodoActionTypes.FETCH_TODOS
}

interface FetchTodoSuccessAction {
  type: TodoActionTypes.FETCH_TODOS_SUCCESS
  payload: Task[]
}

interface FetchTodoErrorAction {
  type: TodoActionTypes.FETCH_TODOS_ERROR
  payload: string
}

interface SetTodoPage {
  type: TodoActionTypes.SET_TODO_PAGE
  payload: number
}
interface RemoveTask {
  type: TodoActionTypes.REMOVE_TASK
  payload: number
}

interface RemoveTaskError {
  type: TodoActionTypes.REMOVE_TASK_ERROR
  payload: string
}

interface ToggleTask {
  type: TodoActionTypes.TOGGLE_TASK
  payload: number
}

interface ToggleTaskError {
  type: TodoActionTypes.TOGGLE_TASK_ERROR
  payload: string
}

interface AddTask {
  type: TodoActionTypes.ADD_TASK
  payload: Task
}

export type TodoAction =
  | FetchTodoAction
  | FetchTodoErrorAction
  | FetchTodoSuccessAction
  | SetTodoPage
  | RemoveTask
  | RemoveTaskError
  | ToggleTask
  | ToggleTaskError
  | AddTask
