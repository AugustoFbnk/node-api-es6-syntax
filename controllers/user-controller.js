import repository from '../repositories/user-repository.js';
import auth from '../services/auth-service.js';
import config from '../config.js';
import md5 from 'md5';

async function get(req, res, next) {

}

async function post(req, res, next) {

}

async function del(req, res, next) {

}

async function update(req, res, next) {

}

async function authenticate(req, res, next) {
    try {
        const user = await repository.authenticate(
            req.body.email,
            md5(req.body.password + config.accessKey)
        );

        if (!user) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos.'
            })
        }

        const token = await auth.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: `Falha ao processar sua requisição: ${error}`
        });
    }

}

export default { get, post, del, update, authenticate };