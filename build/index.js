#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var prog = _interopDefault(require('commander'));
var chalk = _interopDefault(require('chalk'));
var rollup = _interopDefault(require('rollup'));
var path = require('path');
var fs = require('fs');
var pluginTypescript = _interopDefault(require('rollup-plugin-typescript2'));
var pluginCommonjs = _interopDefault(require('rollup-plugin-commonjs'));
var pluginResolve = _interopDefault(require('rollup-plugin-node-resolve'));
var pluginFilesize = _interopDefault(require('rollup-plugin-bundle-size'));
var pluginJson = _interopDefault(require('rollup-plugin-json'));

const build = ({ input, output, banner, withDeps, minify }) => {
    const cwd = process.cwd();
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return rollup
        .rollup({
        input: path.join(cwd, input),
        output: {
            file: path.join(cwd, output),
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
        onwarn() { },
    })
        .then((build) => build.write({
        file: path.join(cwd, output),
        format: 'cjs',
        banner: banner,
    }));
};

// #!/usr/bin/env node
prog.name('gemcart').version('1.0.0');
prog
    .command('build')
    .option('-i, --input <input>', 'input file', 'src/index.ts')
    .option('-o, --output <input>', 'output file', 'build/index.js')
    .option('-b, --banner [banner]', 'add banner to the beginning of the file', '#!/usr/bin/env node')
    .option('-d, --withDeps', 'include dependencies', false)
    .option('-m, --minify', 'minify output', false)
    .description('build a package')
    .action(build);
if (!process.argv.slice(2).length) {
    prog.outputHelp(chalk.red);
}
prog.parse(process.argv);
