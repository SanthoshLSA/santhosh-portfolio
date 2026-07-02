import * as React from "react";
import { Briefcase, Building, Calendar, ArrowRight } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedHeading from "./AnimatedHeading";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

export default function WorkExperience() {
  const experiences = [
    {
      role: "Software Development Intern",
      company: "Inditech Health Solutions",
      date: "Feb 2026 - Present",
      skills: ["WordPress", "PHP", "APIs", "Database Systems", "Git"],
      highlights: [
        "Contributed to the development of three production web platforms and currently own their maintenance, feature development, and ongoing enhancements, supporting thousands of healthcare professionals.",
        "Built and maintained scalable application workflows for webinar ecosystems for doctors, including user onboarding, communication pipelines, participation tracking, and feedback systems.",
        "Collaborated across teams to translate business requirements into reliable and maintainable technical solutions.",
        "Worked with WordPress, PHP, APIs, database systems, and Git to build and enhance production applications.",
        "Demonstrated ownership in product development, project coordination, system design, and problem-solving in a fast-paced development environment.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/4 bottom-10 h-[300px] w-[300px] rounded-full bg-primary/5 glow-blur -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-primary/25 bg-primary/5 px-4.5 py-2 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider text-primary mb-4">
            <Briefcase className="h-4 w-4" />
            <span>Internship</span>
          </div>
          <AnimatedHeading text="Work Experience" className="mx-auto" />
          <div className="mt-3 mx-auto h-[4px] w-16 rounded bg-primary" />
        </div>

        {/* Experience Cards */}
        <div className="max-w-6xl mx-auto space-y-8">
          {experiences.map((exp, idx) => (
            <ScrollReveal key={idx}>
              <TiltCard
                className="frosted-glass frosted-glass-hover group"
              >
                <CardContent className="p-8 sm:p-10">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/5 pb-6 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors font-display tracking-wide uppercase leading-snug">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2.5 mt-2.5 text-muted-foreground text-sm">
                        <Building className="h-4.5 w-4.5 text-primary/80" />
                        <span className="font-semibold text-muted-foreground/90 font-display text-xs sm:text-sm uppercase tracking-wider">
                          {exp.company}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm bg-primary/5 border border-primary/20 px-4 py-2 rounded-lg shrink-0 self-start sm:self-center font-display tracking-widest uppercase">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.date}</span>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <ul className="space-y-4 text-base text-muted-foreground">
                    {exp.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start">
                        <ArrowRight className="h-4.5 w-4.5 text-primary shrink-0 mr-3 mt-1" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap justify-center gap-2.5 mt-8">
                    {exp.skills.map((skill, sIdx) => (
                      <Badge
                        key={sIdx}
                        variant="secondary"
                        className="bg-secondary/40 text-[10px] sm:text-xs uppercase font-display tracking-wider text-muted-foreground border border-border/50 hover:border-primary/30 transition-all duration-200 py-1.5 px-3"
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
