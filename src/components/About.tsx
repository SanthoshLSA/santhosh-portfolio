import * as React from "react";
import Image from "next/image";
import { User, MapPin, GraduationCap, Languages, Award } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import AnimatedHeading from "./AnimatedHeading";
import TiltCard from "./TiltCard";

export default function About() {
  const details = [
    {
      icon: <GraduationCap className="h-5.5 w-5.5 text-primary" />,
      label: "Education",
      value: "B.Tech in AI & Data Science",
      subValue: "Shiv Nadar University, Chennai",
    },
    {
      icon: <MapPin className="h-5.5 w-5.5 text-primary" />,
      label: "Location",
      value: "Chennai, Tamil Nadu, India",
      subValue: "",
    },
    {
      icon: <Languages className="h-5.5 w-5.5 text-primary" />,
      label: "Languages",
      value: "Tamil, English, Hindi",
      subValue: "Native & Working Proficiencies",
    },
    {
      icon: <Award className="h-5.5 w-5.5 text-primary" />,
      label: "Academic Standard",
      value: "CGPA: 8.36 / 10.0",
      subValue: "As of 6th Semester",
    },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 h-[350px] w-[350px] rounded-full bg-primary/5 glow-blur -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-primary/25 bg-primary/5 px-4.5 py-2 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider text-primary mb-4">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </div>
          <AnimatedHeading text="About Me" className="mx-auto" />
          <div className="mt-3 mx-auto h-[4px] w-16 rounded bg-primary" />
        </div>

        {/* Layout Grid */}
        <div className="grid gap-16 lg:grid-cols-12 items-center max-w-7xl mx-auto">
          {/* Left: Avatar Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full aspect-square rounded-2xl overflow-hidden border border-white/10 p-3 bg-slate-950/40 backdrop-blur-sm shadow-xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900">
                <Image
                  src="/avatar.jpg"
                  alt="Santhosh Ananth"
                  fill
                  sizes="(max-w-768px) 100vw, 420px"
                  priority
                  className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
                />
                <Image
                  src="/avatar-hover.jpg"
                  alt="Santhosh Ananth Hover"
                  fill
                  sizes="(max-w-768px) 100vw, 420px"
                  className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-[1.03]"
                />
              </div>
              {/* Glowing decorative frame on hover */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-10 blur transition duration-500 -z-10" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display tracking-wide uppercase leading-tight">
              INTELLIGENT SYSTEMS & FULL-STACK DEVELOPMENT
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              I am an undergraduate student pursuing my B.Tech in Artificial Intelligence and Data Science at Shiv Nadar University, Chennai. Equipped with strong foundations in Data Structures and Algorithms, I focus on coding efficient backend operations, designing sleek and interactive web interfaces, and training statistics-driven models.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              My engineering stack focuses heavily on full-stack Javascript architectures (MERN/PERN), competitive coding, and machine learning pipelines. I enjoy writing clean, modular code and collaborating on real-world projects that scale.
            </p>

            {/* Frosted Details Cards */}
            <div className="grid gap-6 sm:grid-cols-2 pt-6">
              {details.map((detail, idx) => (
                <TiltCard
                  key={idx}
                  className="frosted-glass frosted-glass-hover group"
                >
                  <CardContent className="flex items-start space-x-4 p-5">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors shrink-0">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs uppercase font-display font-semibold tracking-wider text-muted-foreground">
                        {detail.label}
                      </p>
                      <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1.5 font-display leading-tight">
                        {detail.value}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground/80 mt-1 font-sans">
                        {detail.subValue}
                      </p>
                    </div>
                  </CardContent>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
