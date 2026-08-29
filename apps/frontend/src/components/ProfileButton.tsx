import { UserRound } from "lucide-react";
import { useState } from "react";

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/70 text-foreground transition hover:border-accent hover:text-accent"
      >
        <UserRound size={22} strokeWidth={1.5} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-16 z-20 w-52 rounded-xl border border-primary bg-background p-2 shadow-lg shadow-background/60">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition hover:bg-primary hover:text-accent"
          >
            Profile
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition hover:bg-primary hover:text-accent"
          >
            Settings
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition hover:bg-primary hover:text-accent"
          >
            About
          </button>
          <a
            href="https://github.com/"
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
