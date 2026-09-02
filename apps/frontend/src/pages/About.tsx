import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto w-full max-w-4xl">

        {/* Page heading */}
        <div className="mb-8">
            <div className=" flex justify-start items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Go back"
                  className="p-2 text-white/60 transition duration-200  "
                >
                  <ArrowBigLeft size={28} strokeWidth={2} className="hover:text-primary/30 hover:scale-110 transition-all duration-200 text-white/50 brightness-130" />
                </button>
                <h1 className="text-3xl font-bold tracking-tight">
                    About
                </h1>
            </div>

          <p className="mt-1 text-sm text-foreground/50">
            Why I built conet and what I learned along the way.
          </p>
        </div>


        {/* Why I built conet */}
        <section className="mb-5 rounded-3xl border border-primary/10 bg-black p-6 sm:p-8">

          <p className="mb-3 text-xs tracking-wider text-accent/70">
            The idea & Motivation
          </p>

          <h2 className="text-2xl font-semibold tracking-tight">
            Why I built conet
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/60 sm:text-base">
           I was curious about how real-time communication works. While learning about it, I came across the WebSocket protocol and decided to build a chat application to understand it through hands-on experience.
            <br />
            <br />
            Along the way, I also explored TanStack Query for server-state management and Zustand for client-side state management in React.
            <br />
            <br />

            This became conet — a room-based chat application where users can create rooms, join conversations, and communicate in real time.
            <br />
            <br />

            I enjoy learning by building rather than only covering theory. Building something forces me to understand how the concepts work together and the problems they actually solve.
          </p>
          

        </section>


        {/* What I learned */}
        <section className="mb-10">

          <div className="mb-5">
            <p className="text-xs tracking-wider text-accent/70">
              Learning
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              What I learned
            </h2>
          </div>


          <div className="grid gap-4 sm:grid-cols-2">

            {/* WebSockets */}
            <div className="rounded-2xl border border-primary/10 bg-black p-6 transition hover:border-accent/20">

              <h3 className="font-semibold">
                WebSockets
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground/50">
                Learned how persistent connections allow the server
                to communicate with clients in real time without
                repeatedly requesting new data.
              </p>

            </div>


            {/* TanStack Query */}
            <div className="rounded-2xl border border-primary/10 bg-black p-6 transition hover:border-accent/20">

              <h3 className="font-semibold">
                TanStack Query
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground/50">
                Learned how to manage server state, caching,
                mutations, and query invalidation instead of
                manually synchronizing API data.
              </p>

            </div>


            {/* Zustand */}
            <div className="rounded-2xl border border-primary/10 bg-black p-6 transition hover:border-accent/20">

              <h3 className="font-semibold">
                Zustand
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground/50">
                Learned when global client-side state is useful,
                especially for state coming from WebSocket events.
              </p>

            </div>


            {/* React */}
            <div className="rounded-2xl border border-primary/10 bg-black p-6 transition hover:border-accent/20">

              <h3 className="font-semibold">
                React
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground/50">
                Improved my understanding of component architecture,
                hooks, effects, props, local state, and responsive UI.
              </p>

            </div>

          </div>

        </section>


        {/* Challenges */}
        <section className="mb-10">

          <div className="mb-5">
            <p className="text-xs  tracking-wider text-accent/70">
              Experience
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              Challenges
            </h2>
          </div>


          <div className="overflow-hidden rounded-3xl border border-primary/10 bg-black">

            <div className="border-b border-primary/10 p-6">
              <h3 className="font-medium">
                WebSocket connection lifecycle
              </h3>

              <p className="mt-2 text-sm leading-6 text-foreground/50">
                Understanding when to connect, disconnect, and
                clean up a WebSocket connection when users move
                between rooms.
              </p>
            </div>

            <div className="border-b border-primary/10 p-6">
              <h3 className="font-medium">
                Keeping server state synchronized
              </h3>

              <p className="mt-2 text-sm leading-6 text-foreground/50">
                Making sure the UI reflects changes after creating,
                editing, or deleting data on the server.
              </p>
            </div>

            <div className="p-6">
              <h3 className="font-medium">
                Responsive chat interface
              </h3>

              <p className="mt-2 text-sm leading-6 text-foreground/50">
                Designing a chat layout that works naturally across
                desktop and smaller screens.
              </p>
            </div>

          </div>

        </section>


        {/* What's next */}
        <section className="rounded-3xl border border-primary/10 bg-black p-6 sm:p-8">

          <p className="text-xs  tracking-wider text-accent/70">
            Next
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            What's next
          </h2>

          <p className="mt-4 text-sm leading-7 text-foreground/50">
            integrating Redis Pub/Sub to understand how we can scale ws servers horizontally
            for now this is simple ws server
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <p>horizantally scaling ws server using pub/sub</p>
          </div>

        </section>

      </div>
    </main>
  );
};

export default About;