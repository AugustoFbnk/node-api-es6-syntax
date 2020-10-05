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
    async getSignedtUrl(data, callback) {
        let bucketName = acessoConfiguracao.aws.s3.buckets.bucketHomeFiles.name;
        let url = 'https://' + bucketName + '.s3.amazonaws.com/' + data.headers.key;
        callback(url);
    }
    async getSignedtUrl_Deprecated(data, callback) {

        var bucketParams = {
            Bucket: acessoConfiguracao.aws.s3.buckets.bucketHomeFiles.name,
            Key: data.headers.key
        }
        var url = this.s3.getSignedUrl('getObject', bucketParams, function (err, url) {
            if (err) {
                callback(err);
            }
            else {
                callback(url.substring(0, url.indexOf("?")));
            }
        });
    }

    async uploadtObject(data, callback) {

        this.s3.createBucket(() => {
            var params = {
                Bucket: acessoConfiguracao.aws.s3.buckets.bucketHomeFiles.name,
                Key: data.body.directory + data.file.originalname,
                ContentType: data.file.mimetype,
                Body: data.file.buffer
            };
            
            this.s3.upload(params, function (err) {
                if (err) {
                    callback({ error: err, success: false });
                }
                else {
                    callback({
                        url: 'https://' + params.Bucket + '.s3.amazonaws.com/' + data.body.directory + data.file.originalname,
                        message: 'Arquivo incluído com suceso',
                        success: true
                    });
                }
            });
        })
    }

    async uploadtObject_Deprecated(data, callback) {
        const buffer = getBuffer(data);

        this.s3.createBucket(() => {
            var params = {
                Bucket: acessoConfiguracao.aws.s3.buckets.bucketHomeFiles.name,
                Key: data.body.name,
                Body: buffer
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

    try {
        let options = {
            arrayBuffer: (data) => {
                let base64String = Buffer.from(data.body.file).toString('base64');
                var buffer = new Buffer(base64String, 'base64').toString('ascii');
                return buffer;
            },
            img: (data) => {
                let rawdata = data.body.file;
                let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                let buffer = new Buffer(matches[2], 'base64');
                return buffer;
            },
            json: (data) => {
                return data.body.file;
            },
            base64: () => {
                var jsonString = new Buffer(data.body.file, 'base64').toString('ascii');
                return jsonString;
            },
            base64_2: () => {
                let rawdata = data.body.file;
                let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                let buffer = new Buffer(matches[2], 'base64').toString('ascii');;
                return buffer;
            }

        }
        let option = options[data.body.type];
        return option(data);
    } catch (error) {
        console.log(error);
    }

}

export default S3;