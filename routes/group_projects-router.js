import express from 'express';
import controller from '../controllers/group_projects-controller.js'

let groupProjects = express.Router();
groupProjects.get("/getByGroupCod/:code/", controller.getByGroupCod);
groupProjects.get("/", controller.getAll);
groupProjects.post("/create/", controller.create);
groupProjects.delete("/delete/", controller.deleteAll);

export default groupProjects;