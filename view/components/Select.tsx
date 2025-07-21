import React, { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const Select: React.FC<SelectProps> = ({ children, className, ...props }) => {
  return (
    <select className={`default-styles ${className}`} {...props}>
      {children}
    </select>
  );
};

export default Select;
