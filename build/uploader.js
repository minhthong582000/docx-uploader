const { google } = require("googleapis");
const path = require('path');
const fs = require('fs');
const key = require('../credentials.json');

function uploadToGoogleDrive (fileName, folderID) {
    let drive = google.drive("v3");
    let jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        [
            "https://www.googleapis.com/auth/drive"
        ],
        null
    );

    jwtClient.authorize((err) => {
        if (err) {
            console.log("Error authorizing with JWT", err);
            return;
        }
        console.log('authorized !')
    });

    let folder = folderID || '1HH5eMfP6070PsLSvnyNoGfOj9snTPkqB';
    let fileMetadata = {
        name: fileName,
        parents: [folder]
    };
    let media = {
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        body: fs.createReadStream(path.join(__dirname, '..', 'output', fileName))
    };
    drive.files.create({
        auth: jwtClient,
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
        if (err) 
            console.error(err);
        else 
            console.log('File Id: ', file.data);
    });
    return;
};

module.exports = { uploadToGoogleDrive };

