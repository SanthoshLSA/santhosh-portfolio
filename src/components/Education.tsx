import * as React from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Education() {
  const educationData = [
    {
      degree: "B.Tech in Artificial Intelligence & Data Science",
      institution: "Shiv Nadar University",
      location: "Chennai, Tamil Nadu",
      date: "Aug 2023 - Present",
      grade: "CGPA: 8.36 / 10.0 (as of 6th Semester)",
      highlights: [
        "Rigorous coursework in Data Structures, Algorithms, Databases, Machine Learning, and Deep Learning.",
        "Active member of coding clubs and technical event organization teams.",
      ],
    },
    {
      degree: "Class XII - CBSE (Secondary Education)",
      institution: "Kamala Niketan Montessori School",
      location: "Tiruchirappalli, Tamil Nadu",
      date: "2022 - 2023",
      grade: "Percentage: 86.6%",
      highlights: [
        "Focused study in Science stream (Physics, Chemistry, Mathematics, Computer Science).",
        "Participated in inter-school programming and quiz competitions.",
      ],
    },
  ];

  return (
    <section id="education" className="py-24 bg-background relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute right-10 bottom-10 h-[300px] w-[300px] rounded-full bg-primary/5 glow-blur -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-primary/25 bg-primary/5 px-4.5 py-2 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider text-primary mb-4">
            <GraduationCap className="h-4 w-4" />
            <span>Academia</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white font-display uppercase">
            Education
          </h2>
          <div className="mt-3 mx-auto h-[4px] w-16 rounded bg-primary" />
        </div>

        {/* Education Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 max-w-7xl mx-auto">
          {educationData.map((edu, idx) => (
            <Card
              key={idx}
              className="bg-slate-950/20 backdrop-blur-md border border-white/5 hover:border-primary/40 hover:bg-slate-900/30 transition-all duration-300 flex flex-col group"
            >
              <CardContent className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  {/* Date & Location Header */}
                  <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-xs uppercase font-display tracking-wider text-muted-foreground gap-3 border-b border-white/5 pb-4 mb-5">
                    <div className="flex items-center gap-2 font-semibold">
                      <Calendar className="h-4 w-4 text-primary/80" />
                      <span>{edu.date}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                      <MapPin className="h-4 w-4 text-primary/80" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  {/* Degree & Institution */}
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug font-display tracking-wide uppercase">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-muted-foreground/80 mt-1.5 font-display tracking-wider uppercase">
                    {edu.institution}
                  </p>

                  {/* Bullets */}
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed mt-5 font-sans">
                    {edu.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-justify">{bullet}</li>
                    ))}
                  </ul>
                </div>

                {/* Grade Box */}
                <div className="mt-8 flex items-center gap-2.5 text-xs sm:text-sm uppercase font-display font-extrabold text-primary bg-primary/5 border border-primary/25 px-4.5 py-2.5 rounded-lg w-fit">
                  <Award className="h-4.5 w-4.5" />
                  <span>{edu.grade}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
