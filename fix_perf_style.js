const fs = require('fs');

// 1. Hero.tsx - Replace glow-blur
let hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
hero = hero.replace(
  '<div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 glow-blur -z-10 animate-pulse-slow" />',
  '<div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)] -z-10" />'
);
hero = hero.replace(
  '<div className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-primary/8 glow-blur -z-10 animate-pulse-slow duration-[10s]" />',
  '<div className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] -z-10" />'
);
fs.writeFileSync('src/components/Hero.tsx', hero);

// 2. About.tsx - Replace glow-blur and purple shadow
let about = fs.readFileSync('src/components/About.tsx', 'utf8');
about = about.replace(
  '<div className="absolute right-0 top-1/4 h-[350px] w-[350px] rounded-full bg-primary/5 glow-blur -z-10" />',
  '<div className="absolute right-0 top-1/4 h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] -z-10" />'
);
about = about.replace(
  '<div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-10 blur transition duration-500 -z-10" />',
  '<div className="absolute -inset-1 rounded-2xl bg-foreground opacity-0 group-hover:opacity-[0.03] transition duration-500 -z-10 shadow-[0_0_30px_rgba(150,150,150,0.1)]" />'
);
// Also fix the hover border glow in About.tsx to be neutral
about = about.replace(
  'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
  'hover:shadow-[0_0_30px_rgba(150,150,150,0.15)]'
);
fs.writeFileSync('src/components/About.tsx', about);

// 3. globals.css - Update frosted-glass
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/--glass-shadow: rgba\(168, 85, 247, 0\.25\);/g, '--glass-shadow: rgba(0, 0, 0, 0.08);');
css = css.replace(/backdrop-filter: blur\(20px\)/g, 'backdrop-filter: blur(4px)');
css = css.replace(/-webkit-backdrop-filter: blur\(20px\)/g, '-webkit-backdrop-filter: blur(4px)');

// Also fix hover frosted glass border in globals to be less purple if it exists
css = css.replace(
  /border-color: rgba\(168, 85, 247, 0\.4\) !important;/g,
  'border-color: rgba(150, 150, 150, 0.2) !important;'
);
css = css.replace(
  /box-shadow: 0 12px 40px 0 rgba\(168, 85, 247, 0\.12\)/g,
  'box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.12)'
);
fs.writeFileSync('src/app/globals.css', css);

// 4. CosmicBackground.tsx - Remove mix-blend-screen for FPS
let cosmic = fs.readFileSync('src/components/CosmicBackground.tsx', 'utf8');
cosmic = cosmic.replace('mix-blend-screen ', '');
fs.writeFileSync('src/components/CosmicBackground.tsx', cosmic);

console.log("Done");
