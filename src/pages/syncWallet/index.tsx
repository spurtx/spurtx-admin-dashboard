import WalletCard from "../../components/syncWallet/WalletCard";
import download from "../../assets/images/svg/download.svg";
import process from "../../assets/images/svg/process.svg";
import upload from "../../assets/images/svg/upload.svg";
import wallet from "../../assets/images/svg/wallet.svg";
import WalletTable from "../../components/syncWallet/WalletTable";

const SyncWallet = () => {
  return (
    <main>
      <h1 className="font-semibold">Sync! Wallet</h1>
      <div className="w-full grid grid-cols-4 gap-5 bg-white p-5 rounded-[7px] shadow-lg mt-3">
        <WalletCard amount="24,000,000" icon={download} totalType="Total Deposit"/>
        <WalletCard amount="13,000,000" icon={process} totalType="Total Amount Processed"/>
        <WalletCard amount="13,000,000" icon={upload} totalType="Total Withdrawal"/>
        <WalletCard amount="11,000,000" icon={wallet} totalType="Wallet Balance"/>
      </div>
      <WalletTable />
    </main>
  );
};

export default SyncWallet;
