import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "p-3 border select-none cursor-pointer rounded-md",
        className
      )}
      {...props}
    />
  );
}
