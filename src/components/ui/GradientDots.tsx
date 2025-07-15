const GradientDots = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-1 h-1 rounded-full bg-[#00A15D]"></div>

      <div className="w-1 h-1 rounded-full bg-gradient-to-r from-[#00A15D] to-[#C16407]"></div>

      <div className="w-1 h-1 rounded-full bg-[#C16407]"></div>
    </div>
  );
};

export default GradientDots;
