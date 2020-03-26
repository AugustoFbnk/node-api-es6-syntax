import AWS from 'aws-sdk';
import acessoConfiguracao from '../config.js';

class S3 {
    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: acessoConfiguracao.aws.s3.buckets.bucketHomeFiles.accessKeyId,
            secretAccessKey: acessoConfiguracao.aws.s3.buckets.bucketHomeFiles.secretAccessKey,
            Bucket: acessoConfiguracao.aws.s3.buckets.bucketHomeFiles.name
        });
    }
    async uploadtObject(data, callback) {

        data.body.buffer = getBuffer(data);

        await this.s3.createBucket(() => {
            var params = {
                Bucket: acessoConfiguracao.aws.s3.buckets.bucketHomeFiles.name,
                Key: data.body.name,
                Body: data.body.buffer
            };
            this.s3.upload(params, function (err, data) {
                if (err) {
                    callback(err);
                }
                else {
                    callback('Arquivo incluído com suceso');
                }
            });
        })
    }

    async getObject(params, callback) {

        var bucketParams = {
            Bucket: acessoConfiguracao.aws.s3.buckets.bucketHomeFiles.name,
            Key: params.name
        }
        await this.s3.getObject(bucketParams, function (err, data) {
            if (err) {
                callback(err);
            }
            else {
                callback(data.Body.toString(params.encoding));
            }
        });
    }
}

function getBuffer(data) {

    let options = {
        img: (data) => {
            let rawdata = data.body.file;
            let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            let buffer = new Buffer(matches[2], 'base64');
            return buffer;
        },
        json: (data) => {
            return data.body.file;
        }
    }
    let option = options[data.body.type];
    return option(data);
}

export default S3;