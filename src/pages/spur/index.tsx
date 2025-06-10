import SpurCard from "../../components/spur/SpurCard";
import SpurTable from "../../components/spur/SpurTable";


const Spur = () => {
  return (
    <main className="">
       <h1 className="font-semibold">Appraisal & Survey</h1>
       <div className="w-full grid grid-cols-5 gap-5 bg-white p-5 rounded-[7px] shadow-lg mt-3" >
        <SpurCard appraisalCount="100,000" type="Appraisals Created"/>
        <SpurCard appraisalCount="90,000" type="Surveys Created"/>
        <SpurCard appraisalCount="120" rate='/per survey' type="Avg. Survey Response"/>
        <SpurCard appraisalCount="100" rate="/per appraisal" type="Avg. Appraisal Response"/>
        <SpurCard appraisalCount="17 %" type="Error rate"/>
      </div>
      <SpurTable />

    </main>
  )
}

export default Spur;