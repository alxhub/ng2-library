const fs = require('fs');
let packageJson = require('../package.json');

// No need to ship devDependencies, they'll be ignored anyway.
delete packageJson['devDependencies'];

// ES5 users should use the UMD bundle.
packageJson['main'] = `bundles/${packageJson.name}.umd.js`;

// ES6 tools get ESM code to process.
packageJson['module'] = './index.js';

// Typescript users get .d.ts files.
packageJson['typings'] = 'index.d.ts';

// Remove build scripts.
let scripts = packageJson['scripts'] || '';
Object
  .keys(scripts)
  .filter(key => key === 'build' || key.startsWith('build:'))
  .forEach(key => delete scripts[key]);
packageJson['scripts'] = scripts;

// Write the new package.json into the dist/ dir.
fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));
