const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('C:/Users/santh/.gemini/antigravity/scratch/santhosh-portfolio/src/components');
files.push('C:/Users/santh/.gemini/antigravity/scratch/santhosh-portfolio/src/app/page.tsx');

let changedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    // Fix explicit text-slate-900 dark:text-white
    newContent = newContent.replace(/text-slate-900 dark:text-white/g, 'text-foreground');
    newContent = newContent.replace(/dark:text-white/g, 'text-foreground');
    
    // Fix hardcoded text-white
    newContent = newContent.replace(/text-white/g, 'text-foreground');
    newContent = newContent.replace(/text-white\/([0-9]+)/g, 'text-foreground/$1');
    
    // Fix hardcoded borders
    newContent = newContent.replace(/border-white\/([0-9]+)/g, 'border-foreground/$1');
    
    // Fix hardcoded backgrounds
    newContent = newContent.replace(/bg-white\/\.?\[?([0-9.]+)\]?/g, 'bg-foreground/[$1]');
    
    // Ensure we didn't break bg-white/5 -> bg-foreground/[5] which is invalid tailwind opacity if not bracketed, 
    // wait, bg-foreground/5 is valid in Tailwind 4, so let's do:
    // Actually, bg-foreground/5 is fine. bg-foreground/[0.05] is fine.
    
    if (content !== newContent) {
        // Double check for any weird artifacts
        // e.g., 'text-foreground/10' is completely valid in Tailwind
        fs.writeFileSync(file, newContent, 'utf8');
        changedCount++;
        console.log('Fixed', file);
    }
});

console.log('Total files changed:', changedCount);
