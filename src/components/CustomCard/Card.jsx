import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Container, CardActions } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import QuestionsApi from "../../api/QuestionsApi";
import useInput from '../../utils/useInput';

const CustomCard = ({question}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [localQuestion, setLocalQuestion] = useState(null);

  useEffect(() => {
    setLocalQuestion(question.question);
  }, [])

  const handleQuestionChange = (e) => {
    setLocalQuestion(e.target.value)
  }

  const handleAnswerChange = (e, i) => {
    console.log(e.target.value);
  }

  const handleEdit = (e) => {
    isEditMode ? handlePutRequest() : setEditMode(true)
  };

  const handlePutRequest = () => {
    // asserts values have changed
    if (localQuestion !== question.question) {
      const updatedQuestion = question;
      updatedQuestion.question = localQuestion;
      // executes put request
      QuestionsApi.updateQuestion(question._id, updatedQuestion).then(res => {
        console.log(res)
      });
    }

    // toggles edit mode to false
    setEditMode(false);
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
          {question.answers.map((answ, index) => {
            if (isEditMode) {
              return (
                <TextField
                  id={`${question.id}-${answ}`}
                  variant="filled"
                  value={answ}
                  style={{ margin: "0 4px" }}
                  key={answ}
                  onChange={(e) => handleAnswerChange(e, index)}
                />
              );
            } else {
              return (
                <Typography variant="body1" component="p" key={answ}>
                  {answ}
                </Typography>
              );
            }
          })}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant={"contained"}
          color={"primary"}
          className={"local-button local-button--primary"}
          onClick={() => handleEdit(!isEditMode)}
        >
          {!isEditMode ? "Edit" : "Save"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default CustomCard;