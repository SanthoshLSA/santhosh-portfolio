const fs = require('fs');

const path = 'src/app/globals.css';
let css = fs.readFileSync(path, 'utf8');

// 1. Redesign Light Theme (:root)
const lightTheme = `:root {
  /* Soft Lavender Aesthetic Light Mode Colors */
  --background: oklch(0.97 0.015 290); /* Very soft tinted lavender */
  --foreground: oklch(0.35 0.04 285); /* Deep slate-eggplant */
  
  --card: rgba(250, 245, 255, 0.65);
  --card-foreground: oklch(0.35 0.04 285);
  
  --popover: rgba(250, 245, 255, 0.85);
  --popover-foreground: oklch(0.35 0.04 285);
  
  --primary: oklch(0.60 0.22 295); /* Electric Purple */
  --primary-foreground: oklch(0.99 0.005 0);
  
  --accent: oklch(0.60 0.22 295);
  --accent-foreground: oklch(0.99 0.005 0);
  
  --secondary: rgba(168, 85, 247, 0.06); /* Purple-tinted secondary */
  --secondary-foreground: oklch(0.35 0.04 285);
  
  --muted: oklch(0.95 0.01 290);
  --muted-foreground: oklch(0.50 0.04 285);
  
  --border: rgba(168, 85, 247, 0.12); /* Slightly purple borders */
  --input: rgba(168, 85, 247, 0.08);
  --ring: oklch(0.60 0.22 295 / 50%);
  --radius: 1.25rem;
  
  --glass-bg: 250, 245, 255;
  --glass-opacity: 0.65;
  --glass-border: 168, 85, 247;
  --glass-border-op: 0.12;
  --glass-shadow: rgba(168, 85, 247, 0.05);
  
  --grid-line: rgba(168, 85, 247, 0.04);
}`;

// 2. Add grid-line to .dark
css = css.replace(/--glass-shadow: rgba\(0, 0, 0, 0\.3\);\n}/, '--glass-shadow: rgba(0, 0, 0, 0.3);\n  --grid-line: rgba(168, 85, 247, 0.015);\n}');

// Replace :root block completely
css = css.replace(/:root \{[\s\S]*?--glass-shadow:[^}]+\}/, lightTheme.slice(0, -1)); // Hacky but works

// 3. Update .grid-bg to use var(--grid-line)
css = css.replace(/linear-gradient\(to right, rgba\(168, 85, 247, 0\.015\) 1px, transparent 1px\),/g, 'linear-gradient(to right, var(--grid-line) 1px, transparent 1px),');
css = css.replace(/linear-gradient\(to bottom, rgba\(168, 85, 247, 0\.015\) 1px, transparent 1px\);/g, 'linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);');

fs.writeFileSync(path, css, 'utf8');
console.log("globals.css updated");
