import { ArrowUpRight, MessagesSquare, Radio, UsersRound } from "lucide-react"

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
  return (
    <section id="features" className="px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-12">
          <div className="w-full text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Features</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-10 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {features.map(({ number, icon: Icon, title, description }) => (
            <article key={number} className="group flex flex-col gap-4 py-5 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/35">{number}</span>
                <Icon className="h-5 w-5 text-accent/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">{title}</h3>
                <p className="max-w-xs text-sm leading-5 text-white/50">{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border border-primary/20 hover:border-primary/30 bg-primary/10 p-4 transition-transform duration-300 md:py-6 sm:flex-row sm:items-center sm:px-5 sm:py-4">
          <div>
            <p className="text-base font-medium">Your next conversation starts here.</p>
            <p className="mt-1 text-xs text-white/50">Make a room, invite your people, and get talking.</p>
          </div>
          <a href="/signup" className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-white">
            Start a room <ArrowUpRight className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Features