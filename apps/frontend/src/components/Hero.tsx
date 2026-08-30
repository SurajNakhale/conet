import { useNavigate } from "react-router-dom"
import bgHero from "../bg-hero.jpg"

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-background px-4 py-16 text-foreground sm:min-h-[70vh] sm:px-6 lg:min-h-[80vh]">

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
        <h1 className="max-w-3xl text-4xl mt-20 font-medium leading-[0.98] italic tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Create.
          <span className="text-accent"> Connect. </span>
          Converse.
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-5 text-white/40 sm:text-base md:text-lg">
          Create a room around a topic and communicate with everyone in real time.
          <span className="mt-1 block italic text-white/60">No refreshing. No waiting. Just live conversations.</span>
        </p>

        {/* Actions */}
        <div className="mt-7 flex w-64 items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">

          <button
          onClick={() => navigate("/signup")}
            className="
              w-full rounded-2xl border border-primary/20 bg-primary/10
              px-5 py-2.5 text-sm font-light text-white/70
              transition-all duration-200 hover:-translate-y-0.5
              sm:w-auto
            "
          >
            Get Started
          </button>

          <button
          onClick={() => navigate("/rooms")}
            className="
              w-full rounded-2xl border border-white/10 bg-transparent px-5 py-2.5
              text-sm font-light text-foreground/90 transition-all duration-200
              hover:-translate-y-0.5 hover:bg-accent/80 hover:text-black hover:shadow-lg
              sm:w-auto
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