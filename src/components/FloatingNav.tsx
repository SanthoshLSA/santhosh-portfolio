"use client";

import * as React from "react";
import { User, Briefcase, Cpu, FolderGit2, GraduationCap, Trophy, Award, Mail, Home } from "lucide-react";

export default function FloatingNav() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");

  React.useEffect(() => {
    const handleScroll = () => {
      // Hide sidebar when user is near the top of the page
      setIsVisible(window.scrollY > 120);

      // Section definitions
      const sections = ["about", "experience", "skills", "projects", "education", "achievements", "certifications", "contact"];
      
      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      let currentActive = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Highlight section if it takes up the upper third of the screen
          if (rect.top <= window.innerHeight / 3) {
            currentActive = id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { id: "home", name: "Home", href: "#", icon: <Home className="h-5 w-5" /> },
    { id: "about", name: "About", href: "#about", icon: <User className="h-5 w-5" /> },
    { id: "experience", name: "Experience", href: "#experience", icon: <Briefcase className="h-5 w-5" /> },
    { id: "skills", name: "Skills", href: "#skills", icon: <Cpu className="h-5 w-5" /> },
    { id: "projects", name: "Projects", href: "#projects", icon: <FolderGit2 className="h-5 w-5" /> },
    { id: "education", name: "Education", href: "#education", icon: <GraduationCap className="h-5 w-5" /> },
    { id: "achievements", name: "Honors", href: "#achievements", icon: <Trophy className="h-5 w-5" /> },
    { id: "certifications", name: "Certifications", href: "#certifications", icon: <Award className="h-5 w-5" /> },
    { id: "contact", name: "Contact", href: "#contact", icon: <Mail className="h-5 w-5" /> },
  ];

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3.5 p-3.5 rounded-2xl frosted-glass border border-primary/20 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0 pointer-events-none"
      }`}
    >
      {items.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.name}
            href={item.href}
            className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 shadow-sm ${
              isActive
                ? "text-primary bg-primary/10 border border-primary/40 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                : "bg-foreground/[0.02] border border-foreground/5 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30"
            }`}
            title={item.name}
          >
            {item.icon}
            
            {/* Tooltip */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 bg-popover border border-border text-popover-foreground text-[10px] uppercase font-display tracking-widest px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
              {item.name}
            </div>
          </a>
        );
      })}
    </div>
  );
}
