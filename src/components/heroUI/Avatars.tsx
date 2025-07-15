export default function Avatars() {
  const avatars = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026302d",
    "https://i.pravatar.cc/150?u=a04258114e29026702d",
  ];

  return (
    <div className="flex -space-x-4">
      {avatars.map((src, index) => (
        <img
          key={index}
          src={src}
          className="w-8 h-8 rounded-full border-2 border-white object-cover"
          alt="avatar"
        />
      ))}

      {/* "+6" avatar */}
      <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F4F3FF] flex items-center pr-1 justify-center text-black text-xs font-medium">
        +6
      </div>
    </div>
  );
}
