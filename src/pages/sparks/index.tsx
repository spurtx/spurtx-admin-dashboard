import SparkBars from "../../components/sparks/SparkBars";
import SparkTable from "../../components/sparks/SparkTable";
import SparkTotals from "../../components/sparks/SparkTotals";

const Sparks = () => {
  return (
    <main>
      <h1 className="font-semibold">Sparks</h1>
      <SparkTotals />
      <SparkBars />
      <SparkTable />

    </main>
  )
}

export default Sparks;