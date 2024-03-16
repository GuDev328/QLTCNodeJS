const { Upload } = require("@aws-sdk/lib-storage");
const { S3 } = require("@aws-sdk/client-s3");
const fs = require("fs");
const { ErrorWithStatus } = require("./errorHandler");
const { config } = require("dotenv");
config();

const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    },
});

const UploadJPEGToS3 = async (fileName, filePath) => {
    const parallelUploads3 = new Upload({
        client: s3,
        params: {
            Bucket: process.env.S3_NAME,
            Key: fileName,
            Body: fs.readFileSync(filePath),
            ContentType: "image/jpeg",
        },

        tags: [],
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
    });

    return parallelUploads3.done();
};

module.exports = { UploadJPEGToS3 };
