import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuestionsApi from "../../api/QuestionsApi";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Box, Container, CardActions } from "@material-ui/core";
import CustomCard from "../../components/CustomCard/Card";

const ConfigureGame = () => {
  const [localQuestions, setLocalQuestions] = useState([]);
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
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
  }, []);

  const toggleEdit = () => {
    setEditMode(!isEditMode)
  }
  
  
  const handleAddQuestion = () => {
    localQuestions;
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
          </Button>
          {' '}
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
      <Grid container spacing={3}>
        {localQuestions.map((ques, index) => {
          return (
            <Grid item xs={6} key={index}>
              <CustomCard question={ques} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ConfigureGame;
