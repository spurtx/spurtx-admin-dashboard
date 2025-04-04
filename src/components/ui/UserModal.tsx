interface UserModalProps {
    actions: { label: string; onClick: () => void }[]; 
    onClose: () => void; // Close modal function
  }
  
  const UserModal: React.FC<UserModalProps> = ({ actions, onClose }) => {
    return (
      <div className="bg-white px-7 py-6 shadow-md rounded-md w-80">
        {/* Close Button */}
        <button className="text-black flex justify-end w-full cursor-pointer" onClick={onClose}>
          X
        </button>
  
        {/* Actions List */}
        <div className="mt-2 space-y-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="flex flex-col text-[#777777] text-[13px] cursor-pointer hover:text-gray-900"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default UserModal;
  