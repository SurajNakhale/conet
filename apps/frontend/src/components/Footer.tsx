const Footer = () => {
  return (
    <footer className="mt-24 border-white/10 bg-black px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a href="/" className="text-2xl font-bold tracking-tight text-primary">conet</a>
          <p className="mt-2 text-sm text-white/40">build to learn how Real-time conversations works.</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/50">
          <a href="https://github.com/SurajNakhale" className="transition-colors hover:text-accent">GitHub</a>
          <a href="/login" className="transition-colors hover:text-accent">Login</a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-5 text-xs text-white/30">
        © 2026 conet. Converse here.
      </div>
    </footer>
  )
}

export default Footer