const fs = require('fs')
const path = require('path');

const fastify = require('fastify')({
    logger: { level: 'trace' }
})
fastify.register(
    require('fastify-compress'),
    { encodings: ['gzip', 'deflate'] }
)
fastify.register(require('fastify-cors'), {
    // put your options here
})

let rawdata = fs.readFileSync(require.resolve('./db.json'));
let corsi = JSON.parse(rawdata);

const port = process.env.PORT || 3000;

fastify.get('/corsi', function (request, reply) {
    console.log(request.query)

    query = request.query;

    res = corsi.corsi;

    if (query.t != undefined) {
        if (Array.isArray(query.t)) {
            var arrRes = []
            query.t.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.t == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.t == query.t;
            })
        }
    }

    if (query.n != undefined) {
        if (Array.isArray(query.n)) {
            var arrRes = []
            query.n.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.n == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.n == query.n;
            })
        }
    }

    if (query.u != undefined) {
        if (Array.isArray(query.u)) {
            var arrRes = []
            query.u.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.u == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.u == query.u;
            })
        }
    }

    if (query.a != undefined) {
        if (Array.isArray(query.a)) {
            var arrRes = []
            query.a.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.a == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.a == query.a;
            })
        }
    }

    if (query.c != undefined) {
        if (Array.isArray(query.c)) {
            var arrRes = []
            query.c.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.c == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.c == query.c;
            })
        }
    }

    if (query.e != undefined) {
        if (Array.isArray(query.e)) {
            var arrRes = []
            query.e.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.e == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.e == query.e;
            })
        }
    }

    if (query.s != undefined) {
        if (Array.isArray(query.s)) {
            var arrRes = []
            query.s.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.s == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.s == query.s;
            })
        }
    }

    reply.send(res.sort((firstItem, secondItem) => firstItem.n - secondItem.n));
})

fastify.get('/master', function (request, reply) {
    query = request.query;

    res = corsi.master;

    if (query.uni != undefined) {
        if (Array.isArray(query.uni)) {
            var arrRes = []
            query.uni.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.uni == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.uni == query.uni;
            })
        }
    }

    if (query.corso != undefined) {
        if (Array.isArray(query.corso)) {
            var arrRes = []
            query.corso.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.corso == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.corso == query.corso;
            })
        }
    }

    if (query.citta != undefined) {
        if (Array.isArray(query.citta)) {
            var arrRes = []
            query.citta.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.citta == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.citta == query.citta;
            })
        }
    }

    if (query.lingua != undefined) {
        if (Array.isArray(query.lingua)) {
            var arrRes = []
            query.lingua.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.lingua == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.lingua == query.lingua;
            })
        }
    }

    if (query.tipo != undefined) {
        if (Array.isArray(query.tipo)) {
            var arrRes = []
            query.tipo.forEach(function (el1) {
                arrRes = arrRes.concat(res.filter(function (el2) {
                    return el2.tipo == el1;
                }))
            })
            res = arrRes;
        } else {
            res = res.filter(function (el) {
                return el.tipo == query.tipo;
            })
        }
    }

    reply.send(res.sort((firstItem, secondItem) => firstItem.corso - secondItem.corso));
})

fastify.get('/', function (request, reply) {
    reply.send(`Up and running`)
})

// Run the server!
fastify.listen(port, '0.0.0.0', function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})