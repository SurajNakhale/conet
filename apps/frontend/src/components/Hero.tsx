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
          className="h-full w-full object-cover opacity-60 mask-b-from-80%"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">

        {/* Heading */}
        <h1 className="max-w-3xl text-4xl mt-20 font-semibold leading-[0.98] italic tracking-tight text-white sm:text-5xl md:text-6xl lg:text-8xl">
          <span className="text-white/80">Create.</span>
          <span className="text-accent"> Connect. </span>
          <span className="text-white/80"> Converse. </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-2xl
        text-base leading-7
        text-white/60
        sm:text-lg">
          Create a room around a topic and communicate with everyone in real time.
          <br />
          <span className="italic text-white/45">No refreshing. No waiting. Just live conversations.</span>
        </p>

        {/* Actions */}
        <div className="mt-9 flex w-64 items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">

          <button
          onClick={() => navigate("/signup")}
            className="
              rounded-2xl bg-primary/20
          px-6 py-3
          text-sm text-white
          transition-all duration-200
          hover:-translate-y-0.5
          hover:brightness-110
            "
          >
            Get Started
          </button>

          <button
          onClick={() => navigate("/rooms")}
            className="
              rounded-2xl border border-primary/15
          px-6 py-3
          text-sm font-medium text-white/80
          transition-all duration-200
          hover:-translate-y-0.5
          hover:border-primary/40
          hover:bg-primary/5

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