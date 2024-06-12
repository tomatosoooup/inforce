import { Header } from "../../components/layouts/header";
import { Main } from "../../components/layouts/main";

export default function Home({
  searchParams,
}: {
  searchParams: {
    boardId?: string;
  };
}) {
  // Not necessacy to do but it's prettier than pass searchParams.boardId to Main component
  const boardId = searchParams.boardId;

  return (
    <>
      <Header />
      <Main boardId={boardId as string} />
    </>
  );
}
