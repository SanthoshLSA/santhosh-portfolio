const fs = require('fs');

// 1. Update ProjectCard.tsx
let pc = fs.readFileSync('src/components/ProjectCard.tsx', 'utf8');

const codePreviewComponent = `
function CodePreview({ code, isHovered }: { code: string | undefined; isHovered: boolean }) {
  const [displayedCode, setDisplayedCode] = React.useState("");
  const [isCompiled, setIsCompiled] = React.useState(false);
  const typingSpeed = 10; // ms per char

  React.useEffect(() => {
    if (!code) return;
    if (isHovered) {
      let currentLength = 0;
      setIsCompiled(false);
      const interval = setInterval(() => {
        currentLength += 2;
        setDisplayedCode(code.slice(0, currentLength));
        if (currentLength >= code.length) {
          clearInterval(interval);
          setTimeout(() => setIsCompiled(true), 200);
        }
      }, typingSpeed);
      return () => clearInterval(interval);
    } else {
      setDisplayedCode("");
      setIsCompiled(false);
    }
  }, [isHovered, code]);

  if (!code) return null;

  return (
    <div className={\`absolute inset-0 bg-background/95 backdrop-blur-md rounded-2xl p-6 flex flex-col z-20 transition-all duration-300 pointer-events-none \${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}\`}>
      <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] text-muted-foreground font-mono ml-2">preview.ts</span>
      </div>
      <pre className="text-[10px] sm:text-xs text-primary/80 font-mono whitespace-pre-wrap flex-grow overflow-hidden text-left">
        {displayedCode}
        <span className="animate-pulse inline-block w-1.5 h-3 bg-primary ml-0.5 align-middle" />
      </pre>
      <div className={\`mt-auto transition-opacity duration-300 \${isCompiled ? "opacity-100" : "opacity-0"}\`}>
        <span className="inline-flex items-center text-[10px] font-bold tracking-wider text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded">
          ✓ COMPILED SUCCESSFULLY
        </span>
      </div>
    </div>
  );
}
`;

if (!pc.includes('CodePreview')) {
  pc = pc.replace(
    '  demoUrl?: string;\n}',
    '  demoUrl?: string;\n  codeSnippet?: string;\n}\n' + codePreviewComponent
  );

  pc = pc.replace(
    '  demoUrl,\n}: ProjectProps) {',
    '  demoUrl,\n  codeSnippet,\n}: ProjectProps) {\n  const [isHovered, setIsHovered] = React.useState(false);'
  );

  pc = pc.replace(
    '<TiltCard className="frosted-glass frosted-glass-hover flex flex-col h-full group">',
    '<div className="h-full relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><TiltCard className="frosted-glass frosted-glass-hover flex flex-col h-full relative">\n      <CodePreview code={codeSnippet} isHovered={isHovered} />'
  );

  pc = pc.replace(
    '    </TiltCard>',
    '    </TiltCard></div>'
  );
  fs.writeFileSync('src/components/ProjectCard.tsx', pc);
  console.log("Updated ProjectCard");
} else {
  console.log("ProjectCard already updated");
}
