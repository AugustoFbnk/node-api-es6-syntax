import Server from './server.js'
import Db from './db.js'

const server = new Server();
const db = new Db();
server.run();
db.run();