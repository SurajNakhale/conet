import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <label className="group flex h-13 max-w-xl ml-[18px] items-center gap-3 rounded-2xl border border-white/10 px-4 text-foreground/70 transition hover:border-primary/30 bg-black">
      <Search
        className="text-white/80 transition duration-400 group-hover:translate-x-0.5"
        size={18}
        strokeWidth={1.5}
      />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search room"
        className="min-w-0 flex-1 text-sm text-white outline-none placeholder:text-foreground/60"
      />
    </label>
  );
};

export default SearchBar;