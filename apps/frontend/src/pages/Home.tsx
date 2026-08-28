import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const Home = () => {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar/>
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}

export default Home