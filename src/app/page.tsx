import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import CareerTimeline from "@/components/sections/CareerTimeline";
import ProfessionalProjects from "@/components/sections/ProfessionalProjects";
import PersonalProjects from "@/components/sections/PersonalProjects";
import Skills from "@/components/sections/Skills";
import Hobbies from "@/components/sections/Hobbies";
import Contact from "@/components/sections/Contact";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionDivider variant="wave" fillClass="fill-surface-alt" />
        <CareerTimeline />
        <SectionDivider variant="tilt" fillClass="fill-surface" flip />
        <ProfessionalProjects />
        <SectionDivider variant="curve" fillClass="fill-surface-alt" />
        <PersonalProjects />
        <SectionDivider variant="diagonal" fillClass="fill-surface" flip />
        <Skills />
        <SectionDivider variant="wave" fillClass="fill-surface-alt" />
        <Hobbies />
        <SectionDivider variant="tilt" fillClass="fill-surface" flip />
        <Contact />
      </main>
    </>
  );
}
