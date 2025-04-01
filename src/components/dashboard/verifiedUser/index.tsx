import GradientButton from "../../ui/GradientButton";
import LineCurve from "../../graphs/LineCurve";

const VerifiedUsers = () => {
  return (
     <div className="w-full bg-white p-3 border border-gray-300 rounded-md mt-3">
          <div className="flex justify-between">
            <p className="bg-gradient-to-r text-transparent bg-clip-text from-[#00A15D] to-[#C16407]">
              Total Verfied Users
            </p>
            <div className="flex gap-3">
              <GradientButton
                selectOptions={["Sync!", "Score!", "Spur!", "Spark!", "Spot!"]}
                initialSelected="Spot!"
                className="w-25"
              />
              <GradientButton
                selectOptions={["To-date", "Last year"]}
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
              dataPoints={[160, 250, 170, 290, 330, 400, 150]}
            />
          </div>
        </div>
  )
}

export default VerifiedUsers