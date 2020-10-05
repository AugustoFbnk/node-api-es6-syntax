import mongoose from 'mongoose';
import GroupProjects from '../models/group_projects.js';

const getByGroupCod = async (code) => {
    const res = await GroupProjects.findOne({
        group_cod: code
    }, (err) => { return 'Erro ao consultar dados do grupo: ' + err });
    return res;
}
const create = async(data) => {
    var group = new GroupProjects(data);
    await group.save();
}

const getAll = async () => {
    const res = await GroupProjects.find({}, (err) => { return 'Erro ao consultar dados do grupo: ' + err });
    return res;
}

const deleteAll = async () => {
    const res = await GroupProjects.deleteMany({}, (err) => { return 'Erro ao excluir grupos: ' + err });
    return res;
}
export default { getByGroupCod, create, getAll, deleteAll };