const fs = require('fs');
let data = fs.readFileSync('components/RecodyLanding.jsx', 'utf8');

// Replace the items array completely
data = data.replace(
  /const items = \["ARCHITECTURE", "[^"]+", "ENGINEERING", "[^"]+", "EXPERIENCE", "[^"]+", "STRATEGY", "[^"]+", "MOTION", "[^"]+"\];/,
  'const items = ["ARCHITECTURE", "●", "ENGINEERING", "●", "EXPERIENCE", "●", "STRATEGY", "●", "MOTION", "●"];'
);

// Replace the condition class
data = data.replace(
  /item === '[^']+' \? 'text-accent'/g,
  "item === '●' ? 'text-accent'"
);

fs.writeFileSync('components/RecodyLanding.jsx', data);
console.log("Replaced successfully!");
