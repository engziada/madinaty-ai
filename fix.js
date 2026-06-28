const fs = require('fs');
let c = fs.readFileSync('src/data/courseData.ts','utf8');
c = c.split(',\\n').join(',\n');
c = c.split('\\n];').join('\n];');
fs.writeFileSync('src/data/courseData.ts', c, 'utf8');
