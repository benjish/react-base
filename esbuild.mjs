import * as esbuild from 'esbuild'
import {sassPlugin} from 'esbuild-sass-plugin'
// import purgecssPlugin from 'esbuild-plugin-purgecss'
import { compress } from 'esbuild-plugin-compress';

const isDev = process.env.NODE_ENV === 'dev';
const isProd = process.env.NODE_ENV === 'production';

let options = {
    bundle: true,
    charset: 'utf8',
    format: 'iife',
    logLevel: 'info',
    color: true,
    // lineLimit: 250,
    splitting: false,
    sourcemap: isDev,
    minify: isProd,
    write: isProd,
    metafile: true,
    entryPoints: [
        { out: 'static/app', in: 'src/index.tsx'},
    ],
    outdir: 'dist',
    loader: {
        '.png': 'file',
        '.jpg': 'file',
        '.svg': 'file',
        '.ttf': 'file',
    },
    external: ['/static/fonts/*'],
    plugins: [sassPlugin({
        style: isProd ? 'compressed' : 'expanded',
    })/*TODO ,purgecssPlugin()*/],
}

if (isProd) {
    options = {...options,
        write: false,
        dropLabels: ['DEV','TEST'],
        plugins: [
            ...(options.plugins ?? []),
            compress({
                emitOrigin: true,
                gzip: true,
                brotli: true,
                exclude: ['**/*.map'],
            }),
        ],
    }
    let ctx = await esbuild.build(options)
    void ctx;
}

if (isDev) {
    let ctx = await esbuild.context(options)
    await ctx.watch({

    })

    let { host, port } = await ctx.serve({
        port: 3000,
        servedir: 'dist',
        fallback: "index.html",
        // onRequest: args => {
        //     // console.log(args)
        // }
    })

    console.log(`listen on ${host}:${port}`)
}
