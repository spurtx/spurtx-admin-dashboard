interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
}

const CardContainer = ({ children, className }: CardContainerProps) => {
  return (
    <div className={`w-full bg-white p-3 border border-gray-300 rounded-md mt-3 ${className}`}>
      {children}
    </div>
  );
};

export default CardContainer;
