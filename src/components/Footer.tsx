import * as React from "react";
import { Mail, Phone, Code2 } from "lucide-react";
import LeetCodeIcon from "./LeetCodeIcon";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/5 bg-slate-950/20 py-10 font-display">
      <div className="container mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo / Branding */}
          <div className="flex items-center space-x-2.5 text-foreground font-bold tracking-wider">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-base bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent uppercase font-extrabold">
              SANTHOSH ANANTH
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground text-center md:text-left font-sans">
            &copy; {currentYear} Santhosh Ananth. All rights reserved. • Built with Next.js & Tailwind CSS
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            {[
              { icon: <GithubIcon size={18} />, href: "https://github.com/SanthoshLSA", title: "GitHub" },
              { icon: <LinkedinIcon size={18} />, href: "https://www.linkedin.com/in/santhosh-ananth-0a2602403/", title: "LinkedIn" },
              { icon: <Mail className="h-4.5 w-4.5" />, href: "mailto:santhosh.ananth6@gmail.com", title: "Email" },
              { icon: <Phone className="h-4.5 w-4.5" />, href: "tel:+918903266557", title: "Phone" },
              { icon: <LeetCodeIcon size={18} />, href: "https://leetcode.com/SanthoshLegendSA/", title: "LeetCode" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target={social.href.startsWith("mailto") || social.href.startsWith("tel") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title={social.title}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
