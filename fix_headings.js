const fs = require('fs');

// 1. Fix Hero.tsx
let heroPath = 'src/components/Hero.tsx';
let hero = fs.readFileSync(heroPath, 'utf8');

const newColors = `    const colors = [
      "text-primary", "text-primary/90", "text-primary/80", "text-primary/70", "text-primary/60",
      "text-primary/50", "text-primary/60", "text-primary/70", "text-primary/80", "text-primary/90",
      "text-primary", "text-primary/90", "text-primary/80", "text-primary/70", "text-primary"
    ];`;

hero = hero.replace(/const colors = \[[^\]]+\];/, newColors);
hero = hero.replace(/if \(distance === 0\) return "text-purple-[^;]+;/g, 'if (distance === 0) return "text-primary opacity-100";');
hero = hero.replace(/if \(distance === 1\) return "text-purple-[^;]+;/g, 'if (distance === 1) return "text-primary opacity-80";');
hero = hero.replace(/if \(distance === 2\) return "text-purple-[^;]+;/g, 'if (distance === 2) return "text-primary opacity-60";');

fs.writeFileSync(heroPath, hero, 'utf8');

// 2. Fix Footer.tsx
let footerPath = 'src/components/Footer.tsx';
let footer = fs.readFileSync(footerPath, 'utf8');

if (!footer.includes("useTheme")) {
  footer = footer.replace('import { GithubIcon', 'import { useTheme } from "next-themes";\nimport { GithubIcon');
  footer = footer.replace('export default function Footer() {', 'export default function Footer() {\n  const { resolvedTheme } = useTheme();');
  footer = footer.replace(
    'className="text-base bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent uppercase font-extrabold"', 
    'className={`text-base uppercase font-extrabold ${resolvedTheme === "light" ? "text-foreground" : "bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"}`}'
  );
  fs.writeFileSync(footerPath, footer, 'utf8');
}
console.log("Done");
