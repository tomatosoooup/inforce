"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { ConfirmButton } from "../confirm-button";

export const FindBoard = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchValue(term);
  };

  const handleLoad = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    if (searchValue) {
      updatedSearchParams.set("boardId", searchValue.trim());
    } else {
      updatedSearchParams.delete("boardId");
    }

    replace(`${pathname}?${updatedSearchParams.toString()}`);
  };

  useEffect(() => {
    if (!searchParams.get("boardId")) {
      setSearchValue("");
    } else {
      setSearchValue(searchParams.get("boardId")!);
    }
  }, [searchParams]);

  return (
    <div className="flex gap-x-8">
      <Input
        type="text"
        placeholder="Enter a board ID here..."
        onChange={(e) => handleSearch(e.target.value)}
        value={searchValue}
      />
      <ConfirmButton
        className="min-w-[200px]"
        aria-label="Load"
        title="Load"
        onClick={handleLoad}
      >
        Load
      </ConfirmButton>
    </div>
  );
};
