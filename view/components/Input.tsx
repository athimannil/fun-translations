import type { HTMLProps, ChangeEvent } from "react";
import clsx from "clsx";

interface InputProps extends HTMLProps<HTMLTextAreaElement> {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Input({ onChange, className, ...props }: InputProps) {
  return (
    <textarea
      {...props}
      rows={4}
      autoFocus
      required
      spellCheck="false"
      autoComplete="off"
      onChange={onChange}
      placeholder="Enter the text you want to translate here..."
      className={clsx("p-3 border border-gray-400 rounded-md", className)}
    />
  );
}
