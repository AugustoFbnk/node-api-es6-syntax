import express from 'express';
import controller from '../controllers/aws-s3-controller.js'

let s3Router = express.Router();

s3Router.get("/:name/:encoding", controller.getObj);
s3Router.post("/", controller.uploadObj);


export default s3Router;