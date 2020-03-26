import Express from 'express';
import cors from 'cors';
import s3Router from './routes/aws-s3-routes.js';
import userRouter from './routes/user-router.js';

class Server {
    constructor() {
        this.server = Express();
    }

    run() {
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(Express.json());
        this.server.use(cors());
        this.server.listen(4000, () => {
            console.log("API rodando na porte 4000");
        });

    }

    routes() {
        this.server.use('/s3', s3Router);
        this.server.use('/user', userRouter);
    }
}

export default Server;