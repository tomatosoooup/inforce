"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { ReactNode } from "react";

interface ISubmitButton extends ButtonProps {
  children: ReactNode;
  isPending?: boolean;
  disabled?: boolean;
}

export const ConfirmButton = ({
  children,
  isPending,
  disabled,
  ...props
}: ISubmitButton) => {
  const loadingText = "Loading...";

  return (
    <Button
      type="submit"
      disabled={isPending || disabled}
      aria-disabled={isPending}
      className={disabled ? "hover:cursor-not-allowed" : ""}
      {...props}
    >
      {isPending ? (
        <span className="flex gap-2 items-center">{loadingText}</span>
      ) : (
        children
      )}
    </Button>
  );
};
