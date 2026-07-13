import * as React from "react";
import { Cpu, Globe, Brain, Database } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedHeading from "./AnimatedHeading";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Cpu className="h-5 w-5 text-primary" />,
      skills: ["C++", "Java", "Python", "C"],
      description: "Problem solving & logic",
    },
    {
      title: "Web Technologies",
      icon: <Globe className="h-5 w-5 text-primary" />,
      skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "React.js", "MySQL", "MongoDB"],
      description: "Full-stack client & server MERN",
    },
    {
      title: "AI & Data Science",
      icon: <Brain className="h-5 w-5 text-primary" />,
      skills: ["Machine Learning", "Deep Learning", "Data Mining", "EDA", "Data Visualization"],
      description: "Models & statistical computing",
    },
    {
      title: "Frameworks & Libraries",
      icon: <Database className="h-5 w-5 text-primary" />,
      skills: ["OpenCV", "Scikit-learn", "Pandas", "NumPy"],
      description: "Image processing & analytics",
    },
  ];

  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative Blur Blob */}
      <div className="absolute left-1/4 bottom-10 h-[300px] w-[300px] rounded-full bg-primary/5 glow-blur -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-primary/25 bg-primary/5 px-4.5 py-2 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider text-primary mb-4">
            <Cpu className="h-4 w-4" />
            <span>Abilities</span>
          </div>
          <AnimatedHeading text="Skills" className="mx-auto" />
          <div className="mt-3 mx-auto h-[4px] w-16 rounded bg-primary" />
        </div>

        {/* Infinite Tech Marquee */}
        <div className="w-full overflow-hidden py-10 relative mb-12">
          {/* Fading edge overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-8 whitespace-nowrap">
            {[
              "JavaScript", "TypeScript", "C++", "Python", "SQL",
              "React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL",
              "MySQL", "TailwindCSS", "Git", "GitHub", "Streamlit", "Vercel", "Sentry", "Hugging Face",
              "JavaScript", "TypeScript", "C++", "Python", "SQL",
              "React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL",
              "MySQL", "TailwindCSS", "Git", "GitHub", "Streamlit", "Vercel", "Sentry", "Hugging Face"
            ].map((skill, idx) => (
              <span
                key={idx}
                className="text-sm sm:text-base font-bold tracking-widest font-display text-muted-foreground/75 hover:text-primary transition-colors flex items-center gap-3 bg-foreground/[0.01] border border-foreground/5 px-5 py-3 rounded-xl shadow-sm cursor-default"
              >
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {skillCategories.map((category, idx) => (
            <ScrollReveal key={idx}>
              <TiltCard
                className="frosted-glass frosted-glass-hover flex flex-col h-full group text-center"
              >
                <CardHeader className="p-6 pb-4 flex flex-col items-center">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 group-hover:scale-110 transition-transform duration-300 mb-3">
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground leading-tight font-display tracking-wide uppercase">
                    {category.title}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-2">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-grow">
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <Badge
                        key={sIdx}
                        variant="secondary"
                        className="bg-secondary/30 hover:bg-primary/25 hover:text-primary border border-foreground/5 hover:border-primary/35 transition-all duration-200 text-xs uppercase font-display tracking-widest py-1.5 px-3 font-semibold text-muted-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
