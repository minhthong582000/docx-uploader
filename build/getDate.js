let today = new Date();
let d = today.getDay();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

switch(d) {
    case 0:
    d = "Chủ nhật";
    break;
case 1:
    d = "Thứ hai";
    break;
case 2:
    d = "Thứ ba";
    break;
case 3:
    d = "Thứ tư";
    break;
case 4:
    d = "Thứ năm";
    break;
case 5:
    d = "Thứ sau";
    break;
case 6:
    d = "Thứ bảy";
}

module.exports = { d, dd, mm, yyyy };