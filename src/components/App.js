import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import { useEffect, useReducer, useState } from "react";
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
  useTheme,
  Image,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import { jsQuestions } from "../js/converter";
import { API } from "aws-amplify";
import { listNotes } from "../graphql/queries";
import PostQuestionForm from "./PostQuestionForm";

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
};

let initialQuestions;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      initialQuestions = action.payload;
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error", errorMsg: action.payload };
    case "start":
      const shufled = initialQuestions.slice().sort(() => 0.5 - Math.random());
      const selected = shufled.slice(0, state.numQuestions);
      return {
        ...state,
        status: "active",
        remainSeconds: state.questions.length * state.difficulty,
        questions: selected,
      };
    case "newAnswer":
      const question = state.questions.at(state.currQuestion);
      console.log(action.payload);
      return {
        ...state,
        answer: action.payload,
        score:
          // action.payload = selected index
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
    case "nextQuestion":
      console.log(state.currQuestion);
      return { ...state, currQuestion: state.currQuestion + 1, answer: null };
    case "prevQuestion":
      console.log("here");
      return { ...state, currQuestion: state.currQuestion - 1 };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: initialQuestions,
      };
    case "tick":
      return {
        ...state,
        remainSeconds: state.remainSeconds - 1,
        status: state.remainSeconds === 0 ? "finished" : state.status,
      };
    case "setQuestions":
      return { ...state, numQuestions: action.payload };
    case "setDifficulty":
      return { ...state, difficulty: action.payload };
    case "review":
      return {
        ...state,
        reviewQuestions: true,
        currQuestion: 0,
        questions: state.failedQuestions,
        status: "review",
        answer: null,
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
  } = state;
  const maxScore = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  async function createNote(event) {
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

  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image alt="Amplify logo" src="pngwing.com.png" />
        </View>
      );
    },
  };

  const { tokens } = useTheme();
  const theme = {
    name: "Dark",
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.neutral["90"].value,
          },
          secondary: {
            value: tokens.colors.neutral["100"].value,
          },
        },
        font: {
          interactive: {
            value: tokens.colors.white.value,
          },
        },
        brand: {
          primary: {
            10: tokens.colors.teal["100"],
            80: tokens.colors.teal["40"],
            90: tokens.colors.teal["20"],
            100: tokens.colors.teal["10"],
          },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: tokens.colors.white.value,
              },
            },
            _hover: {
              color: {
                value: tokens.colors.yellow["80"].value,
              },
            },
            _active: {
              color: {
                value: tokens.colors.white.value,
              },
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
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
              {user.username === "admin" && (
                <PostQuestionForm createNote={createNote} />
              )}
            </>

            <Main>
              {status === "loading" && <Loader />}
              {status === "error" && <Error msg={errorMsg} />}
              {status === "ready" && (
                <StartScreen
                  numQuestions={questions.length}
                  dispatch={dispatch}
                />
              )}
              {status === "active" && (
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
                  />
                  <Footer>
                    {
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
                    }
                  </Footer>
                </>
              )}
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
