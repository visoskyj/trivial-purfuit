const express = require('express');
const questionRoutes = express.Router();
let Question = require('../models/questions.model');


questionRoutes.route('/').get(function(req, res) {
    Question.find(function(err, questions) {
        if (err) {
            console.log(err);
        } else {
            res.json(questions);
        }
    });
});

questionRoutes.route('/update/:id').put(function(req, res) {
    Question.findById(req.params.id, function(err, question) {
        if (!question)
            res.status(404).send("data is not found");
        else
            question.question = req.body.question;
            question.answers = req.body.answers;
            question.correctAnswer = req.body.correctAnswer;
            question.category = req.body.category;
            
            question.save().then(question => {
                res.json('Question updated!');
            }).catch(err => {
                res.status(400).send('Update not possible with error ' + err.toString());
            });
    });
});

questionRoutes.route('/add').post(function(req, res) {
    let question = new Question(req.body);
    question.save()
        .then(question => {
            res.status(200).json({'Question': 'question added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new question failed with error ' + err.toString());
        });
});

questionRoutes.route('/:id').delete(function(req, res) {
    Question.findByIdAndRemove(req.params.id, req.body, function (
      err,
      data
    ) {
      if (err) {
        console.log("Error on delete");
        res.status(404).send(err);
      } else {
        Question.find((err, questions) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200);
            res.json(questions);
          }
        });

      }
    });
});

module.exports = questionRoutes;