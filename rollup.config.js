import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import replace from 'rollup-plugin-replace'
export default {
    input: 'src/main.js',
    output: [
        {
            file: 'dist/lib-umd.js',
            format: 'umd',
            name: 'myLib',
            globals: {
                vue: "Vue"
            }
            //当入口文件有export时，'umd'格式必须指定name
            //这样，在通过<script>标签引入时，才能通过name访问到export的内容。
        },
        {
            file: 'dist/lib-es.js',
            format: 'es'
        },
        {
            file: 'dist/lib-cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/lib.min.js',
            format: 'iife',
            name: 'version',
            plugins: [terser()]
        }
    ],
    plugins: [
        //  plugin有序，vue要在前面调用
        vue({
            style: {
                postcssPlugins: [
                  autoprefixer(),
                  cssnano()
                ]
            }
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VUE_ENV': JSON.stringify('browser')
        }),
        resolve(),
        commonjs(),
        json(),
        babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            babelHelpers: 'bundled'
        }),
        postcss({
            plugins: [
                autoprefixer(),
                cssnano()
            ],
            extract: 'css/index.css'
        }),
        serve({
            contentBase: 'dist/',//服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
            port: 50618, //端口号，默认10001
        }),
        livereload('dist') //watch dist目录，当目录中的文件发生变化时，刷新页面
    ],
    extends:['lodash','vue-template-compiler']
}