const express = require('express');
const database = require('./database');

const server = express();

server.use(express.json());

const notas = [];

server.get('/', (req, res) => {
    return res.json({ result: 'API-BancoDeDados' });
});

server.get('/notas', async (req, res) => {
    let notas;
    await database.query(`SELECT * FROM notas`, { type: database.QueryTypes.SELECT })
        .then(results => {
            notas = results
        })
        .catch(err => {
            return res.json('erro ao buscar usuários');
        })
    return res.json(notas);
});

server.get('/notas/:id', async (req, res) => {

    const { id } = req.params;
    let nota;

    await database.query(`SELECT * FROM notas WHERE id = ${id}`,
        { type: database.QueryTypes.SELECT })
        .then(notaResult => {
            nota = notaResult;
        })
        .catch(error => {
            return res.json(error);
        })
    return res.json({ nota })
});

server.post('/notas', async (req, res) => {
    let inseriu;
    const { id, titulo, conteudo, data, hora } = req.body;

    await database.query(`INSERT INTO notas VALUES(${id}, '${titulo}', '${conteudo}', '${data}', '${hora}');`,
        { type: database.QueryTypes.INSERT })
        .then(results => {
            inseriu = results
        })
        .catch(err => {
            return res.json(err);
        });
    return res.json(inseriu);
})

server.put('/notas/:id', async (req, res) => {
    let update;
    const { id, titulo, conteudo, data, hora } = req.body;

    await database.query(`UPDATE FROM notas SET(${id}, '${titulo}', '${conteudo}', '${data}', '${hora}');`,
        { type: database.QueryTypes.UPDATE })
        .then(results => {
            update = results
        })
        .catch(err => {
            return res.json(err);
        });
    return res.json(update);
})

server.delete('/notas/:id', async (req, res) => {
    let deletou;
    const { id } = req.params;
    await database.query(`DELETE FROM notas WHERE id = ${id}`,
        { type: database.QueryTypes.SELECT })
        .then(deletando => {
            deletou = deletando
        })
        .catch(err => {
            return res.json(err);
        });
    return res.json(deletou);
})

server.listen(process.env.PORT);