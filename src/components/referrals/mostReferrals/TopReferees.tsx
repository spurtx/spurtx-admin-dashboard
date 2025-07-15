import CardContainer from "../../ui/CardContainer";
import { useReferralArray } from "../../../hooks/sync/projects/useReferralData";
import LoadingSpinner from "../../ui/LoadingSpinner";


const TopReferees = () => {
  const { data: referrals = [], isLoading, isError } = useReferralArray();

  if (isLoading) {
    return (
      <CardContainer>
        <div className="flex justify-center items-center h-40">
          <LoadingSpinner />
        </div>
      </CardContainer>
    );
  }

  if (isError) {
    return (
      <CardContainer>
        <div className="text-center py-10 text-red-500">
          Error loading top referees
        </div>
      </CardContainer>
    );
  }

  // Process data to get top referees
  const topReferees = referrals
    .filter(referral => (referral.signUps || 0) > 0 || (referral.frequency || 0) > 0)
    .sort((a, b) => {
      const aReferrals = a.signUps ?? a.frequency ?? 0;
      const bReferrals = b.signUps ?? b.frequency ?? 0;
      return bReferrals - aReferrals;
    })
    .slice(0, 7) // Get top 7 referees
    .map(referral => ({
      name: referral.label,
      referrals: referral.signUps ?? referral.frequency ?? 0
    }));

  // Handle case where there are no referrals
  if (topReferees.length === 0) {
    return (
      <CardContainer>
        <div className="text-center py-10 text-gray-500">
          No referral data available
        </div>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-[25px] pl-7 text-transparent bg-clip-text bg-gradient-to-r from-[#00A15D] to-[#C16407] text-start">
              Top Referees
            </th>
            <th className="py-2 pr-7 text-transparent bg-clip-text bg-gradient-to-r from-[#00A15D] to-[#C16407] text-end">
              Referrals
            </th>
          </tr>
        </thead>
        <tbody>
          {topReferees.map((referee, index) => (
            <tr 
              key={index} 
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2.5 text-start pl-9 text-sm text-gray-900 font-semibold">
                {referee.name}
              </td>
              <td className="py-2 text-end pr-10 text-sm text-gray-500">
                {referee.referrals}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardContainer>
  );
};

export default TopReferees;