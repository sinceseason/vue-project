// 第 1 步：创建一个 Vue 实例
const Vue = require("vue");

const fs = require("fs");
const Koa = require("koa");
const path = require("path");
const koaStatic = require('koa-static');
const Router = require('koa-router');
const send = require('koa-send');
const app = new Koa();
const router = new Router();

// 第 2 步：获得一个createBundleRenderer
const {
    createBundleRenderer
} = require("vue-server-renderer");
const bundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(path.resolve(__dirname, "../src/index.template.html"), "utf-8"),
    clientManifest: clientManifest
});

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            err ? reject(err) : resolve(html);
        });
    });
}

// 第 3 步：添加一个中间件来处理所有请求
// const handelRequest = async (ctx, next) => {
//     const context = {
//         title: "ssr test",
//         url: ctx.path
//     };
//     // 将 context 数据渲染为 HTML
//     renderer.renderToString(context, (err, html) => {
//         if (err) {
//             // ctx.status(500).end('Internal Server Error');
//             ctx.status = 500;
//             ctx.body = err;
//             return;
//         }
//         ctx.body = html;
//     });
// };

const handelRequest = async (ctx, next) => {
    const url = ctx.path
    if (url.includes('.')) {
        return await send(ctx, url, {
            root: path.resolve(__dirname, '../dist')
        })
    }

    ctx.res.setHeader("Content-Type", "text/html");
    const context = {
        title: url == '/' ? 'ssr home' : 'ssr about',
        url
    };
    // 将 context 数据渲染为 HTML
    const html = await renderToString(context);
    ctx.body = html;
}

router.get('*', handelRequest);
module.exports = router;

// app.use(async (ctx, next) => {
//     const vm = new Vue({
//         data: {
//             title: 'ssr example',
//             url: ctx.url,
//             meta: `
//                 <meta name="keywords" content="this is keywords">
//                 <meta name="description" content="this is miaoshu">
//             `
//         },
//         template: `<div>访问的 URL 是： {{ url }}</div>`
//     });
//     renderer.renderToString(vm, (err, html) => {
//         if (err) {
//             ctx.res.status(500).end('Internal Server Error')
//             return
//         }
//         ctx.body = html
//     })
// });

// app.listen(3000);