import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    url_3d: {
        type: String,
        required: false,
        unique: false
    },

    group_cod:{
        type: String,
        required: true
    },

    url_image: {
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

    root_path: {
        type: String,
        required: true
    }

});

const ProjectData = mongoose.model('project_data', schema);
export default ProjectData;