const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonJs = require('rollup-plugin-commonjs');
const camelCase = require('camelcase');
const name = camelCase(require('../package.json').name);

rollup
  .rollup({
    entry: 'dist/index.js',
    external: [
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      'rxjs/Observable',
      'rxjs/Subject'
    ],
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true,
      }),
      commonJs({
        include: 'node_modules/**',
      }),
    ],
  })
  .then(bundle => {
    bundle.write({
      format: 'umd',
      dest: `dist/bundles/${name}.umd.js`,
      globals: {
        '@angular/common': 'ng.common',
        '@angular/compiler': 'ng.compiler',
        '@angular/core': 'ng.core',
        '@angular/http': 'ng.http',
        '@angular/router': 'ng.router',
        '@angular/platform-browser': 'ng.platformBrowser',
        '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
        'rxjs/Observable': 'Rx',
        'rxjs/Subject': 'Rx'
      },
      moduleName: name,
    });
  })
  .then(
    () => console.log(`\n\nrollup wrote dist/bundles/${name}.umd.js`),
    err => console.error('rollup error', err)
  );