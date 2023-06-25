// import DateCounter from "./DateCounter";

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
      return { ...state, currQuestion: state.currQuestion++, answer: null };
    case "prevQuestion":
      console.log("here");
      return { ...state, currQuestion: state.currQuestion-- };
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

export default function App() {
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

  useEffect(function () {
    async function getData() {
      try {
        // dispatch({ type: "loading" });
        // const res = await fetch("http://localhost:8000/questions");
        const res = await fetch(
          "http://localhost:9999/.netlify/functions/data-json"
        );
        if (!res.ok) throw new Error("Something happened.");
        const data = await res.json();
        if (!data) throw new Error("No data.");
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "dataFailed", payload: err.message });
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error msg={errorMsg} />}
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
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
            {console.log(wrongQuestionIndex)}
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
                  {currQuestion + 1 === questions.length ? "Finish" : "Next"}
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
                    {currQuestion + 1 === questions.length ? "Finish" : "Next"}
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
  );
}
