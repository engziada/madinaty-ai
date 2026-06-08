import fs from 'fs';
import path from 'path';

const cssPath = path.resolve('src/app/globals.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace standard gradient text blocks
css = css.replace(/background:\s*(?:linear|radial)-gradient[^;]+;\s*(?:-webkit-)?background-clip:\s*text;\s*(?:background-clip:\s*text;\s*)?color:\s*transparent;/g, 'color: var(--teal);');

fs.writeFileSync(cssPath, css, 'utf8');
console.log("Gradients fixed.");
