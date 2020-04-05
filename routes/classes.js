const router = require('express').Router();
let Class = require('../models/class.model');

router.route('/').get((req, res) => {
  Class.find()
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const room_id = req.body.room_id;

  Class.find({room_id: room_id})
  .then(classes => {
    console.log(classes)
    const newClass = new Class({
      room_id,
    });
    if(classes.length === 0){
      
       newClass.save()
        .then(result => res.json("Added Room_id"))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
      res.json(classes[0])
    }
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Distributor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Distributor Deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateStudent/:room_id').post((req, res) => {
  const student = req.body.student

  Class.findOne({room_id : req.params.room_id})
    .then(findResult => {
      findResult.student_list.push(student);

      findResult.save()
        .then(result => res.json('Student Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
});


router.route('/updateQuestion/:room_id').post((req, res) => {
  const question = req.body.question

  Class.findOne({room_id : req.params.room_id})
    .then(findResult => {
      findResult.question_list.push(question);

      findResult.save()
        .then(result => res.json('Question Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
});

module.exports = router;