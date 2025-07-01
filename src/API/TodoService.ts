import axios from "axios";
import Task from "../types";
import ApiTask from "../types";

export default class TodoService {
  static async getAll(): Promise<Task[]> {
    try {
      const response = await axios.get<ApiTask[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data: ApiTask[] = response.data;
      const todoData: Task[] = data.map((dataTodo: ApiTask) => ({
        id: dataTodo.id,
        title: dataTodo.title,
        completed: dataTodo.completed,
      }));
      return todoData;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      return [];
    }
  }
}
