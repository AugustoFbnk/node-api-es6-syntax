import acessoConfiguracao from './config.js';
import mongoose from 'mongoose';

class Db {

    run() {
        this.db();
    }
    db() {
        mongoose.connect(acessoConfiguracao.connectionString);
    }
}

export default Db;