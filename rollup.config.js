import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
    postcss({
      modules: false,
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
  external: ['react', 'react-dom'],
};
