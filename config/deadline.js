let deadline = new Date("Dec 29, 2019 18:15:30").getTime();

function nextDeadline() {
    deadline += 7 * 24 * 60 * 60 * 1000;
}

module.exports = {
    deadline,
    nextDeadline
}
