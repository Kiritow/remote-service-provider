const koa = require('koa');
const koaRouter = require('koa-router');
const koaJson = require('koa-json');
const koaBodyParser = require('koa-bodyparser');
const mysql = require('mysql');

const app = new koa();
app.use(koaBodyParser());
app.use(koaJson());
const router = new koaRouter();

function GrantAccess(ctx) {
    ctx.body = {
        "reject": false,
        "unchange": true
    }
}

function RejectAccess(ctx, reason) {
    ctx.body = {
        "reject": true,
        "reject_reason": reason || "Access denied.",
    }
}

router.post('/event/NewProxy', async (ctx) => {
    const postData = ctx.request.body;
    const {
        proxy_name: proxyName,
        proxy_type: proxyType,
        remote_port: remotePort,
        metas: metadata,
    } = postData.content;

    if (proxyType !== 'tcp' || !proxyName.startsWith('container-service-') ) {
        return GrantAccess(ctx);
    }

    if (!metadata || !metadata.domain) {
        return RejectAccess(ctx, 'no domain provided.');
    }

    return GrantAccess(ctx);
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(1234);
