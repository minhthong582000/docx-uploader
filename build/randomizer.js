// images after randomized maybe have some duplicate items
const contentList = require('../config/contentData/list');
const imgFolder = './config/images'
const fs = require('fs');

function removeDuplicateItems () {
    //do it later
}

let imgArray = [];
let randomImgArray = [];
let sectionsData = [];

fs.readdirSync(imgFolder).forEach(file => {
  imgArray.push(file);
});

let imgsLength = imgArray.length; 

function randomizeNumber (length) {
    return Math.floor(Math.random() * (length));
}

function randomizeImages () {
    let num = randomizeNumber(imgsLength);
    return imgArray[num];
}

function _importantItems (content, contentLength) {
    let importantItems = [];
    for(let i = 0; i < contentLength; i ++) {
        if(content[i].search('#') > -1) {
            content[i] = content[i].split('#')[1];
            importantItems.push(content[i]);
        }
    }
    return importantItems;
}

function generateSectionContent (_content) {
    let randomList = [];
    let contentLength = _content.length;

    //push important items (start with '#')
    randomList.push(..._importantItems(_content, contentLength));

    //randomize content for each sections
    //Retrieve a random number for list items (rows) you want for each sections,
    //which i set range between 3 and 5 by default 
    //The list items will be marked with bullets (small black circles) (define in test.docx)
    let numberOfRows = Math.floor(Math.random() * 3) + 3;
    for(let i = 0; i < numberOfRows; i++) {
        let num = randomizeNumber(contentLength);
        randomList.push(_content[num]);
    };
    
    //Remove duplicate items by using Set 
    //Set is a new data object introduced in ES6, it only lets you store unique values.
    let uniqueContents = new Set(randomList);
    let result = [...uniqueContents];
    sectionsData.push(result);
}

//generate data for each sections
const numberOfSections = contentList.length;
for(let i = 0; i < numberOfSections; i ++) {
    generateSectionContent(contentList[i]);
    randomImgArray.push(randomizeImages());
}

// run randomizeImage 1 more time to get Header Image
// So the header image will always be the last element in randomImgArray
randomImgArray.push(randomizeImages()); 

module.exports = { sectionsData, randomImgArray };
