const TopReferees = () => {
    const referees = [
      { name: "John Doe", referrals: 120 },
      { name: "Jane Smith", referrals: 110 },
      { name: "Alice Johnson", referrals: 95 },
      { name: "Bob Brown", referrals: 85 },
      { name: "Charlie White", referrals: 80 },
      { name: "David Black", referrals: 75 },
      { name: "Emma Wilson", referrals: 70 },
    ];
  
    return (
      <div className="w-full bg-white py-3 border border-gray-300 rounded-md mt-3 text-center">
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
            {referees.map((referee, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="py-2.5 text-start pl-9 text-sm text-gray-900 font-semibold">{referee.name}</td>
                <td className="py-2 text-end pr-10 text-sm text-gray-500">{referee.referrals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TopReferees;  