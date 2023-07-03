# OLD REPO NEW REPO AT [JS-QUIZ NEW REPO](https://github.com/JoseAlbDR/js-quiz)
## Quiz App

This is a quiz application built with React. It allows users to answer questions and tracks their scores. The application fetches questions from an API and presents them to the user in a randomized order. Users can choose the number of questions and the difficulty level of the quiz.

### Installation

To run the Quiz App locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd quiz-app`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit http://localhost:3000

### Dependencies

The Quiz App uses the following dependencies:

- React: A JavaScript library for building user interfaces.
- aws-amplify: A library for integrating AWS services with the application.
- @aws-amplify/ui-react: UI components provided by AWS Amplify for building the user interface.
- react-router-dom: A library for routing within a React application.

### File Structure

The main files and directories in the project are structured as follows:

- `src/components`: Contains all the reusable components used in the application.
- `src/aws-exports.js`: Configuration file for AWS Amplify.
- `src/graphql`: Contains GraphQL mutation and query definitions.
- `src/script`: Contains script files for handling authentication and user queries.
- `src/App.js`: Main component that renders the entire application.

### Usage

The Quiz App has the following features:

- User authentication with AWS Amplify.
- Fetching questions from an API using GraphQL.
- Start screen where the user can set the number of questions and difficulty level.
- Timer to track the remaining time for the quiz.
- Progress bar to show the current question number and score.
- Question component to display the current question and options.
- Buttons to navigate to the next/previous question.
- Finish screen to display the final score and allow the user to restart the quiz.
- Admin user functionality to add new questions.

- In the **APP**, you must create an account by providing a verification code sent to the email you entered in the form. Once logged in, it will display your username along with the options to **Logout** or **Delete** the user and your statistics.

- On the welcome screen, it will show the total number of questions currently in the **Database** (103 as of the time of this publication) and then give you the option to choose the number of questions you want to answer (10, 20, or 30) and the difficulty level, based on the time you have to answer each question (60s/question for **Easy**, 45s/question for **Normal**, 30s/question for **Hard**).

- Once you start the **Quiz**, currently, the only way to exit is to either finish it or click **Logout**. When you click on an answer, the **Next** button will appear to proceed to the next question, and you won't be able to change your answer. To save your statistics, you need to finish the quiz.

- On the **Completion** screen, after finishing a quiz, it will display the number of questions answered correctly and your score. On the same screen, you can click the **Review** button to go over the questions you answered incorrectly. In **Review** mode, it will show the incorrect and correct answers, and you can click **Answer** to see the explanation for the correct answer.


### Credits

The Quiz App is developed by J.Alberto Delgado.

Original idea from Jonas Schmedtmann
