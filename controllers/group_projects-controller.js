import repository from '../repositories/group_projects-repository.js';

async function getAll(req, res) {
    try {
        let data = await repository.getAll();
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send('Falha ao processar requisição: ' + error);
    }
}

async function deleteAll(req, res) {
    try {
        let data = await repository.deleteAll();
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send('Falha ao processar requisição: ' + error);
    }
}

async function getByGroupCod(req, res) {
    try {
        let data = await repository.getByGroupCod(req.params.code);
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send('Falha ao processar requisição: ' + error);
    }
}

async function create(req, res) {
    try {
        await repository.create({
            group_cod: req.body.group_cod,
            name: req.body.name,
            description: req.body.description,
            prefix: req.body.prefix
        });
        res.status(201).send({
            message: 'Grupo cadastrado com sucesso!'
        });

    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
}

export default { getByGroupCod, create, getAll, deleteAll};