import * as React from "react";
import { Cpu, Globe, Brain, Database, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <section id="skills" className="py-24 bg-secondary/10 relative overflow-hidden">
      {/* Decorative Blur Blob */}
      <div className="absolute left-1/4 bottom-10 h-[300px] w-[300px] rounded-full bg-primary/5 glow-blur -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-primary/25 bg-primary/5 px-4.5 py-2 text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider font-display mb-4">
            <CheckCircle2 className="h-4 w-4" />
            <span>Expertise</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white font-display uppercase">
            Technical Skillset
          </h2>
          <div className="mt-3 mx-auto h-[4px] w-16 rounded bg-primary" />
        </div>

        {/* Skills Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {skillCategories.map((category, idx) => (
            <Card
              key={idx}
              className="bg-slate-950/20 backdrop-blur-md border border-white/5 hover:border-primary/45 hover:bg-slate-900/30 transition-all duration-300 flex flex-col h-full group"
            >
              <CardHeader className="p-6 pb-4">
                <div className="flex items-center space-x-4.5 mb-3">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-white leading-tight font-display tracking-wide uppercase">
                    {category.title}
                  </CardTitle>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-sans">
                  {category.description}
                </p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow">
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <Badge
                      key={sIdx}
                      variant="secondary"
                      className="bg-secondary/30 hover:bg-primary/25 hover:text-primary border border-white/5 hover:border-primary/35 transition-all duration-200 text-xs uppercase font-display tracking-widest py-1.5 px-3 font-semibold text-muted-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
