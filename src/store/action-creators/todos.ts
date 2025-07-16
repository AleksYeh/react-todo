import axios from 'axios'
import Task, {ApiTask, TodoAction, TodoActionTypes} from '../../types'
import {Dispatch} from 'redux'

export const fetchNormalizedTodos = (page = 1, limit = 10) => {
  return async (dispatch: Dispatch<TodoAction>): Promise<ApiTask[]> => {
    {
      try {
        dispatch({type: TodoActionTypes.FETCH_TODOS})
        const response = await axios.get<ApiTask[]>(
          'https://jsonplaceholder.typicode.com/todos',
          {
            params: {_page: page, limit: limit},
          }
        )
        const data: ApiTask[] = response.data
        const normalizedTodos: Task[] = data.map((todo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        }))

        setTimeout(() => {
          dispatch({
            type: TodoActionTypes.FETCH_TODOS_SUCCESS,
            payload: normalizedTodos,
          })
        }, 1000)
        return data
      } catch (error) {
        dispatch({
          type: TodoActionTypes.FETCH_TODOS_ERROR,
          payload: 'Произошла ошибка при загрузке задач',
        })
        if (error instanceof Error) {
          console.error('Axios error:', error.message)
        } else {
          console.error('Unexpected error:', error)
        }
        return []
      }
    }
  }
}

export function setTodoPage(page: number): TodoAction {
  return {type: TodoActionTypes.SET_TODO_PAGE, payload: page}
}

export const removeTask = (id: number) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    dispatch({
      type: TodoActionTypes.REMOVE_TASK,
      payload: id,
    })
  } catch (error) {
    dispatch({type: TodoActionTypes.REMOVE_TASK_ERROR, error: error.message})
    console.log(error.message)
  }
}

export const updateToggleTask = (id: number) => async (dispatch) => {
  try {
    await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    dispatch({type: TodoActionTypes.TOGGLE_TASK, payload: id})
  } catch (error) {
    dispatch({type: TodoActionTypes.TOGGLE_TASK_ERROR, payload: error.message})
    console.log(error.message)
  }
}
export const addTask = (title: string) => async (dispatch) => {
  try {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos/',
      {title, completed: false}
    )
    dispatch({
      type: TodoActionTypes.ADD_TASK,
      payload: {
        id: Date.now(),
        title: title,
        completed: false,
      },
    })
  } catch (error) {
    console.error('Ошибка:', error)
  }
}
