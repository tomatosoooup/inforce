export interface TodoDto {
  id?: number;
  title: string;
  description: string;
  status: string;
  order?: number;
  boardId: string;
}
