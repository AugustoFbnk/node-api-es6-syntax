import jwt from 'jsonwebtoken';
import acessoConfiguracao from '../config.js';

async function generateToken (data){
    return jwt.sign(data, acessoConfiguracao.accessKey, { expiresIn: '1d' });
}

async function decodeToken (token) {
    var data = await jwt.verify(token, acessoConfiguracao.accessKey);
    return data;
}

async function authorize (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, acessoConfiguracao.accessKey, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};

async function isAdmin (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, acessoConfiguracao.accessKey, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};

export default {generateToken, decodeToken, authorize, isAdmin}