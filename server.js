const fs = require('fs')
const { gzip } = require('node-gzip');

// const redis = require('redis');
// const client = redis.createClient({ return_buffers: true });
// var cached = false;

const fastify = require('fastify')({
    logger: { level: 'error' }
    //logger: { level: 'trace' } per avere il log più verboso
})

fastify.register(require('fastify-cors'), {
    // put your options here
    origin: "*",
    methods: ["GET"]
})

let corsi = fs.readFileSync(require.resolve('./db.json'));
corsi = JSON.parse(corsi);

var cache = []


const port = process.env.PORT || 3000;

// fastify.addHook('onSend', async(request, reply, payload) => {
//     var saved = false;

//     if (cache.length >= 100) {
//         cache.shift()
//     }

//     cache.forEach((el) => {
//         if (el.url == request.url) {
//             saved = true
//         }
//     })

//     if (request.routerPath == '/corsi' && !saved) {
//         //console.log('salvataggio e compressione')
//         payload = await gzip(payload);
//         reply.headers({ 'content-encoding': 'gzip', 'content-type': 'application/json; charset=utf-8', 'Cache-control': 'public, max-age=604800' })
//         cache.push({
//             url: request.raw.url,
//             payload
//         })
//     }

//     return payload
// })

// fastify.addHook('onSend', async(request, reply, payload) => {

//     if (request.routerPath == '/corsi' && !cached) {
//         console.log('salvataggio e compressione')
//         payload = await gzip(payload);
//         client.set(request.raw.url, payload);
//         reply.headers({ 'content-encoding': 'gzip', 'content-type': 'application/json; charset=utf-8', 'Cache-control': 'public, max-age=604800' })
//     }

//     //console.log(typeof payload)

//     return payload
// })

// fastify.addHook('onSend', async(request, reply, payload) => {

//     payload = await gzip(payload)
//     reply.headers({ 'content-encoding': 'gzip', 'content-type': 'application/json; charset=utf-8', 'Cache-control': 'public, max-age=604800' })

//     return payload
// })

// fastify.addHook('onRequest', (request, reply, done) => {
//     if (cache.length != 0) {
//         cache.forEach((el) => {
//             if (el.url == request.url) {
//                 //console.log('cache')
//                 reply.headers({ 'content-encoding': 'gzip', 'content-type': 'application/json; charset=utf-8', 'Cache-control': 'public, max-age=604800' }).send(el.payload)
//             }
//         })
//     } else {
//         done()
//     }

// client.get(request.raw.url, (err, data) => {
//     if (err) throw err;

//     if (data !== null) {
//         //console.log('cache')
//         cached = true
//             //console.log(typeof data)
//             //console.log(data)
//         reply.headers({ 'content-encoding': 'gzip', 'content-type': 'application/json; charset=utf-8', 'Cache-control': 'public, max-age=604800' }).send(data)
//     } else {
//         cached = false
//         done()
//     }
// });

// })

fastify.get('/corsi', function(request, reply) {
    //console.log(request.query)

    query = request.query;

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

    reply.send(res);
})

fastify.get('/master', function(request, reply) {
    query = request.query;

    res = corsi.master;

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

    if (query.corso != undefined) {
        if (Array.isArray(query.corso)) {
            var arrRes = []
            query.corso.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.corso == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.corso == query.corso;
            })
        }
    }

    if (query.citta != undefined) {
        if (Array.isArray(query.citta)) {
            var arrRes = []
            query.citta.forEach(function(el1) {
                arrRes = arrRes.concat(res.filter(function(el2) {
                    return el2.citta == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function(el) {
                return el.citta == query.citta;
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

    reply.send(res);
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