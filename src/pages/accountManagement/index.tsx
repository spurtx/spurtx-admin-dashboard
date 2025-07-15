import CardContainer from "../../components/ui/CardContainer";
import GradientText from "../../components/ui/GradientText";

const AccountManagement = () => {
  return (
    <main className="w-full">
      <h1 className="font-semibold">Account Management</h1>
      <CardContainer className="h-100">
        <p className="font-semibold mt-10 text-center">Account Management</p>
        <div className="flex justify-center items-center gap-3 mt-5">
          <input
            className="border border-gray-500 py-2 w-70 rounded-md pl-3 text-[13px]"
            placeholder="Email@email.com"
          />
          <div className="p-[1.3px] rounded-lg bg-gradient-to-r from-[#00A15D] to-[#C16407]">
            <button className="bg-white rounded-md px-4 py-1.5">
              <GradientText>Submit</GradientText>
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-7">
          <button className="!bg-gradient-to-r from-primary to-secondary !text-white py-2 px-2 rounded-md mt-1 font-semibold cursor-pointer disabled:opacity-60">Log Me In</button>
        </div>
      </CardContainer>
    </main>
  );
};

export default AccountManagement;
