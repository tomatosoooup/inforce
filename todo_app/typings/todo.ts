export type TodoType = {
  id: number;
  title: string;
  description: string;
  status: string;
  order?: number;
  boardId: string | null;
};
