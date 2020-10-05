import express from 'express';
import controller from '../controllers/aws-s3-controller.js'
import multer from 'multer';

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

let s3Router = express.Router();

s3Router.get("/getObj/:name/:encoding", controller.getObj);
s3Router.get("/getUrl/", controller.getSignedUrl);
s3Router.post("/upload/", upload.single('file'), controller.uploadObj);

export default s3Router;