import * as React from "react";
import { Award, ShieldCheck, BrainCircuit, Landmark, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Certifications() {
  const certificationsData = [
    {
      title: "Responsible and Safe AI Systems",
      organization: "NPTEL • Ministry of Education, Govt. of India",
      achievement: "Top 1% Nationwide",
      score: "Score: 90%",
      date: "2024",
      verifyUrl: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs132/Course/NPTEL24CS132S75250993804273067.pdf",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: "Affective Computing",
      organization: "NPTEL • Ministry of Education, Govt. of India",
      achievement: "Gold + Elite Certificate",
      score: "Score: 90%",
      date: "2025",
      verifyUrl: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs04/Course/NPTEL25CS04S34320331304202524.pdf",
      icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    },
    {
      title: "Complete Full Stack Web Development Bootcamp",
      organization: "Udemy Professional Training",
      achievement: "PERN Stack Development",
      score: "Course Completed",
      date: "Completed 2025",
      verifyUrl: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-95f49464-1073-43f3-9d59-13494562fd0c.pdf",
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <section id="certifications" className="py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-10 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/5 glow-blur -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-primary/25 bg-primary/5 px-4.5 py-2 text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider font-display mb-4">
            <Award className="h-4 w-4" />
            <span>Credentials</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white font-display uppercase">
            Certifications
          </h2>
          <div className="mt-3 mx-auto h-[4px] w-16 rounded bg-primary" />
        </div>

        {/* Certifications Grid */}
        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {certificationsData.map((cert, idx) => (
            <Card
              key={idx}
              className="bg-slate-950/20 backdrop-blur-md border border-white/5 hover:border-primary/40 hover:bg-slate-900/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <CardContent className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  {/* Top line: Icon & Date */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      {cert.icon}
                    </div>
                    <span className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-md border border-white/5">
                      {cert.date}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors leading-snug font-display tracking-wide uppercase">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium mt-3 flex items-center gap-2 font-display tracking-wider uppercase">
                    <Landmark className="h-4 w-4 shrink-0 text-primary/80" />
                    {cert.organization}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2.5 mt-5 mb-8">
                    <Badge variant="outline" className="bg-primary/5 border-primary/25 text-primary text-[10px] sm:text-xs uppercase tracking-wider font-display py-1 px-2.5 font-bold">
                      {cert.achievement}
                    </Badge>
                    <Badge variant="secondary" className="bg-secondary/40 border border-white/5 text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider font-display py-1 px-2.5 font-semibold">
                      {cert.score}
                    </Badge>
                  </div>
                </div>

                {/* Verification Link Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-white/10 hover:border-primary/50 hover:bg-primary/5 text-[11px] sm:text-xs uppercase font-display tracking-wider font-semibold mt-auto flex items-center justify-center py-5"
                  asChild
                >
                  <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                    View Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
