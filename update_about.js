const fs = require('fs');

const path = 'src/components/About.tsx';
let about = fs.readFileSync(path, 'utf8');

// Import useTheme
if (!about.includes('useTheme')) {
  about = about.replace('import { User, MapPin, GraduationCap, Languages, Award } from "lucide-react";',
    'import { User, MapPin, GraduationCap, Languages, Award } from "lucide-react";\nimport { useTheme } from "next-themes";'
  );
}

// Add useTheme hook
if (!about.includes('const { resolvedTheme } = useTheme();')) {
  about = about.replace('export default function About() {',
    'export default function About() {\n  const { resolvedTheme } = useTheme();'
  );
}

// Ensure "use client" is at the top
if (!about.startsWith('"use client";')) {
  about = '"use client";\n' + about;
}

// Hide left avatar in light mode
about = about.replace(
  '<div className="lg:col-span-5 flex justify-center">',
  '{resolvedTheme !== "light" && (\n          <div className="lg:col-span-5 flex justify-center">'
);
about = about.replace(
  '          {/* Right: Content */}',
  '          )}\n\n          {/* Right: Content */}'
);

// Adjust Right Content layout based on theme
about = about.replace(
  '<div className="lg:col-span-7 space-y-8">',
  '<div className={`space-y-8 ${resolvedTheme === "light" ? "lg:col-span-12 text-center max-w-4xl mx-auto" : "lg:col-span-7"}`}>'
);

fs.writeFileSync(path, about, 'utf8');
console.log('About.tsx updated');
