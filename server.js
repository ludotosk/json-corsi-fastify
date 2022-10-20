const fs = require('fs')
const { gzip } = require('node-gzip');

const fastify = require('fastify')({
    logger: { level: 'info' } //trace per log più verboso
})

fastify.register(require('fastify-cors'), {
    origin: "*",
    methods: ["GET"]
})

let corsi = fs.readFileSync(require.resolve('./db.json'));
corsi = JSON.parse(corsi);

var cache = []

const port = process.env.PORT || 3000;

fastify.addHook('onSend', async(request, reply, payload) => {
    var saved = false;

    if (cache.length >= 100) {
        cache.shift()
    }

    cache.forEach((el) => {
        if (el.url == request.url) {
            saved = true
        }
    })

    if (request.routerPath != '/' && !saved) {
        //console.log('salvataggio e compressione')
        payload = await gzip(payload);
        cache.push({
            url: request.raw.url,
            payload
        })
    }

    return payload
})

function filtro(query) {
    console.log('handler')

    res = corsi; //se dovessi rimettere i master questo diventa corsi.corsi

    if (query.t != undefined) {
        if (Array.isArray(query.t)) {
            var arrRes = []
            query.t.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.t == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.t == query.t;
            })
        }
    }

    if (query.n != undefined) {
        if (Array.isArray(query.n)) {
            var arrRes = []
            query.n.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.n == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.n == query.n;
            })
        }
    }

    if (query.u != undefined) {
        if (Array.isArray(query.u)) {
            var arrRes = []
            query.u.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.u == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.u == query.u;
            })
        }
    }

    if (query.a != undefined) {
        if (Array.isArray(query.a)) {
            var arrRes = []
            query.a.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.a == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.a == query.a;
            })
        }
    }

    if (query.c != undefined) {
        if (Array.isArray(query.c)) {
            var arrRes = []
            query.c.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.c == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.c == query.c;
            })
        }
    }

    if (query.e != undefined) {
        if (Array.isArray(query.e)) {
            var arrRes = []
            query.e.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.e == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.e == query.e;
            })
        }
    }

    if (query.s != undefined) {
        if (Array.isArray(query.s)) {
            var arrRes = []
            query.s.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.s == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.s == query.s;
            })
        }
    }

    if (query.o != undefined) {
        if (Array.isArray(query.o)) {
            var arrRes = []
            query.o.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.o == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.o == query.o;
            })
        }
    }

    if (query.inter != undefined) {
        if (Array.isArray(query.inter)) {
            var arrRes = []
            query.inter.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.inter == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.inter == query.inter;
            })
        }
    }

    return res;
}

fastify.get('/corsi', function(request, reply) {
    var saved = false;

    cache.forEach((el) => {
        if (el.url == request.url) {
            //console.log('cache')
            saved = true;
            reply.headers({ 'content-encoding': 'gzip', 'content-type': 'application/json; charset=utf-8', 'Cache-control': 'public, max-age=604800' }).send(el.payload)
        }
    })

    if (!saved) {

        query = request.query;

        reply.headers({ 'content-encoding': 'gzip', 'content-type': 'application/json; charset=utf-8', 'Cache-control': 'public, max-age=604800' })
        reply.send(filtro(query));
    }
})

fastify.get('/tabella', function(request, reply) {
    var saved = false;

    cache.forEach((el) => {
        if (el.url == request.url) {
            //console.log('cache')
            saved = true;
            reply.headers({ 'content-encoding': 'gzip', 'content-type': 'text/plain; charset=utf-8', 'Cache-control': 'public, max-age=604800' }).send(el.payload)
        }
    })

    if (!saved) {

        query = request.query;

        corsiFiltrati = filtro(query);

        var tabella = "";
        corsiFiltrati.forEach(corso => {
            tabella += `<tr class="even:bg-slate-50 hover:bg-slate-100"><td class="text-red-600 border px-1"><a target="_blank" rel="noopener" href="${corso.h}">${corso.n}</a></td><td class="border px-1">${corso.s}</td><td class="border px-1">${corso.u}</td></tr>`
        })

        reply.headers({ 'content-encoding': 'gzip', 'content-type': 'text/plain; charset=utf-8', 'Cache-control': 'public, max-age=604800' })
        reply.send(tabella);
    }
})

fastify.get('/', function(request, reply) {
    reply.send(`Up and running`)
})

// Run the server!
fastify.listen(port, '0.0.0.0', function(err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})