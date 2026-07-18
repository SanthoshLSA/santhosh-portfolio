const fs = require('fs');

// Optimize CosmicBackground
let cb = fs.readFileSync('src/components/CosmicBackground.tsx', 'utf8');

// Optimize connection loop in CosmicBackground
cb = cb.replace(
  '        const dist = Math.sqrt(dx * dx + dy * dy);\n        if (dist < 130) {',
  '        if (Math.abs(dx) > 130 || Math.abs(dy) > 130) continue;\n        const dist = Math.sqrt(dx * dx + dy * dy);\n        if (dist < 130) {'
);

// Precalculate star colors
cb = cb.replace(
  '  size: number;\n}',
  '  size: number;\n  colorStr: string;\n}'
);

cb = cb.replace(
  '        vy: (Math.random() - 0.5) * 0.12,\n        size: 1 + Math.random() * 1.5,\n      });',
  '        vy: (Math.random() - 0.5) * 0.12,\n        size: 1 + Math.random() * 1.5,\n        colorStr: "",\n      });'
);

// Need to update the colorStr with baseAlpha, but wait, we can just do it in updateAndDraw? 
// No, the sizes are constant.
cb = cb.replace(
  '      stars.push({\n        x: rx,',
  '      const size = 1 + Math.random() * 1.5;\n      stars.push({\n        x: rx,'
);

cb = cb.replace(
  '        size: 1 + Math.random() * 1.5,\n        colorStr: "",',
  '        size: size,\n        colorStr: `rgba(168, 85, 247, ${0.45 + size * 0.15})`,'
);

cb = cb.replace(
  '      ctx.fillStyle = `rgba(168, 85, 247, ${baseAlpha + star.size * 0.15})`;',
  '      ctx.fillStyle = star.colorStr;'
);

// Decrease max stars in CosmicBackground to boost FPS
cb = cb.replace(/Math\.min\(starCount, 180\)/g, 'Math.min(starCount, 120)');

fs.writeFileSync('src/components/CosmicBackground.tsx', cb);
console.log('Optimized CosmicBackground');

// Optimize LightModeBackground
let lmb = fs.readFileSync('src/components/LightModeBackground.tsx', 'utf8');

lmb = lmb.replace(
  '  isHollow: boolean;\n}',
  '  isHollow: boolean;\n  colorStr: string;\n}'
);

lmb = lmb.replace(
  '    for (let i = 0; i < Math.min(count, 400); i++) {',
  '    for (let i = 0; i < Math.min(count, 350); i++) {'
);

lmb = lmb.replace(
  '      particles.push({\n        x: Math.random() * canvas.width,',
  '      const alpha = Math.random() * 0.6 + 0.3;\n      particles.push({\n        x: Math.random() * canvas.width,'
);

lmb = lmb.replace(
  '        alpha: Math.random() * 0.6 + 0.3,\n        speed: Math.random() * 0.01 + 0.005,\n        isHollow: Math.random() > 0.5,\n      });',
  '        alpha: alpha,\n        speed: Math.random() * 0.01 + 0.005,\n        isHollow: Math.random() > 0.5,\n        colorStr: `rgba(168, 85, 247, ${alpha})`,\n      });'
);

lmb = lmb.replace(
  '    const particles = particlesRef.current;\n\n    for (let i = 0; i < particles.length; i++) {',
  '    const particles = particlesRef.current;\n    const now = Date.now();\n\n    for (let i = 0; i < particles.length; i++) {'
);

lmb = lmb.replace(
  'p.x += Math.sin(Date.now() * p.speed) * 0.2;',
  'p.x += Math.sin(now * p.speed) * 0.2;'
);

lmb = lmb.replace(
  '        ctx.strokeStyle = `rgba(168, 85, 247, ${p.alpha})`;',
  '        ctx.strokeStyle = p.colorStr;'
);

lmb = lmb.replace(
  '        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;',
  '        ctx.fillStyle = p.colorStr;'
);

fs.writeFileSync('src/components/LightModeBackground.tsx', lmb);
console.log('Optimized LightModeBackground');

