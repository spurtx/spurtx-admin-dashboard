import AdditionRate from "../../components/employees/AdditionRate";
import EmployeeCard from "../../components/employees/EmployeeCard";
import EmployeeTable from "../../components/employees/EmployeeTable";
import ReductionRate from "../../components/employees/ReductionRate";

const Employees = () => {
  return (
    <main>
      <h1 className="font-semibold">Employees</h1>
      <div className="w-full grid grid-cols-5 gap-5 bg-white p-5 rounded-[7px] shadow-lg mt-3">
        <EmployeeCard
          count="10,000"
          type="Total Organization"
          className="h-full"
        />
        <EmployeeCard
          count="400,000"
          type="Total Employees"
          className="h-full"
        />
        <EmployeeCard
          count="12"
          rate="/per organization"
          type="Avg. Num of Department"
          className="h-full"
        />
        <EmployeeCard
          count="20"
          rate="/per organizations"
          type="Avg. Num of employee"
          className="h-full"
        />
        <EmployeeCard
          count="8"
          rate="/per month"
          type="Avg. Employee Deletion Time"
          className="h-full"
        />
      </div>
      <div className="w-full gap-3 flex">
        <div className="w-1/2"><AdditionRate /></div>
        <div className="w-1/2"><ReductionRate /></div>
      </div>
      <EmployeeTable />
    </main>
  );
};

export default Employees;
