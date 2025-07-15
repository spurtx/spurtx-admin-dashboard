interface SmallCardProps {
  children: React.ReactNode;
  className?: string;
}

const SmallCard = ({ children, className }: SmallCardProps) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#00A15D] to-[#C16407] w-full rounded-md p-[1.5px ${className}`}
    >
      <div className="bg-bg-primary px-3 py-4 rounded-md">{children}</div>
    </div>
  );
};

export default SmallCard;
