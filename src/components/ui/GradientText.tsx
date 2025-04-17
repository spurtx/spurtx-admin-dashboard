import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = "" }) => {
  return (
    <p className={`bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent ${className}`}>
      {children}
    </p>
  );
};

export default GradientText;
