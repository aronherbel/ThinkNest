"use client";

const Header = () => {
  const handleLogoClick = (): void => {
    window.location.reload(); // Diese Funktion lädt die Seite neu
  };

  return (
    <div className="flex items-center justify-between p-4 ">
      <div className="text-xl font-bold ml-5 xl:text-2xl ">
        <div className="cursor-pointer" onClick={handleLogoClick}>
          Think<span className="text-[#28AD5E]">Nest</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <p className="font-medium text-xs xl:text-md">John Doe</p>
        <div className="w-5 h-5 rounded-full bg-[#28AD5E]" />
      </div>
    </div>
  );
};

export default Header;
