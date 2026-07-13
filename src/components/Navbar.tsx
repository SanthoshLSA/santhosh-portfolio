"use client";

import * as React from "react";
import { Menu, X, Terminal } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { resolvedTheme } = useTheme();

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Honors", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/5 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl flex h-14 items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 text-foreground font-display font-bold tracking-wider hover:text-accent transition-colors">
          <Terminal className="h-5 w-5 text-accent animate-pulse" />
          <span className={resolvedTheme === 'light' ? "text-foreground" : "bg-gradient-to-r from-accent via-primary/50 to-primary bg-clip-text text-transparent"}>
            SANTHOSH.DEV
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-7 font-display">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-foreground/5 bg-background/95 px-4 pt-2 pb-4 space-y-1 transition-all duration-300 font-display">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-md text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-accent hover:bg-secondary/40 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
