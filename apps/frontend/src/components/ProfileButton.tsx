import { useWsStore } from "@/store/wsStore";
import { LogOutIcon, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const disconnect = useWsStore((state) => state.disconnect);

  function handleLogout(){
    localStorage.removeItem('Authorization');

    disconnect();

    navigate('/');
  }
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        className="group flex h-14 w-14 items-center hover:bg-primary/30 transition-all duration-300  justify-center rounded-full border border-foreground/70 text-foreground hover:border-primary/30"
      >
        <UserRound size={22} className="group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-16 z-20 w-52 transition-all duration-200 rounded-xl border border-primary/10 bg-background p-2 shadow-lg shadow-background/60">
          <button
            onClick={() => navigate("/profile")}
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition hover:bg-primary hover:text-accent"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("/about")}
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition hover:bg-primary hover:text-accent"
          >
            About
          </button>

          <button
            onClick={() => handleLogout()}
            type="button"
            className="flex w-full items-center gap-3 justify-between rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition hover:bg-red-300 hover:text-black"
          >
             Logout
            <LogOutIcon size={17} strokeWidth={1.5} />
          </button>


          <a
            href="https://github.com/SurajNakhale"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition hover:bg-primary hover:text-accent"
          >
            {/* <Github size={17} strokeWidth={1.5} /> */}
            GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
