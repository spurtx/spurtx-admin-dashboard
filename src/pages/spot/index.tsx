import AcceptedCand from "../../components/spot/AcceptedCand";
import JobList from "../../components/spot/JobList";
import SpotCard from "../../components/spot/SpotCard";
import SpotTable from "../../components/spot/SpotTable";

const Spot = () => {
  return (
    <main>
      <h1 className="font-semibold">Job Applications</h1>
      <div className="w-full grid grid-cols-5 gap-5 bg-white p-5 rounded-[7px] shadow-lg mt-3">
        <SpotCard spotCount="605" type="Total Hired" />
        <SpotCard spotCount="28 Days" type="Avg Hiring time" />
        <SpotCard
          spotCount="20"
          rate="/per month"
          type="Avg. hiring frequency"
        />
        <SpotCard spotCount="Advanced Degree" type="Averega Education" />
        <SpotCard spotCount="12 %" type="Error rate" />
      </div>

      <div className="w-full flex gap-3">
        <div className="w-[55%]">
          <JobList />
        </div>
        <div className="w-[45%]">
          <AcceptedCand />
        </div>
      </div>
      <SpotTable />
    </main>
  );
};

export default Spot;
