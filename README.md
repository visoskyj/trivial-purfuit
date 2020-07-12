# Trivial Purfuit #

This project is to create a computer game to test knowledge of the U.S. Declaration of Independence. 
The game play is very similar to the familiar board game, Trivial Pursuit® from Hasbro Games.

##Frontend

The frontend will start on port 3000.

###Start React Server
1. Install dependencies: `yarn install` (You may need to install yarn first using `npm install yarn`)
2. Start frontend server: `yarn start`.

##Backend

The backend will start on port 4000.

###Start Nodejs Server
1. Change directory to "backend": `cd backend`.
2. Install dependencies: `npm install`.
3. Open server.js, and enter the mongodb password in the `uri` constant (Replace "ENTER_PASSWORD")
4. Start backend server: `nodemon server`.

###APIs

####Questions
* Get list of questions
    * Type: GET
    * Path: localhost:4000/question/
* Add question
    * Type: POST
    * Path: localhost:4000/question/add
    * Payload: 
`{
     "question": "How are you?",
     "answers": ["Good", "Okay", "Bad"],
     "category": "People"
 }`

 * Update question using ID
     * Type: POST
     * Path: localhost:4000/question/*ENTER_ID*
     * Payload: 
 `{
      "question": "Which month is your birthday?",
      "answers": ["January", "February", "March", "April"],
      "category": "Events"
  }`
 