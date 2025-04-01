import GradientButton from "../../ui/GradientButton";
import LineCurve from "../../graphs/LineCurve";

const ActiveUsers = () => {
  return (
    <div className="w-full bg-white p-3 border border-gray-300 rounded-md">
      <div className="flex justify-between">
        <p className="bg-gradient-to-r text-transparent bg-clip-text from-[#00A15D] to-[#C16407]">
          Total Active Users
        </p>
        <div className="flex gap-3">
          <GradientButton
            selectOptions={["Sync!", "Score!", "Spur!", "Spark!", "Spot!"]}
            initialSelected="Sync!"
            className="w-25"
          />
          <GradientButton
            selectOptions={["To-date", "Last month"]}
            initialSelected="To-date"
            className="w-25"
          />
          <GradientButton
            selectOptions={["Graph", "Chart"]}
            initialSelected="Graph"
            className="w-25"
          />
        </div>
      </div>
      <div className="mt-4">
        <LineCurve
          labels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          dataPoints={[130, 200, 170, 260, 370, 260, 180]}
        />
      </div>
    </div>
  );
};

export default ActiveUsers;
