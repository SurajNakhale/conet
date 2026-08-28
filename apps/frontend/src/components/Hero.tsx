import bgHero from "../bg-hero.jpg"

const Hero = () => {
  return (
    <section className="relative flex min-h-180 items-center justify-center overflow-hidden bg-background px-6 text-foreground">

      {/* Background */}
      <div className="absolute inset-0">
        <img
            src={bgHero}
          alt=""
          className="h-full w-full object-cover opacity-60 mask-b-from-80%"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">

        {/* Heading */}
        <h1 className="text-4xl font-medium leading-[1.05] italic tracking-tight text-white sm:text-6xl md:text-6xl">
          Create. 
          <span className="text-accent"> Connect. </span>
          Converse.
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 text-center font-light leading-6 tracking text-white/40 sm:text-lg">
          Create a room around a topic and communicate with everyone in real time.
          <br />
          <span className="italic">No refreshing. No waiting. Just live conversations.</span>
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-6 sm:flex-row">

          <button
            className="
              rounded-2xl bg-primary/10
              px-5 py-2.5
              font-light text-white/70
              transition-all duration-200
              hover:-translate-y-0.5
              border border-primary/20
            "
          >
            Get Started
          </button>

          <button
            className="
              rounded-2xl border border-white/10 bg-transparent px-5 py-2.5
              font-light text-foreground/90 hover:text-black
              transition-all duration-200
              hover:-translate-y-0.5 hover:bg-accent/80 hover:shadow-lg
            "
          >
            Create Room
          </button>

        </div>
      </div>
    </section>
  )
}

export default Hero