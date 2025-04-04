import { RiArrowLeftSLine } from "react-icons/ri";
import { Link } from "react-router";
import MostReferrals from "../../components/referrals/mostReferrals";
import TopReferees from "../../components/referrals/mostReferrals/TopReferees";
import Discount from "../../components/referrals/discount";

const Referrals = () => {
  return (
    <div>
      <Link to="/">
        <span className="flex items-center">
          <RiArrowLeftSLine className="text-[19px] mt-0.5" /> Referral
        </span>
      </Link>
      <div className="flex gap-2">
        <div className="w-[60%]">
          <MostReferrals />
        </div>
        <div className="w-[40%]">
          <TopReferees />
        </div>
      </div>
      <Discount />
    </div>
  );
};

export default Referrals;
