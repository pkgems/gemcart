// #!/usr/bin/env node

import prog from 'commander'
import chalk from 'chalk'
import { build } from './build'

prog.name('gemcart').version('1.0.0')

prog
  .command('build')
  .option('-i, --input <input>', 'input file', 'src/index.ts')
  .option('-o, --output <input>', 'output file', 'build/index.js')
  .option(
    '-b, --banner [banner]',
    'add banner to the beginning of the file',
    '#!/usr/bin/env node',
  )
  .option('-d, --withDeps', 'include dependencies', false)
  .option('-m, --minify', 'minify output', false)
  .description('build a package')
  .action(build)

if (!process.argv.slice(2).length) {
  prog.outputHelp(chalk.red)
}

prog.parse(process.argv)
