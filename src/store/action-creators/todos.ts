import axios from "axios";
import { ApiTask, TodoAction, TodoActionTypes } from "../../types";
import { Dispatch } from "redux";


export const fetchTodos = (page= 1, limit= 10) => {
    return async (dispatch: Dispatch<TodoAction>): Promise<ApiTask[]> => {
        {
    try {
        dispatch({type: TodoActionTypes.FETCH_TODOS})
      const response = await axios.get<ApiTask[]>(
        "https://jsonplaceholder.typicode.com/todos", {
          params: {_page: page, limit: limit}
        }
      );
      const data: ApiTask[] = response.data;
      setTimeout(()=> {
      dispatch({type: TodoActionTypes.FETCH_TODOS_SUCCESS, payload: response.data})
      }, 1000)
      return data;
    } catch (error) {
        dispatch({type: TodoActionTypes.FETCH_TODOS_ERROR, payload: "Произошла ошибка при загрузке задач"})
      if (error instanceof Error) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      return [];
    }
  }
    }
}

export function setTodoPage(page: number): TodoAction {
  return {type: TodoActionTypes.SET_TODO_PAGE, payload: page}
}