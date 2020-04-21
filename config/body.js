const { sectionsData, randomImgArray } = require('../build/randomizer');

module.exports.sections = [
    {
        section: "Những việc đã làm:",
        image: randomImgArray[0],
        hasimage: false,
        content: sectionsData[0]
    },
    {
        section: "Những việc đang và sẽ làm:",
        image: randomImgArray[1],
        hasimage: false,
        content: sectionsData[1]
    },
    {
        section: "Nhận xét:",
        image: randomImgArray[2],
        hasimage: false,
        content: sectionsData[2]
    },
    {
        section: "Khó khăn gặp phải",
        image: randomImgArray[3],
        hasimage: false,
        content: sectionsData[3]
    }
];
//send a random Image use for header 
module.exports.headerImg = randomImgArray[4];