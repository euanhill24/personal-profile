import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import CareerTimeline from "@/components/sections/CareerTimeline";
import ProfessionalProjects from "@/components/sections/ProfessionalProjects";
import PersonalProjects from "@/components/sections/PersonalProjects";
import Skills from "@/components/sections/Skills";
import Hobbies from "@/components/sections/Hobbies";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CareerTimeline />
        <ProfessionalProjects />
        <PersonalProjects />
        <Skills />
        <Hobbies />
        <Contact />
      </main>
    </>
  );
}
