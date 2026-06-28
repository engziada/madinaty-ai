const fs = require('fs');

const file = 'src/data/courseData.ts';
let content = fs.readFileSync(file, 'utf8');

const firstInstance = content.indexOf('kids-coding-scratch');
const secondInstance = content.indexOf('kids-coding-scratch', firstInstance + 1);

if (secondInstance !== -1) {
  const startOfSecond = content.lastIndexOf('{', secondInstance);
  const commaBefore = content.lastIndexOf(',', startOfSecond);
  
  const endOfArray = content.lastIndexOf('];');
  
  const newContent = content.slice(0, commaBefore) + '\n' + content.slice(endOfArray);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Removed duplicate courses.');
} else {
  console.log('No duplicates found.');
}
