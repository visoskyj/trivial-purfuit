import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

const NewQuestionCard = ({handleClose}) => {
  const [question, setQuestion] = React.useState('');
  const [correctAnswer, setCorrectAnswer] = React.useState('1');
  const [questionCategory, setQuestionCategory] = React.useState('People');
  const [answers, setAnswers] = React.useState(['', '', '', '']);
  const [answerChanged, setAnswerChanged] = React.useState(true);

  const setNewQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleQuestionCategoryChange = (e) => {
    setQuestionCategory(e.target.value);
  };

  const handleAddNewQuestion = () => {
    //TODO: VALIDATE ALL FIELDS
    let newQuestion = {question: question, answers: answers, correctAnswer: correctAnswer, category: questionCategory};
    //TODO: SAVE QUESTION
    console.log('Saving Question ', newQuestion);
    handleClose();
  };

  const handleAnswerChange = (e, index) => {
    answers[index] = e.target.value;
    setAnswers(answers);
    setAnswerChanged(!answerChanged);
  };

  return (
      <div>
        <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please populate all fields:
          </DialogContentText>
          <TextField
              id="filled-multiline-static"
              multiline
              style={{ width: "100%" }}
              value={question}
              label="Question"
              rows={1}
              variant="filled"
              onChange={setNewQuestion}
              fullWidth
              type="text"
              margin="dense"
          />
          <Box display="flex" justifyContent={"space-between"}>
            { answerChanged !== null &&
            answers.map((answer, index) => {
              return (
                  <TextField
                      id={'question option ' + index}
                      variant="filled"
                      value={answer}
                      label={"Answer " + (index+1)}
                      style={{ margin: "0 4px" }}
                      key={index}
                      onChange={(e) => handleAnswerChange(e, index)}
                  />
              );
            })
            }
          </Box>
          <Box display="flex" >
            <DialogContentText >
              Correct Answer:
            </DialogContentText>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={correctAnswer}
                label="Correct Answer"
                onChange={handleCorrectAnswerChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </Box>
          <Box display="flex" >
            <DialogContentText>
              Category:
            </DialogContentText>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={questionCategory}
                label="Correct Answer"
                onChange={handleQuestionCategoryChange}
            >
              <MenuItem value={'People'}>People</MenuItem>
              <MenuItem value={'Event'}>Event</MenuItem>
              <MenuItem value={'Places'}>Places</MenuItem>
              <MenuItem value={'Holiday'}>Holiday</MenuItem>
            </Select>
          </Box>


        </DialogContent>
        <DialogActions>
          <Button
              variant={"contained"}
              color={"primary"}
              className={"local-button local-button--primary"}
              onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
              variant={"contained"}
              color={"primary"}
              className={"local-button local-button--primary"}
              onClick={handleAddNewQuestion}
          >
            Add
          </Button>
        </DialogActions>
      </div>
  );
}

export default NewQuestionCard;