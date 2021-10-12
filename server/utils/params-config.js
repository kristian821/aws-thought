const { v4: uuidv4 } = require('uuid');

const params = fileName => {
    const myFile = fileName.originalname.split('.');
    const fileType = myfile[myFile.length - 1];

    const imageParams = {
        Bucket: '<My_Bucket_Name>',
        Key: `${uuid4()}.${fileType}`,
        Body: fileName.buffer
    };

    return imageParams;
};

module.exports = params;