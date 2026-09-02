import { ArrowUpRight, MessagesSquare, Radio, UsersRound } from "lucide-react"
import { useNavigate } from "react-router-dom"

const features = [
  {
    number: "01",
    icon: Radio,
    title: "Real-time messaging",
    description: "Messages are delivered instantly through WebSockets.",
  },
  {
    number: "02",
    icon: MessagesSquare,
    title: "Room-based conversations",
    description: "Create or join rooms focused on a specific topic.",
  },
  {
    number: "03",
    icon: UsersRound,
    title: "Live presence",
    description: "See who's currently connected and join the conversation.",
  },
]

const Features = () => {
  const navigate = useNavigate();

  return (
    <section id="features" className="px-4 py-10 text-white sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 border-b border-white/10 pb-8 text-center sm:pb-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">Features</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-y-0 md:divide-white/10">
          {features.map(({ number, icon: Icon, title, description }) => (
            <article
              key={number}
              className="group flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/2 p-5 md:rounded-none md:border-0 md:bg-transparent md:p-6 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/35">{number}</span>
                <Icon className="h-5 w-5 text-accent/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium sm:text-xl">{title}</h3>
                <p className="max-w-xs text-sm leading-6 text-white/50 sm:text-base">{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="group mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/10 p-4 transition-transform duration-300 hover:border-primary/30 sm:flex-row sm:items-center sm:px-5 sm:py-4 md:mt-16">
          <div>
            <p className="text-base font-medium sm:text-lg">Your next conversation starts here.</p>
            <p className="mt-1 text-xs text-white/50 sm:text-sm">Make a room, invite your people, and get talking.</p>
          </div>
          <button 
          onClick={() => navigate("/rooms")}
          className="group inline-flex items-center gap-1 text-base text-accent transition-colors hover:text-white">
            create a room 
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Features