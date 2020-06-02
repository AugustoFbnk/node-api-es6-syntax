import S3 from '../services/aws-s3-service.js'

async function getObj(req, res, next) {
    try {
        let s3 = new S3();
        await s3.getObject(req.params, (data) => {
            if (data.message) res.status(500).send(`Falha ao processar a requisiçao: ${data.message}`);
            else res.status(200).send(data);
        });

    } catch (error) {
        res.status(500).send(`Falha ao processar a requisição: ${error.message}`);
    }
}

async function getSignedUrl(req, res, next) {
    try {
        let s3 = new S3();
        await s3.getSignedtUrl(req.params, (data) => {
            if (data.message) res.status(500).send(`Falha ao processar a requisiçao: ${data.message}`);
            else res.status(200).send(data);
        });

    } catch (error) {
        res.status(500).send(`Falha ao processar a requisição: ${error.message}`);
    }
}

async function uploadObj(req, res, next) {
    try {
        let s3 = new S3();
        await s3.uploadtObject(req, (data) => {
            if (data.message) res.status(500).send(`Falha ao processar a requisição: ${data.message}`);
            else res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send(`Falha ao processar a requisiçao: ${error.message}`);
    }
}

export default { getObj, uploadObj, getSignedUrl };