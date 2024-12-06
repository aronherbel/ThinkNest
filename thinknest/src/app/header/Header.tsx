"use client";

const Header = () => {
  const handleLogoClick = (): void => {
    window.location.reload(); 
  };

  return (
    <div className="flex items-center justify-between p-4 pt-6">
      <div className="font-bold ml-5 text-2xl ">
        <div className="cursor-pointer" onClick={handleLogoClick}>
          Think<span className="text-[#28AD5E]">Nest</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <p className="font-medium text-md">John Doe</p>
        <div className="w-7 h-7 rounded-full bg-[#28AD5E]" />
      </div>
    </div>
  );
};

export default Header;
