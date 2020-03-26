import express from 'express';
import controller from '../controllers/user-controller.js'

let userRouter = express.Router();

userRouter.post("/authenticate", controller.authenticate);


export default userRouter;