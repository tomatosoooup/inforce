"use client";

import { findAllBoards } from "@/lib/actions/board/get-boards";
import { BoardType } from "@/typings/board";
import { useEffect, useState } from "react";

export const AllBoards = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await findAllBoards();
      if (data.boards) {
        setBoards(data.boards);
      }
    };
    load();
  }, []);
  return (
    <ul className="flex flex-col gap-y-2">
      {boards.map(({ id, name }) => (
        <li className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span
            className="text-gray-500 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(id);
            }}
            title="Click to copy!"
          >
            ID: {id}
          </span>
        </li>
      ))}
    </ul>
  );
};
