const express = require('express');
const router = express.Router();
const { generate } = require('../build/generateDocx');
const deadline = require('../model/deadline');

router.get('/', async (req, res, next) => {
  let deadlines = await deadline.find().sort({ deadline: 1 });
  if(deadlines[0]) {
    console.log("hit yes");
    return res.render('index', { crDeadline: deadlines[0].deadline});
  }
  else {
    console.log("hit no !");
    return res.redirect('/deadline');
  }
});

router.get('/success/', (req, res, next) => {
  setTimeout(
    async () => {
      await generate();
      res.render("done");
    }, 4000
  )
})

module.exports = router;
