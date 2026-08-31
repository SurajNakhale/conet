import { useNavigate } from "react-router-dom"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "GitHub", href: "https://github.com/SurajNakhale" }
]

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="fixed left-0 top-4 z-50 w-full px-2 sm:top-8 sm:px-6 hover:translate-y-1 transition-all duration-300">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 px-4 rounded-2xl md:rounded-4xl border border-white/10 bg-black/50 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex shrink-0 items-center justify-center overflow-hidden px-1">
          <a href="/" className="text-xl font-bold tracking-tight text-primary sm:text-3xl">
            conet
          </a>
        </div>

        {/* Navigation */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4 lg:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] font-light text-white/70 transition-colors duration-200 hover:text-accent sm:text-[15px]"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => navigate(`/signin`)}
            className="text-[10px] font-light text-white/70 transition-colors duration-200 hover:text-accent sm:text-[15px]"
          >
            Login
          </button>

          <button
            onClick={() => navigate(`/signup`)}
            className="shrink-0 rounded-xl md:rounded-2xl bg-primary/10 px-2.5 py-1.5 text-[10px] font-light text-white/70 transition-all duration-200 hover:scale-105 sm:rounded-2xl sm:px-5 sm:py-2.5 sm:text-[15px]"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar