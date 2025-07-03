import axios from "axios";
import ApiTask from "../types";

export default class TodoService {
  static async getAll(): Promise<ApiTask[]> {
    try {
      const response = await axios.get<ApiTask[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data: ApiTask[] = response.data;
      return data;
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
