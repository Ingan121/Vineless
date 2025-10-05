import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'build-scripts/forge-entry.js',
    output: {
      file: 'src/lib/forge.min.js',
      format: 'es'
    },
    plugins: [nodeResolve({ browser: true }), commonjs(), terser()]
  },
  {
    input: 'build-scripts/protobuf-entry.js', 
    output: {
      file: 'src/lib/widevine/protobuf.min.js',
      format: 'es'
    },
    plugins: [nodeResolve(), commonjs(), terser()]
  },
  {
    input: 'build-scripts/xmldom-entry.js',
    output: {
      file: 'src/lib/playready/xmldom.min.js',
      format: 'es'
    },
    plugins: [nodeResolve(), commonjs(), terser()]
  },
  {
    input: 'build-scripts/noble-curves-entry.js',
    output: {
      file: 'src/lib/playready/noble-curves.min.js',
      format: 'es'
    },
    plugins: [nodeResolve({ browser: true }), commonjs(), terser()]
  }
];