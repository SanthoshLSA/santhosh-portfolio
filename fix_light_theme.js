const fs = require('fs');

// 1. Update globals.css to a soft violet light theme
const globalsPath = 'src/app/globals.css';
let css = fs.readFileSync(globalsPath, 'utf8');
css = css.replace(/--background:\s*oklch\([^)]+\);/g, (match, offset) => {
    if (offset < 500) { // Targeting the :root block
        return '--background: oklch(0.96 0.02 290); /* Soft Violet */';
    }
    return match; // Leave .dark alone
});
css = css.replace(/--card:\s*rgba\(255, 255, 255, 0.7\);/, '--card: rgba(245, 240, 255, 0.8);');
css = css.replace(/--popover:\s*rgba\(255, 255, 255, 0.85\);/, '--popover: rgba(245, 240, 255, 0.9);');
css = css.replace(/--glass-bg:\s*255, 255, 255;/g, (match, offset) => {
    if (offset < 800) return '--glass-bg: 245, 240, 255;';
    return match;
});
fs.writeFileSync(globalsPath, css, 'utf8');

// 2. Update Hero.tsx colors array
const heroPath = 'src/components/Hero.tsx';
let hero = fs.readFileSync(heroPath, 'utf8');
const colorsReplacement = `const colors = [
      "text-primary", "text-primary/90", "text-primary/80", "text-primary/70", "text-primary/60",
      "text-primary/50", "text-primary/60", "text-primary/70", "text-primary/80", "text-primary/90",
      "text-primary", "text-primary/90", "text-primary/80", "text-primary/70", "text-primary"
    ];`;
// Find the colors array block and replace it
hero = hero.replace(/const colors = \[\s*[\s\S]*?\];/m, colorsReplacement);
fs.writeFileSync(heroPath, hero, 'utf8');

// 3. Update Navbar.tsx
const navPath = 'src/components/Navbar.tsx';
let nav = fs.readFileSync(navPath, 'utf8');
nav = nav.replace(/via-white/g, 'via-primary/50');
fs.writeFileSync(navPath, nav, 'utf8');

// 4. Update CosmicBackground.tsx to return null in light mode
const cosmicPath = 'src/components/CosmicBackground.tsx';
let cosmic = fs.readFileSync(cosmicPath, 'utf8');
if (!cosmic.includes('if (isLight) return null;')) {
    cosmic = cosmic.replace('if (typeof window !== "undefined" && window.innerWidth < 768) {', 'if (isLight) return null;\n\n  if (typeof window !== "undefined" && window.innerWidth < 768) {');
}
fs.writeFileSync(cosmicPath, cosmic, 'utf8');

// 5. Update FireworkParticles.tsx to return null in light mode
const fireworkPath = 'src/components/FireworkParticles.tsx';
let firework = fs.readFileSync(fireworkPath, 'utf8');
if (!firework.includes('if (resolvedTheme === "light") return null;')) {
    firework = firework.replace('return (', 'if (resolvedTheme === "light") return null;\n\n  return (');
}
fs.writeFileSync(fireworkPath, firework, 'utf8');

console.log("Done");
