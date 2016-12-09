const childProcess = require('child_process');
const camelCase = require('camelcase');
const name = camelCase(require('../package.json').name);

childProcess.execSync(`node_modules/.bin/uglifyjs -c --comments --screw-ie8 -o dist/bundles/${name}.umd.min.js dist/bundles/${name}.umd.js`);
