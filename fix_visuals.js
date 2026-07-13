const fs = require('fs');

// 1. CosmicBackground.tsx - remove stars dragging effect with scrolls
let cb = fs.readFileSync('src/components/CosmicBackground.tsx', 'utf8');
cb = cb.replace(/if \(Math\.abs\(v\) > 0\.4\) {[\s\S]*?ctx\.stroke\(\);\s*}/g, '/* Trail effect removed as per request */');
fs.writeFileSync('src/components/CosmicBackground.tsx', cb);
console.log('CosmicBackground updated');

// 2. LightModeBackground.tsx - add more particles
let lmb = fs.readFileSync('src/components/LightModeBackground.tsx', 'utf8');
lmb = lmb.replace(/Math\.floor\(\(window\.innerWidth \* canvas\.height\) \/ 30000\)/g, 'Math.floor((window.innerWidth * canvas.height) / 8000)');
lmb = lmb.replace(/Math\.min\(count, 100\)/g, 'Math.min(count, 400)');
fs.writeFileSync('src/components/LightModeBackground.tsx', lmb);
console.log('LightModeBackground updated');

// 3. AnimatedHeading.tsx - remove hover gradient in light mode
let ah = fs.readFileSync('src/components/AnimatedHeading.tsx', 'utf8');
if (!ah.includes('useTheme')) {
  ah = ah.replace('import * as React from "react";', 'import * as React from "react";\nimport { useTheme } from "next-themes";');
}
ah = ah.replace('export default function AnimatedHeading({ text, className = "" }: Props) {\n  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);', 
  'export default function AnimatedHeading({ text, className = "" }: Props) {\n  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);\n  const { resolvedTheme } = useTheme();'
);
ah = ah.replace('const getTranslation = (idx: number) => {', 'const getTranslation = (idx: number) => {\n    if (resolvedTheme === "light") return "translateY(0)";');
ah = ah.replace('const getTextColor = (idx: number) => {', 'const getTextColor = (idx: number) => {\n    if (resolvedTheme === "light") return "text-foreground";');
fs.writeFileSync('src/components/AnimatedHeading.tsx', ah);
console.log('AnimatedHeading updated');

// 4. globals.css and page.tsx - grid bg entire page and darker
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
if (!page.includes('overflow-hidden grid-bg')) {
  page = page.replace('overflow-hidden"', 'overflow-hidden grid-bg"');
  fs.writeFileSync('src/app/page.tsx', page);
}
let hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
if (hero.includes(' grid-bg')) {
  hero = hero.replace(' py-24 grid-bg', ' py-24');
  fs.writeFileSync('src/components/Hero.tsx', hero);
}
let globals = fs.readFileSync('src/app/globals.css', 'utf8');
globals = globals.replace(/--grid-line: rgba\(168, 85, 247, 0.2\);/g, '--grid-line: rgba(168, 85, 247, 0.4);');
// Ensure background-attachment is set so it covers whole page properly
globals = globals.replace(/background-size: var\(--bg-size\), 100% 100%;/g, 'background-size: var(--bg-size), 100% 100%;\n  background-attachment: fixed, fixed;');
fs.writeFileSync('src/app/globals.css', globals);
console.log('Grid bg updated');

// 5. FireworkParticles & Settings - don't unmount, just hide with CSS
let fps = fs.readFileSync('src/components/FireworkSettings.tsx', 'utf8');
fps = fps.replace(/if \(resolvedTheme === "light"\) return null;/g, '');
fps = fps.replace(/className={`fixed left-0/g, 'className={`fixed left-0 ${resolvedTheme === "light" ? "hidden" : ""}');
fs.writeFileSync('src/components/FireworkSettings.tsx', fps);

let fp = fs.readFileSync('src/components/FireworkParticles.tsx', 'utf8');
fp = fp.replace(/if \(resolvedTheme === "light"\) return null;/g, '');
fp = fp.replace(/className="pointer-events-none absolute inset-0 z-50 hidden md:block"/g, 'className={`pointer-events-none absolute inset-0 z-50 hidden md:block ${resolvedTheme === "light" ? "opacity-0" : "opacity-100"}`}');
fs.writeFileSync('src/components/FireworkParticles.tsx', fp);
console.log('Fireworks updated');

