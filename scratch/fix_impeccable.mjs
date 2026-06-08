import fs from 'fs';
import path from 'path';

// 1. Fix globals.css
const globalsPath = path.resolve('src/app/globals.css');
let globalsCss = fs.readFileSync(globalsPath, 'utf8');

// Fix bounce easings
globalsCss = globalsCss.replace(/cubic-bezier\([0-9.,\s]+\)/g, 'ease-out');

// Fix layout transitions
globalsCss = globalsCss.replace(/transition:\s*([^;]*?(?:width|height)[^;]*?);/g, (match, p1) => {
    // Just replace width/height with transform and opacity, or if there's multiple, strip width/height out.
    // Actually, let's just make sure to remove width and height from the transitions
    let newTrans = p1.replace(/width[^,]*,?/g, '').replace(/height[^,]*,?/g, '').replace(/,\s*$/, '').trim();
    if (newTrans.length === 0) return 'transition: transform 0.3s ease-out, opacity 0.3s ease-out;';
    return `transition: ${newTrans}, transform 0.3s ease-out;`;
});

// Fix gradients
// Search for background-clip: text + gradient or text-fill-color
globalsCss = globalsCss.replace(/background:\s*(linear|radial)-gradient[^;]+;/g, (match) => {
    // we want to keep background for buttons, but NOT for text. 
    return match; // Actually it's better to just do this manually or be careful.
});
// Let's replace specifically background-clip: text and text-fill-color gradients with solid color.
globalsCss = globalsCss.replace(/background:\s*(linear|radial)-gradient[^;]+;\s*(-webkit-)?background-clip:\s*text;\s*(-webkit-)?text-fill-color:\s*transparent;/g, 'color: var(--primary);');

fs.writeFileSync(globalsPath, globalsCss, 'utf8');

// 2. Fix layout.tsx
const layoutPath = path.resolve('src/app/layout.tsx');
let layoutTsx = fs.readFileSync(layoutPath, 'utf8');

// Fix em-dashes
layoutTsx = layoutTsx.replace(/—/g, '-');
layoutTsx = layoutTsx.replace(/—/g, ',');

fs.writeFileSync(layoutPath, layoutTsx, 'utf8');

console.log("Fixes applied successfully.");
