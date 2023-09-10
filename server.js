const fs = require('fs')
const { gzip } = require('node-gzip');

const fastify = require('fastify')({
    logger: { level: 'info' } //trace per log più verboso
})

fastify.register(require('@fastify/cors'), {
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

    if (query.tipo != undefined) {
        if (Array.isArray(query.tipo)) {
            var arrRes = []
            query.tipo.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.tipo == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.tipo == query.tipo;
            })
        }
    }

    if (query.nome != undefined) {
        if (Array.isArray(query.nome)) {
            var arrRes = []
            query.nome.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.nome == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.nome == query.nome;
            })
        }
    }

    /** commento i filtri che non uso per evitare di rallentare il tutto
    if (query.uni != undefined) {
        if (Array.isArray(query.uni)) {
            var arrRes = []
            query.uni.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.uni == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.uni == query.uni;
            })
        }
    }
    */

    if (query.accesso != undefined) {
        if (Array.isArray(query.accesso)) {
            var arrRes = []
            query.accesso.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.accesso == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.accesso == query.accesso;
            })
        }
    }

    if (query.lingua != undefined) {
        if (Array.isArray(query.lingua)) {
            var arrRes = []
            query.lingua.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.lingua == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.lingua == query.lingua;
            })
        }
    }

    if (query.comune != undefined) {
        if (Array.isArray(query.comune)) {
            var arrRes = []
            query.comune.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.comune == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.comune == query.comune;
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
            tabella += `<tr class="even:bg-slate-50 hover:bg-slate-100"><td class="text-red-600 border px-1"><a target="_blank" rel="noopener" href="${corso.link}">${corso.nome}</a></td><td class="border px-1">${corso.comune}</td><td class="border px-1">${corso.uni}</td></tr>`
        })

        reply.headers({ 'content-encoding': 'gzip', 'content-type': 'text/plain; charset=utf-8', 'Cache-control': 'public, max-age=604800' })
        reply.send(tabella);
    }
})

fastify.get('/', function(request, reply) {
    reply.send(`Up and running`)
})

// Run the server!
fastify.listen({port: port, host: '0.0.0.0'}, function(err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})