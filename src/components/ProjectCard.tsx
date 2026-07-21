"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TiltCard from "./TiltCard";

export interface ProjectProps {
  title: string;
  date: string;
  description: string[];
  tags: string[];
  icon: React.ReactNode;
  githubUrl?: string;
  demoUrl?: string;
  codeSnippet?: string;
}

function CodePreview({ code, isHovered }: { code: string | undefined; isHovered: boolean }) {
  const [displayedCode, setDisplayedCode] = React.useState("");
  const [isCompiled, setIsCompiled] = React.useState(false);
  const typingSpeed = 10; // ms per char

  React.useEffect(() => {
    if (!code) return;
    if (isHovered) {
      let currentLength = 0;
      setIsCompiled(false);
      const interval = setInterval(() => {
        currentLength += 2;
        setDisplayedCode(code.slice(0, currentLength));
        if (currentLength >= code.length) {
          clearInterval(interval);
          setTimeout(() => setIsCompiled(true), 200);
        }
      }, typingSpeed);
      return () => clearInterval(interval);
    } else {
      setDisplayedCode("");
      setIsCompiled(false);
    }
  }, [isHovered, code]);

  if (!code) return null;

  return (
    <div className={`absolute inset-0 bg-background/95 backdrop-blur-md rounded-2xl p-6 flex flex-col z-20 transition-all duration-300 pointer-events-none ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] text-muted-foreground font-mono ml-2">preview.ts</span>
      </div>
      <pre className="text-[10px] sm:text-xs text-primary/80 font-mono whitespace-pre-wrap flex-grow overflow-hidden text-left">
        {displayedCode}
        <span className="animate-pulse inline-block w-1.5 h-3 bg-primary ml-0.5 align-middle" />
      </pre>
      <div className={`mt-auto transition-opacity duration-300 ${isCompiled ? "opacity-100" : "opacity-0"}`}>
        <span className="inline-flex items-center text-[10px] font-bold tracking-wider text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded">
          ✓ COMPILED SUCCESSFULLY
        </span>
      </div>
    </div>
  );
}


export default function ProjectCard({
  title,
  date,
  description,
  tags,
  icon,
  githubUrl,
  demoUrl,
  codeSnippet,
}: ProjectProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div className="h-full relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><TiltCard className="frosted-glass frosted-glass-hover flex flex-col h-full relative">
      <CodePreview code={codeSnippet} isHovered={isHovered} />
      <CardHeader className="p-6 pb-4">
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-md border border-foreground/5">
            {date}
          </span>
        </div>
        <CardTitle className="text-xl font-bold text-foreground mt-5 group-hover:text-primary transition-colors font-display tracking-wide uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow flex flex-col justify-between">
        {/* Bullet points description */}
        <ul className="text-sm sm:text-base text-muted-foreground space-y-3 mb-6 list-disc pl-5 leading-relaxed font-sans">
          {description.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>

        {/* Tech Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-auto">
          {tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="bg-secondary/20 border-foreground/5 text-[10px] sm:text-xs uppercase tracking-wider font-display py-1 px-2.5 rounded font-semibold text-muted-foreground/80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-6 border-t border-foreground/5 mt-auto flex items-center justify-end gap-4 font-display">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <GithubIcon size={16} className="mr-2" />
            Code
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs uppercase tracking-widest font-semibold text-primary hover:text-primary/80 transition-colors ml-3"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Live Demo
          </a>
        )}
      </CardFooter>
    </TiltCard></div>
  );
}
