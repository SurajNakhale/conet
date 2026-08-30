import { useNavigate } from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-16 border-white/10 bg-black px-4 py-10 text-white sm:mt-20 sm:px-6 lg:mt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 text-center sm:text-left md:flex-row md:items-center md:justify-between">
        <div>
          <a href="/" className="text-2xl font-bold tracking-tight text-primary">conet</a>
          <p className="mt-2 text-sm text-white/40">build to learn how Real-time conversations works.</p>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-white/50 md:justify-end">
          <a href="https://github.com/SurajNakhale" target="_blank" className="transition-colors hover:text-accent">
          GitHub
          </a>
          <button onClick={() => navigate("/signin")} className="transition-colors hover:text-accent">
          Login
          </button>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-5 text-center text-xs text-white/30 sm:text-left">
        © 2026 conet. Converse here.
      </div>
    </footer>
  )
}

export default Footer