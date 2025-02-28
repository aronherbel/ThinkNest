import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';


interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("John Doe");
  const [mounted, setMounted] = useState(false); // Prüft, ob das Component gemountet wurde
  const pathname = usePathname();

  useEffect(() => {
    setProfileImage(localStorage.getItem("profileImage") || null);
    setUserName(localStorage.getItem("userName") || "John Doe");
    setMounted(true); // Erst nach Mounting Icons anzeigen
  }, []);

  return (
    <div className="flex items-center justify-between p-4 pt-6">
      <div className="font-bold ml-5 text-2xl">
        <div className="cursor-pointer" onClick={() => window.location.reload()}>
          Think<span className="text-[#28AD5E]">Nest</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {/* Darkmode-Button nur anzeigen, wenn nicht auf /settings */}
        {pathname !== "/settings" && mounted && (
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 rounded transition-colors duration-300 flex items-center 
                        ${isDarkMode ? "bg-white text-black hover:bg-gray-300" : "bg-black text-white hover:bg-gray-800"}`}
          >
            {isDarkMode ? (
              <i className="bi bi-brightness-high-fill"></i> // Sonnen-Icon für Light Mode
            ) : (
              <i className="bi bi-moon-stars"></i> // Mond-Icon für Dark Mode
            )}
          </button>
        )}
        <p className="font-medium text-md">{userName}</p>
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#28AD5E]" />
        )}
      </div>
    </div>
  );
};

export default Header;
