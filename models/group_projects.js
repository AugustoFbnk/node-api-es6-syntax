import mongoose from 'mongoose';

const schema = new mongoose.Schema({

    group_cod: {
        type: String,
        required: false,
        unique: false
    },

    name: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: false
    },

    prefix: {
        type: String,
        required: true
    }

});

const GroupProjects = mongoose.model('group_projects', schema);
export default GroupProjects;