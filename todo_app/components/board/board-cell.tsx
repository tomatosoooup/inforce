import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import React from "react";
import { Todo } from "../todo/todo";
import { AddTodoCell } from "../todo/add-todo-cell";

import { TodoType } from "@/typings/todo";

interface BoardCellProps {
  name: string;
  todos?: TodoType[];
}

export const BoardCell = ({ name, todos }: BoardCellProps) => {
  // const [currentTodos, setCurrentTodos] = useState<TodoType[]>(todos || []);
  // const [todosUpd, setTodosUpd] = useState<TodoType[]>(todos || []);

  // const moveTodos = (dragIndex: number, hoverIndex: number) => {
  //   const todo = todos && todos[dragIndex];

  //   const updatedTodos = [...(todos as TodoType[])];
  //   updatedTodos.splice(dragIndex, 1);
  //   updatedTodos.splice(hoverIndex, 0, todo as TodoType);

  //   setCurrentTodos(updatedTodos);
  // };

  // const handleTodoDrop = (item: TodoDto, oldI: number) => {
  //   const todoToUpd = currentTodos[oldI];
  //   if (item.order === todoToUpd.order) return;
  //   setTodosUpd([
  //     { ...todoToUpd, order: item.order },
  //     { ...item, order: todoToUpd.order },
  //   ]);
  // };

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-center font-bold border-b">{name}</h2>
      <div className="flex flex-col flex-1 gap-y-2 max-h-[600px] overflow-y-auto">
        <DndProvider backend={HTML5Backend}>
          {todos?.map((todo, index) => (
            <React.Fragment key={index}>
              <Todo
                todo={todo}
                // index={index}
                // moveTodos={moveTodos}
                // handleTodoDrop={handleTodoDrop}
              />
            </React.Fragment>
          ))}
        </DndProvider>
      </div>
      {name && name === "To Do" && <AddTodoCell />}
    </div>
  );
};
