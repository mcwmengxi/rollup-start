// rollup.config.js
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace'
import livereload from 'rollup-plugin-livereload'

function isDev(){
  return process.env.NODE_ENV === 'development'
}
export default defineConfig({
	/* your config */
  input: 'src/index.ts',
	output: {
		file: 'bundle.js',
		format: 'cjs',
    sourcemap: isDev()
	},
  plugins: [
    typescript(),
    resolve(['.js', '.ts']),
    serve({
      port: 5112,
      // open: true,
      // contentBase: '',
      openPage: '/public/index.html'
    }),
    terser({
      compress: {
        drop_console: !isDev()
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    isDev() && livereload()
  ]
});

