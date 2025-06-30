import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

const SectionHeading = ({ children, className = "" }: SectionHeadingProps) => {
  return <h2 className={`font-semibold text-lg ${className}`}>{children}</h2>;
};

export default SectionHeading;