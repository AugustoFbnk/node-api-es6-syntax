import express from 'express';
import controller from '../controllers/project_data-controller.js';

let projectDataRouter = express.Router();

projectDataRouter.get('/:group/', controller.getListModelsByGroup);
projectDataRouter.post('/post_model/', controller.create);

export default projectDataRouter;