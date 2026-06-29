import * as React from "react";
import { Trophy, Zap, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Achievements() {
  const cpPoints = [
    "Solved 500+ algorithmic and data structure problems on competitive programming platforms.",
    "Practiced advanced topics including Dynamic Programming, Graph Algorithms, and Greedy heuristics.",
    "Experienced in solving time-constrained challenges in C++ and Java.",
  ];

  const accomplishments = [
    {
      title: "HCL GUVI Coding Contest",
      role: "AIR 9 (All India Rank)",
      meta: "Out of 5,000+ total participants",
      desc: "Demonstrated advanced problem-solving efficiency and optimal time complexity execution.",
      verifyUrl: "https://drive.google.com/file/d/1YW81qzAXDCumiz284nzTwQ3e9Q_o_guM/view",
      badge: "National Rank",
    },
    {
      title: "Pragyan Hackathon 2024",
      role: "Final Round Qualifier",
      meta: "Out of 100+ national teams",
      desc: "Qualified for the final round at NIT Trichy’s national-level hackathon.",
      badge: "Hackathon Finalist",
    },
  ];

  return (
    <section id="achievements" className="py-24 bg-secondary/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-10 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/5 glow-blur -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-primary/25 bg-primary/5 px-4.5 py-2 text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider font-display mb-4">
            <Trophy className="h-4 w-4" />
            <span>Honors</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white font-display uppercase">
            Achievements
          </h2>
          <div className="mt-3 mx-auto h-[4px] w-16 rounded bg-primary" />
        </div>

        {/* Layout Grid */}
        <div className="grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto">
          {/* Left Column: LeetCode & Coding */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Card className="bg-slate-950/20 backdrop-blur-md border border-white/5 p-8 flex-grow flex flex-col justify-between hover:border-primary/40 hover:bg-slate-900/30 transition-all duration-300 group">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Terminal className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-bold text-white font-display tracking-wide uppercase">Competitive Coding</h3>
                </div>

                <div className="bg-secondary/20 border border-white/5 rounded-xl p-5 text-center mb-8">
                  <p className="text-4xl font-extrabold text-primary font-display tracking-tight">500+</p>
                  <p className="text-xs uppercase font-display tracking-wider text-muted-foreground font-semibold mt-2">Problems Solved Across LeetCode, HackerRank, & Codeforces</p>
                </div>

                <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                  {cpPoints.map((point, pIdx) => (
                    <li key={pIdx} className="text-justify">{point}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Button variant="outline" size="sm" className="w-full border-white/10 hover:border-primary/50 hover:bg-primary/5 text-[11px] sm:text-xs uppercase font-display tracking-wider font-semibold py-5" asChild>
                  <a href="https://leetcode.com/SanthoshLegendSA/" target="_blank" rel="noopener noreferrer">
                    View LeetCode Profile
                  </a>
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Contests & Hackathons */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="bg-slate-950/20 backdrop-blur-md border border-white/5 p-8 hover:border-primary/40 hover:bg-slate-900/30 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Zap className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-bold text-white font-display tracking-wide uppercase">Contests & Hackathons</h3>
                </div>

                <div className="space-y-5">
                  {accomplishments.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/20 transition-all duration-200 gap-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="text-base font-bold text-white leading-tight font-display tracking-wide uppercase">{item.title}</h4>
                          <span className="text-[9px] font-semibold text-primary bg-primary/5 border border-primary/25 px-2.5 py-0.5 rounded-full uppercase font-display tracking-wider">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-muted-foreground font-display uppercase tracking-widest">{item.role} • <span className="font-normal text-muted-foreground/85 font-sans lowercase tracking-normal">{item.meta}</span></p>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed font-sans mt-1.5 text-justify">{item.desc}</p>
                      </div>
                      
                      {item.verifyUrl && (
                        <Button variant="outline" size="sm" className="border-white/10 hover:border-primary/50 hover:bg-primary/5 text-[11px] sm:text-xs uppercase font-display tracking-wider font-semibold shrink-0 py-5" asChild>
                          <a href={item.verifyUrl} target="_blank" rel="noopener noreferrer">
                            View Certificate
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
