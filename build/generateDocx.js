const path = require('path');
const docxtemplater = require('docxtemplater');
const fs = require('fs');
const pizzip = require('pizzip');
const imageModule = require('docxtemplater-image-module');
const { dd, mm, yyyy } = require('./getDate');

const data = require('../config/template');
const { uploadToGoogleDrive } = require('./uploader');

function generate() {
    //image module options
    let opts = {};
    opts.centered = false; //Set to true to always center images
    opts.fileType = "docx"; 
    opts.getImage = function(tagValue, tagName) {
        //example:
            //tagValue is 'images/image.png'
            //tagName is 'image'
        return fs.readFileSync(path.resolve(__dirname, '..', 'config', 'images', tagValue));
    }
    //return image size
    opts.getSize = function(img, tagValue, tagName) {
        //img is the image returned by opts.getImage()
        return [500, 250];
    }

    let imgModule = new imageModule(opts);

    let content = fs.readFileSync(path.resolve(__dirname, '..', 'config', 'template.docx'), 'binary');

    let zip = new pizzip(content);

    let doc = new docxtemplater();
    doc.loadZip(zip).setOptions({ paragraphLoop:true });
    doc.attachModule(imgModule);
    doc.setData(data);

    try {
        doc.render();
        console.log("done !")
    }
    catch(error) {
            let e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({error: e}));
            if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors.map(function (error) {
                    return error.properties.explanation;
                }).join("\n");
                console.log('errorMessages', errorMessages);
                // errorMessages is a humanly readable message looking like this :
                // 'The tag beginning with "foobar" is unopened'
            }
            throw error;
    }

    let buf = doc.getZip().generate({type: 'nodebuffer'});

    //the output docx file's name will be YourName_BáoCáo_dd-mm.docx
    //for example: LeMinhThongDepTraiVoDichKhapVuTruRongLonBaoLa_BáoCáo_dd-mm-yyy.docx
    let outputFileName = data.first_name + data.last_name + '_BáoCáo_' + dd + '-' + mm + '.docx';

    fs.writeFileSync(path.resolve(__dirname, '..', 'output', outputFileName.replace(/ /g, '')), buf);

    uploadToGoogleDrive(outputFileName.replace(/ /g, ''), null);
    return;
}


module.exports = { generate }