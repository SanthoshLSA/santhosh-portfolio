"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";

interface TiltCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  children: React.ReactNode;
}

export default function TiltCard({ children, className = "", ...props }: TiltCardProps) {
  const [transform, setTransform] = React.useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percentages from center (-1 to 1)
    const xc = (x - rect.width / 2) / (rect.width / 2);
    const yc = (rect.height / 2 - y) / (rect.height / 2);
    
    // Subtle rotation limits (max 4.5 degrees)
    const rotateY = xc * 4.5;
    const rotateX = yc * 4.5;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <Card
      className={`frosted-glass transition-all duration-300 ease-out ${className}`}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Card>
  );
}
