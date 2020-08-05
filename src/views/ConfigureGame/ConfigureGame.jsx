import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuestionsApi from "../../api/QuestionsApi";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Box, Container } from "@material-ui/core";
import CustomCard from "../../components/CustomCard/CustomCard";
import Dialog from "@material-ui/core/Dialog";
import NewQuestionCard from "../../components/CustomCard/NewQuestionCard";


const ConfigureGame = () => {
  const [localQuestions, setLocalQuestions] = useState([]);
  const [isEditMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getAllQuestions();
  }, []);

  const getAllQuestions = () => {
      QuestionsApi.getAllQuestions()
          .then((result) => {
              console.log(
                  "Gamelogic: Successfully fetched all questions: ",
                  result.data
              );
              setLocalQuestions(result.data);
          })
          .catch((error) => {
              console.warn(
                  "Gamelogic: Failed to fetch all questions with error ",
                  error.toString()
              );
          });
  };

  const toggleEdit = () => {
    setEditMode(!isEditMode)
  };

  const handleAddQuestion = () => {
      setOpen(true);
  };

    const handleClose = () => {
        setOpen(false);
    };

    return (
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          margin={"0  0 16px 0"}
        >
          <h3>Configure Game</h3>
          <div>
            <Button
              variant={"contained"}
              color={"primary"}
              className={"local-button local-button--primary"}
              onClick={() => handleAddQuestion(!isEditMode)}
            >
              Add Question
            </Button>{" "}
            <Link to={"/"}>
              <Button
                variant={"contained"}
                color={"primary"}
                className={"local-button local-button--primary"}
              >
                Home
              </Button>
            </Link>
          </div>
        </Box>
        <h4>People</h4>
        <Grid container spacing={3}>
          {localQuestions
            .filter((q) => q.category === "People")
            .map((ques, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <CustomCard
                    question={ques}
                    resetQuestions={getAllQuestions}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Divider style={{ margin: "16px 0" }} />
        <h4>Events</h4>
        <Grid container spacing={3}>
          {localQuestions
            .filter((q) => q.category === "Event")
            .map((ques, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <CustomCard
                    question={ques}
                    resetQuestions={getAllQuestions}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Divider style={{ margin: "16px 0" }} />
        <h4>Places</h4>
        <Grid container spacing={3}>
          {localQuestions
            .filter((q) => q.category === "Places")
            .map((ques, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <CustomCard
                    question={ques}
                    resetQuestions={getAllQuestions}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Divider style={{ margin: "16px 0" }} />
        <h4>Holidays</h4>
        <Grid container spacing={3}>
          {localQuestions
            .filter((q) => q.category === "Holiday")
            .map((ques, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <CustomCard
                    question={ques}
                    resetQuestions={getAllQuestions}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <NewQuestionCard
            handleClose={handleClose}
            getAllQuestions={getAllQuestions}
          />
        </Dialog>
      </Container>
    );
};

export default ConfigureGame;
