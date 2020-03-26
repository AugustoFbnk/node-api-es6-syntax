import S3 from '../services/aws-s3-service.js'

async function getObj(req, res, next) {
    try {
        let s3 = new S3();
        await s3.getObject(req.params, (data) => {
            //Se vier mensgem,deu erro. Está retornando apenas o json se não deu erro. Mudar esse tratamento; 
            if (data.message) res.status(500).send(`Falha ao processar a requisiçao: ${data.message}`);
            else res.status(200).send(data);
        });

    } catch (error) {
        res.status(500).send(`Falha ao processar a requisiçao: ${error.message}`);
    }
}

async function uploadObj(req, res, next) {
    try {
        let s3 = new S3();
        await s3.uploadtObject(req, (data) => {
            if (data.message) res.status(500).send(`Falha ao processar a requisiçao: ${data.message}`);
            else res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send(`Falha ao processar a requisiçao: ${error.message}`);
    }
}

export default {getObj, uploadObj};