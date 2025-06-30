import ProposalsSubmitted from "../../../components/sync/proposals/ProposalsSubmitted"
import ProposalStatus from "../../../components/sync/proposals/ProposalStatus"
import ProposalTable from "../../../components/sync/proposals/ProposalTable"
import SectionHeading from "../../../components/ui/SectionHeading"


const Proposals = () => {
  return (
    <main>
     <SectionHeading>Proposals</SectionHeading>
      <div className="flex gap-3 w-full">
        <div className="w-1/2"><ProposalsSubmitted /></div>
        <div className="w-1/2"><ProposalStatus /></div>
      </div>
      <ProposalTable />
    </main>
  )
}

export default Proposals