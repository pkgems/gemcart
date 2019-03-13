import rollup from 'rollup'
import { join } from 'path'
import { readFileSync } from 'fs'

import pluginTypescript from 'rollup-plugin-typescript2'
import pluginCommonjs from 'rollup-plugin-commonjs'
import pluginResolve from 'rollup-plugin-node-resolve'
import pluginFilesize from 'rollup-plugin-bundle-size'
import pluginJson from 'rollup-plugin-json'

export const build = ({ input, output, banner, withDeps, minify }) => {
  const cwd = process.cwd()
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'))

  return rollup
    .rollup({
      input: join(cwd, input),
      output: {
        file: join(cwd, output),
        format: 'cjs',
      },

      external: [
        ...(withDeps ? [] : Object.keys(pkg.dependencies || {})),
        ...Object.keys(pkg.devDependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],

      plugins: [
        pluginTypescript({
          cacheRoot: '.cache',
          tsconfigOverride: {
            compilerOptions: {
              module: 'esnext',
            },
          },
        }),
        pluginCommonjs(),
        pluginResolve({
          extensions: ['.ts', '.js', '.json'],
        }),
        pluginFilesize(),
        pluginJson(),
      ],

      onwarn() {},
    })
    .then((build) =>
      build.write({
        file: join(cwd, output),
        format: 'cjs',
        banner: banner,
      }),
    )
}
