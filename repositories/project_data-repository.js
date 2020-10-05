import mongoose from 'mongoose';
import ProjectData from '../models/project_data.js';

const getByGroup = async (group) => {
    const res = await ProjectData.find({
        group_id: group
    }, (err) => { return 'Erro ao consultar dados: ' + err });
    return res;
}
const create = async(data) => {    
    var model = new ProjectData(data);
    await model.save();
}

export default { getByGroup, create };