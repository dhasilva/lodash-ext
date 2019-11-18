import commonjs     from 'rollup-plugin-commonjs'
import resolve      from 'rollup-plugin-node-resolve'
import localResolve from 'rollup-plugin-local-resolve'
import babel        from 'rollup-plugin-babel'
import { terser }   from "rollup-plugin-terser"
import pkg          from './package.json'


export default [
  // browser-friendly UMD build, all packed (no external dependency)
  {
    input: 'src/index.js',
    output: {
      name: '_',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),  // so Rollup can find dependencies like `lodash` or `core-js`
      commonjs(), // so Rollup can transform dependencies in CommonJS to ESM
      babel(),    // uses default config in babel.config.js (targeting browsers)
    ]
  },
  {
    input: 'src/index.js',
    output: {
      name: '_',
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'umd'
    },
    plugins: [
      resolve(),  // so Rollup can find dependencies like `lodash` or `core-js`
      commonjs(), // so Rollup can transform dependencies in CommonJS to ESM
      babel(),    // uses default config in babel.config.js (targeting browsers)
      terser()
    ]
  },

  // CommonJS (for Node 8+)
  {
    input: 'src/index.js',
    external: ['lodash'],
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [
      localResolve(),
      babel({     // overriding babel.config.js, targeting node specifically
        presets: [[
          "@babel/preset-env", {
            targets: {
              node: "8"
            }
          }
        ]]
      }),
    ]
  },

  // and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: ['lodash'],
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      commonjs(), // so Rollup can transform dependencies in CommonJS to ESM
      localResolve(),
      babel(),    // uses default config in babel.config.js (targeting browsers)
    ]
  },
]
