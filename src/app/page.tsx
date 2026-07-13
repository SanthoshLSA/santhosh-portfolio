import * as React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import FloatingNav from "@/components/FloatingNav";
import FireworkParticles from "@/components/FireworkParticles";
import CosmicBackground from "@/components/CosmicBackground";
import LightModeBackground from "@/components/LightModeBackground";
import MagneticCursor from "@/components/MagneticCursor";
import FireworkSettings from "@/components/FireworkSettings";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden grid-bg">
      <CursorGlow />
      <CosmicBackground />
      <LightModeBackground />
      <MagneticCursor />
      <FireworkSettings />
      <FloatingNav />
      <FireworkParticles />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <WorkExperience />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
