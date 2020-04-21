const { sections, headerImg } = require('./body');
const { d, dd, mm, yyyy } = require('../build/getDate');

module.exports = {
    first_name: "Lê",
    last_name: "Minh Thông",
    title: "TEAM NODEJS PORTFOLIO",
    day: d,
    date: dd,
    month: mm,
    year: yyyy,
    team_name: "Nodejs",
    image: headerImg,
    hasimage: true,
    body: sections
}
