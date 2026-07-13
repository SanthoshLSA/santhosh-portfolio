const fs = require('fs');

let path = 'src/app/globals.css';
let css = fs.readFileSync(path, 'utf8');

// The new grid-bg pattern logic.
// We need to split grid-bg into a base one, and mode specific ones, 
// or simply use CSS variables to dictate the background-image entirely.

const patternCss = `
/* Custom background grid & glow patterns */
:root {
  --mesh-gradient: radial-gradient(at 0% 0%, hsla(280, 100%, 94%, 0.5) 0px, transparent 50%),
                   radial-gradient(at 100% 0%, hsla(290, 80%, 92%, 0.4) 0px, transparent 50%),
                   radial-gradient(at 100% 100%, hsla(270, 70%, 95%, 0.5) 0px, transparent 50%),
                   radial-gradient(at 0% 100%, hsla(290, 90%, 93%, 0.4) 0px, transparent 50%);
                   
  --bg-pattern: 
    radial-gradient(var(--grid-line) 1px, transparent 1px);
  --bg-size: 24px 24px;
}

.dark {
  --mesh-gradient: none;
  --bg-pattern: 
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  --bg-size: 50px 50px;
}

.grid-bg {
  background-color: var(--background);
  background-image: var(--bg-pattern), var(--mesh-gradient);
  background-size: var(--bg-size), 100% 100%;
  background-attachment: fixed, fixed;
  background-position: center center;
}
`;

// Replace the old grid-bg section
css = css.replace(/\/\* Custom background grid & glow patterns \*\/[\s\S]*?\.grid-bg \{[\s\S]*?\}/, patternCss.trim());

fs.writeFileSync(path, css, 'utf8');
console.log('globals.css updated with mesh gradient and dot pattern');
