import { useNavigate } from "react-router-dom"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "GitHub", href: "https://github.com/SurajNakhale" }
]

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <nav className="fixed top-8 left-0 z-50 w-full px-6">
      <div className="mx-auto flex max-w-3xl items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-8 py-3 backdrop-blur-xl">

        {/* Logo */}
        <div className="flex items-center justify-center overflow-hidden px-2 py-2">
            <a
            href="/"
            className="text-3xl font-bold tracking-tight text-primary "
            >
            conet
            </a>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="
                text-md font-light text-white/70
                transition-colors duration-200
                hover:text-accent
              "
            >
              {link.label}
            </a>
          ))}
            <button 
            onClick={() => navigate(`/signin`)}    
            className="
            text-md font-light text-white/70
                transition-colors duration-200
                hover:text-accent
            ">
                Login
            </button>
          <button
            onClick={() => navigate(`/signup`)}
            className="
              rounded-2xl bg-primary/10
              px-5 py-2.5
              font-light text-white/70
              transition-all duration-200
              hover:scale-105
            "
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar