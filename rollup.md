## rollup

### rollup入门

>命令行配置

-f选项是--output.format的缩写，指定输出类型
-o 指定输出目录
-c 默认读取Rollup配置文件
```bash
// 不指定输出文件，会自动打印(stdout)到node控制台
rollup src/main.js -f cjs

// 指定输出文件
rollup src/main.js -o public/bundle.js -f es
```

> 使用配置文件进行更多配置，命令行会覆盖它的配置

rollup --config rollup.config.dev.js

```cmd
// rollup.config.js
export default {
    input: 'src/main.js',
    output: {
        file: 'dev/bundle.js',
        format: 'es'
    }
    
}

```

>使用插件(Using plugins)

`npm install --save-dev rollup-plugin-json`


### 集成babel

`npm i -D @rollup/plugin-babel @rollup/plugin-node-resolve`

`npm i -D @babel/core @babel/preset-env`

```
/// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/main.js',
    output: [
        {
            file: 'dist/lib-umd.js',
            format: 'umd',
            name: 'lib'
            //当入口文件有export时，'umd'格式必须指定name
            //这样，在通过<script>标签引入时，才能通过name访问到export的内容。
        }
    ],
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            babelHelpers: 'bundled'
        })
    ]
}

/// .babelrc.json

{
    "presets": ["@babel/env"]
}
```

>rollup的plugin兼具webpack中loader和plugin的功能

有些外部库的是cjs或者umd(由webpack打包的),需要支持commonjs模块

`npm i -D @rollup/plugin-commonjs`

### css支持

>css支持
`yarn add postcss rollup-plugin-postcss --dev`

>css加前缀
`npm i autoprefixer@8.0.0 --D`

``` postcss
    plugins: [
        postcss({
            plugins: [
                autoprefixer()
            ]
        })
    ]
```

``` json
package.json
"browserslist": [
  "defaults",
  "not ie < 8",
  "last 2 versions",
  "> 1%",
  "iOS 7",
  "last 3 iOS versions"
]
```
>css压缩

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48efaaba47f44c8882ea7646eea44849~tplv-k3u1fbpfcp-watermark.image?)

>抽离单独的css文件
rollup-plugin-postcss默认将样式内联到head中，extract配置是否抽离成独立的文件，为文件路径

rollup-plugin-postcss默认集成了对scss、less、stylus的支持

### 处理.vue文件
vue2和vue3 template模板编译器不一样
vue2：rollup-plugin-vue^5.1.9 + vue-template-compiler
vue3：rollup-plugin-vue^6.0.0 + @vue/compiler-sfc

```
import vue from 'rollup-plugin-vue';
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
    ]
```

>解决Rollup打包vue时出现process is not defined

`npm i -D rollup-plugin-replace`
还是未能解析example组件

### 代码压缩

`rollup-plugin-terser`

### 热更新

rollup-plugin-serve、rollup-plugin-livereload
这两个插件常常一起使用，rollup-plugin-serve用于启动一个服务器，rollup-plugin-livereload用于文件变化时，实时刷新页面

```config
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
    plugins: [
        serve({
            contentBase: 'dist/',//服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
            port: 50618, //端口号，默认10001
        }),
        livereload('dist') //watch dist目录，当目录中的文件发生变化时，刷新页面
    ],
```

rollup监听源文件的改动很简单，就是在执行打包命令时，添加 -w 或者--watch


