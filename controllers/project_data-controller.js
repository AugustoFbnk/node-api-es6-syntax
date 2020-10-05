import repository from '../repositories/project_data-repository.js';
import groupRepository from '../repositories/group_projects-repository.js';

async function getListModelsByGroup(req, res) {
    try {
        let data = await repository.getByGroup(req.params.group);
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send('Falha ao processar requisição: ' + error);
    }
}

async function create(req, res) {
    try {
        await repository.create({
            url_3d: req.body.url_3d,
            group_cod: req.body.group_cod,
            url_image: req.body.url_image,
            name: req.body.name,
            description: req.body.description,
            root_path: req.body.root_path,
        });
        res.status(201).send({
            message: 'Modelo cadastrado com sucesso!'
        });

    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
}


async function InsertDataProject(req, res, next){
    try {
        let groupId = groupRepository.getByGroupCod(req.body.group_code);
        
    } catch (error) {
        res.status(500).send(`Falha ao processar a requisiçao: ${error.message}`);
    }
}

export default { getListModelsByGroup, create };