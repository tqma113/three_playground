const path = require('path');
const r = p => path.resolve(process.cwd(), p);

const fs = require('fs');

const entries = {};

const dirs = fs.readdirSync(r('src/pages/')).filter(i => i.indexOf('.DS_Store') === -1);

dirs.forEach(dir => {
  Object.assign(entries, {
    [dir]: r(`src/pages/${dir}/index.tsx`),
  });
});

module.exports = entries;
