const fs = require('fs')
const fastify = require('fastify')()
fastify.register(
    require('fastify-compress'),
    { global: true }
)
fastify.register(require('fastify-cors'), {
    // put your options here
})

let rawdata = fs.readFileSync(require.resolve('./db.json'));
let corsi = JSON.parse(rawdata);

const port = process.env.PORT || 3000;

fastify.get('/corsi', function (request, reply) {
    query = request.query;

    res = corsi.corsi;

    if (query.t != undefined) {
        res = res.filter(function (el) {
            return el.t == query.t;
        })
    }

    if (query.n != undefined) {
        res = res.filter(function (el) {
            return el.n == query.n;
        })
    }

    if (query.u != undefined) {
        res = res.filter(function (el) {
            return el.u == query.u;
        })
    }

    if (query.a != undefined) {
        res = res.filter(function (el) {
            return el.a == query.a;
        })
    }

    if (query.c != undefined) {
        res = res.filter(function (el) {
            return el.c == query.c;
        })
    }

    if (query.e != undefined) {
        res = res.filter(function (el) {
            return el.e == query.e;
        })
    }

    if (query.s != undefined) {
        res = res.filter(function (el) {
            return el.s == query.s;
        })
    }

    reply.send(res.sort((firstItem, secondItem) => firstItem.n - secondItem.n));
})

fastify.get('/master', function (request, reply) {
    query = request.query;

    res = corsi.master;

    if (query.uni != undefined) {
        res = res.filter(function (el) {
            return el.uni == query.uni;
        })
    }

    if (query.corso != undefined) {
        res = res.filter(function (el) {
            return el.corso == query.corso;
        })
    }

    if (query.citta != undefined) {
        res = res.filter(function (el) {
            return el.citta == query.citta;
        })
    }

    if (query.lingua != undefined) {
        res = res.filter(function (el) {
            return el.lingua == query.lingua;
        })
    }

    if (query.tipo != undefined) {
        res = res.filter(function (el) {
            return el.tipo == query.tipo;
        })
    }

    reply.send(res.sort((firstItem, secondItem) => firstItem.n - secondItem.n));
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