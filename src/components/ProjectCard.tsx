import * as React from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ProjectProps {
  title: string;
  date: string;
  description: string[];
  tags: string[];
  icon: React.ReactNode;
  githubUrl?: string;
  demoUrl?: string;
}

export default function ProjectCard({
  title,
  date,
  description,
  tags,
  icon,
  githubUrl,
  demoUrl,
}: ProjectProps) {
  return (
    <Card className="bg-slate-950/20 backdrop-blur-md border border-white/5 hover:border-primary/40 hover:bg-slate-900/30 transition-all duration-300 flex flex-col h-full group">
      <CardHeader className="p-6 pb-4">
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-md border border-white/5">
            {date}
          </span>
        </div>
        <CardTitle className="text-xl font-bold text-white mt-5 group-hover:text-primary transition-colors font-display tracking-wide uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow flex flex-col justify-between">
        {/* Bullet points description */}
        <ul className="text-sm sm:text-base text-muted-foreground space-y-3 mb-6 list-disc pl-5 leading-relaxed font-sans">
          {description.map((point, idx) => (
            <li key={idx} className="text-justify">{point}</li>
          ))}
        </ul>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="bg-secondary/20 border-white/5 text-[10px] sm:text-xs uppercase tracking-wider font-display py-1 px-2.5 rounded font-semibold text-muted-foreground/80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 border-t border-white/5 mt-5 flex items-center justify-end gap-4 font-display">
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
    </Card>
  );
}
