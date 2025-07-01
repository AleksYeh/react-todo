export default interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface ApiTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
