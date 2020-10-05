import Express from 'express';
import cors from 'cors';
import s3Router from './routes/aws-s3-router.js';
import userRouter from './routes/user-router.js';
import projectDataRouter from './routes/project_data-router.js';
import groupProjectsRouter from './routes/group_projects-router.js';
import bodyParser from 'body-parser';

class Server {
    constructor() {
        this.server = Express();
    }

    run() {
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(bodyParser.json({ limit: '50mb', extended: true }))
        this.server.use(Express.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));

        this.server.use(cors());
        this.server.listen(4000, () => {
            console.log("API rodando na porte 4000");
        });

    }

    routes() {
        this.server.use('/s3', s3Router);
        this.server.use('/user', userRouter);
        this.server.use('/project_data', projectDataRouter);
        this.server.use('/group_projects', groupProjectsRouter);
    }
}

export default Server;