const express = require('express');
const router = express.Router();
const deadline = require('../model/deadline');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let deadlines = await deadline.find().sort({deadline: 1});
  res.render('deadline', {dl: deadlines});
});

router.post('/', (req, res) => {
  let crDate = new Date().getTime();
  let inputDate = new Date(req.body.deadline).getTime();
  if(crDate >= inputDate) return res.redirect('/deadline');
  let newDeadline = new deadline({
    deadline: [ req.body.deadline ]
  })
  newDeadline.save((err)=>{
    if(err) res.send(err);
    res.redirect('/deadline');
  })
})

module.exports = router;
