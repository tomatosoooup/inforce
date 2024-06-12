import { Skeleton } from "@/components/ui/skeleton";

export const BoardSkeletron = () => {
  return (
    <div className="flex flex-col flex-1 gap-y-4">
      <div className="shrink-0 flex-1 grid grid-cols-3 gap-x-2 overflow-y-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="bg-gray-500 flex-1" />
        ))}
      </div>
      <Skeleton className="w-full bg-gray-500 h-[50px] flex items-center justify-center">
        <h4 className=" text-white">Delete</h4>
      </Skeleton>
    </div>
  );
};
