import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Container, CardActions } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import QuestionsApi from "../../api/QuestionsApi";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";

const CustomCard = ({ question, resetQuestions }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [localQuestion, setLocalQuestion] = useState(null);
  const [localCorrectAnswer, setLocalCorrectAnswer] = useState(null);

  const [answers, setAnswers] = useState(
    JSON.parse(JSON.stringify(question.answers))
  );
  const [answerChanged, setAnswerChanged] = React.useState(true);

  useEffect(() => {
    setLocalQuestion(question.question);
    setLocalCorrectAnswer(question.correctAnswer);
  }, []);

  const handleQuestionChange = (e) => {
    setLocalQuestion(e.target.value);
  };

  const handleCorrectAnswerChange = (e, i) => {
    setLocalCorrectAnswer(e.target.value);
  };

  const handleEdit = (e) => {
    isEditMode ? handlePutRequest() : setEditMode(true);
  };

  const handleCancel = (e) => {
    setLocalQuestion(question.question);
    setAnswers(question.answers);
    setLocalCorrectAnswer(question.correctAnswer);
    setEditMode(false);
  };

  const handleAnswerChange = (e, index) => {
    answers[index] = e.target.value;
    setAnswers(answers);
    setAnswerChanged(!answerChanged);
  };

  const handlePutRequest = () => {
    console.log(JSON.stringify(answers), JSON.stringify(question.answers));
    // asserts values have changed
    if (
      localQuestion !== question.question ||
      JSON.stringify(answers) !== JSON.stringify(question.answers) ||
      localCorrectAnswer !== question.correctAnswer
    ) {
      const updatedQuestion = question;
      updatedQuestion.question = localQuestion;
      updatedQuestion.answers = answers;
      updatedQuestion.correctAnswer = localCorrectAnswer;
      // executes put request
      QuestionsApi.updateQuestion(question._id, updatedQuestion).then((res) =>
        console.log(res)
      );
    }

    // toggles edit mode to false
    setEditMode(false);
  };

  const handleDeleteQuestion = (question) => {
    QuestionsApi.deleteQuestion(question._id).then((res) => {
      alert(`You just removed a question`);
      resetQuestions();
    });
  };

  return (
    <Card className={""} style={{ margin: "16px 0" }}>
      <CardContent>
        <Box display="flex" justifyContent={"space-between"}>
          <Typography
            component="p"
            className={""}
            color="textSecondary"
            gutterBottom
          >
            Question
          </Typography>

          <div
            className={`card-category card-category--${question.category.toLowerCase()}`}
          >
            Category: {question.category}
          </div>
        </Box>
        {isEditMode && question !== null ? (
          <TextField
            id="filled-multiline-static"
            multiline
            style={{ width: "100%" }}
            value={localQuestion}
            rows={4}
            variant="filled"
            onChange={handleQuestionChange}
          />
        ) : (
          <Typography variant="body1" component="p">
            {localQuestion}
          </Typography>
        )}

        <Divider style={{ margin: "16px 0" }} />
        <Typography className={""} color="textSecondary" gutterBottom>
          Answers
        </Typography>
        <Box display="flex" justifyContent={"space-between"}>
          {isEditMode &&
            answers.map((ans, index) => {
              return (
                <TextField
                  id={`${question.id}-${ans}`}
                  variant="filled"
                  value={ans}
                  style={{ margin: "0 4px" }}
                  key={index}
                  onChange={(e) => handleAnswerChange(e, index)}
                />
              );
            })}

          {!isEditMode &&
            answers.map((ans, index) => {
              return (
                <Typography
                  variant="body1"
                  component="p"
                  key={`view-${ans}-${index}`}
                >
                  {ans}
                </Typography>
              );
            })}
        </Box>
        <Divider style={{ margin: "16px 0" }} />
        {isEditMode && question !== null ? (
            <FormControl variant="filled" style={{ margin: 1, minWidth: 200}}>
              <InputLabel id="correct-answer">Correct Answer</InputLabel>
              <Select
                  labelId="correct-answer"
                  id="demo-simple-select-helper"
                  value={localCorrectAnswer}
                  label="Correct Answer"
                  onChange={handleCorrectAnswerChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
        ) : (
            <React.Fragment>
            <Typography
                component="p"
                color="textSecondary"
                gutterBottom
            >
              Correct Answer
            </Typography>
          <Typography variant="body1" component="p">
            {localCorrectAnswer}
          </Typography>
            </React.Fragment>
        )}
      </CardContent>
      <div style={{ padding: "8px", height: "35px" }}>
        {isEditMode && (
          <Button
            variant="contained"
            color="secondary"
            className={"local-button "}
            onClick={() => handleDeleteQuestion(question)}
          >
            Delete
          </Button>
        )}
        <div style={{ float: "right" }}>
          {isEditMode && (
            <Button
              color={"primary"}
              className={"local-button "}
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
          )}{" "}
          <Button
            variant={"contained"}
            color={"primary"}
            className={"local-button local-button--primary"}
            onClick={() => handleEdit(!isEditMode)}
          >
            {!isEditMode ? "Edit" : "Save"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CustomCard;
