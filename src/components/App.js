import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { createNote as createNoteMutation } from "../graphql/mutations";
import {
  Authenticator,
  Button,
  Heading,
  View,
  Card,
  Flex,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listNotes } from "../graphql/queries";
import PostQuestionForm from "./PostQuestionForm";
import { components, Theme } from "../script/Auth";

Amplify.configure(config);

// "loading", "error", "ready", "active", "finished"
const initialState = {
  questions: [],
  status: "loading",
  errorMsg: "",
  currQuestion: 0,
  answer: null,
  score: 0,
  highScore: 0,
  remainSeconds: null,
  numQuestions: 10,
  difficulty: 45,
  reviewQuestions: false,
  failedQuestions: [],
  wrongQuestionIndex: [],
  curOpen: null,
};

let initialQuestions;
let wrongQuestions;
let correctQuestions;

// useReducer reducer function
function reducer(state, action) {
  switch (action.type) {
    // fetch data
    case "dataRecieved":
      initialQuestions = action.payload;
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    // data failed error
    case "dataFailed":
      return { ...state, status: "error", errorMsg: action.payload };
    // start quiz
    case "start":
      const shufled = initialQuestions.slice().sort(() => 0.5 - Math.random());
      const selected = shufled.slice(0, state.numQuestions);
      return {
        ...state,
        status: "active",
        questions: selected,
        remainSeconds: state.numQuestions * state.difficulty,
      };
    // click on a question to answer it
    case "newAnswer":
      const question = state.questions.at(state.currQuestion);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
        failedQuestions:
          action.payload !== question.correctOption
            ? [...state.failedQuestions, question]
            : state.failedQuestions,
        wrongQuestionIndex:
          action.payload !== question.correctOption
            ? [...state.wrongQuestionIndex, action.payload]
            : state.wrongQuestionIndex,
      };
    // Next question button
    case "nextQuestion":
      return {
        ...state,
        currQuestion: state.currQuestion + 1,
        answer: null,
        curOpen: null,
      };
    // Previous question button
    case "prevQuestion":
      return { ...state, currQuestion: state.currQuestion - 1 };
    // Finish button
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    // Restart button
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: initialQuestions,
      };
    // timer
    case "tick":
      return {
        ...state,
        remainSeconds: state.remainSeconds - 1,
        status: state.remainSeconds === 0 ? "finished" : state.status,
      };
    // Options
    // Number of questions
    case "setQuestions":
      return { ...state, numQuestions: action.payload };
    // Difficulty (time per question)
    case "setDifficulty":
      return { ...state, difficulty: action.payload };
    // Review button
    case "review":
      return {
        ...state,
        reviewQuestions: true,
        currQuestion: 0,
        questions: state.failedQuestions,
        status: "review",
        answer: null,
      };
    // Open Answer accordion
    case "openAccordion":
      console.log(action.payload);
      console.log(state.curOpen);
      return {
        ...state,
        curOpen: state.curOpen === action.payload ? null : action.payload,
      };
    default:
      throw new Error("Unknow action.");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    errorMsg,
    currQuestion,
    answer,
    score,
    highScore,
    remainSeconds,
    reviewQuestions,
    failedQuestions,
    wrongQuestionIndex,
    curOpen,
  } = state;

  // MaxScore
  const maxScore = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  // AddQuestion to DB
  async function addQuestion(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      question: form.get("question"),
      code: form.get("code"),
      options: [
        form.get("option1"),
        form.get("option2"),
        form.get("option3"),
        form.get("option4"),
      ],
      correctOption: +form.get("correctOption"),
      points: 10,
      answer: form.get("answer"),
    };

    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });

    event.target.reset();
  }

  // Fetch data on first APP mount
  useEffect(function () {
    async function getData() {
      try {
        const apiData = await API.graphql({ query: listNotes });
        const notesFromAPI = apiData.data.listNotes.items;
        dispatch({ type: "dataRecieved", payload: notesFromAPI });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "dataFailed", payload: err.message });
      }
    }
    getData();
  }, []);

  return (
    // Authenticator
    <ThemeProvider theme={Theme()}>
      <Authenticator components={components}>
        {({ signOut, user }) => (
          <div className="app">
            <>
              <View className="App">
                <Flex>
                  <Card>
                    <Heading
                      level={1}
                      style={{ color: "white", marginBottom: "1rem" }}
                    >
                      Welcome {user.username}
                    </Heading>
                  </Card>
                  <Button className="sign-out-btn" onClick={signOut}>
                    Sign Out
                  </Button>
                </Flex>
              </View>
            </>
            <Header />
            <>
              {/* Add question Form for admin user */}
              {user.username === "admin" && (
                <PostQuestionForm addQuestion={addQuestion} />
              )}
            </>

            <Main>
              {/* Loading, Error, Ready, Status */}
              {status === "loading" && <Loader />}
              {status === "error" && <Error msg={errorMsg} />}
              {status === "ready" && (
                <StartScreen
                  numQuestions={questions.length}
                  dispatch={dispatch}
                />
              )}
              {/* Quiz Loop */}
              {status === "active" && (
                <>
                  <Progress
                    currQuestion={currQuestion}
                    numQuestions={questions.length}
                    score={score}
                    maxScore={maxScore}
                    answer={answer}
                    reviewQuestions={reviewQuestions}
                  />

                  <Question
                    currQuestion={questions[currQuestion]}
                    dispatch={dispatch}
                    answer={answer}
                    score={score}
                  />

                  <Footer>
                    <Timer seconds={remainSeconds} dispatch={dispatch} />
                    {answer !== null && (
                      <NextButton dispatch={dispatch}>
                        {currQuestion + 1 === questions.length
                          ? "Finish"
                          : "Next"}
                      </NextButton>
                    )}
                  </Footer>
                </>
              )}
              {/* Review Loop */}
              {status === "review" && (
                <>
                  <Progress
                    currQuestion={currQuestion}
                    numQuestions={questions.length}
                    score={score}
                    maxScore={maxScore}
                    answer={answer}
                  />

                  <Question
                    currQuestion={questions[currQuestion]}
                    dispatch={dispatch}
                    answer={answer}
                    score={score}
                    reviewQuestions={reviewQuestions}
                    wrongQuestionIndex={wrongQuestionIndex[currQuestion]}
                    curOpen={curOpen}
                  />

                  <Footer>
                    <div className="finish-buttons">
                      {currQuestion !== 0 ? (
                        <PrevButton dispatch={dispatch}>Previous</PrevButton>
                      ) : (
                        <button className="btn" disabled={true}>
                          Previous
                        </button>
                      )}
                      <NextButton dispatch={dispatch}>
                        {currQuestion + 1 === questions.length
                          ? "Finish"
                          : "Next"}
                      </NextButton>
                    </div>
                  </Footer>
                </>
              )}
              {/* Finish Screen */}
              {status === "finished" && (
                <FinishScreen
                  failedQuestions={failedQuestions}
                  score={score}
                  maxScore={maxScore}
                  dispatch={dispatch}
                  highScore={highScore}
                />
              )}
            </Main>
          </div>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
