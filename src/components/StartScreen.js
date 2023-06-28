import SelectOption from "./SelectOption";
import { getUser } from "../script/userQueries";
import { useEffect } from "react";

function StartScreen({ numQuestions, dispatch, user, userData }) {
  useEffect(
    function () {
      async function loadUser() {
        try {
          dispatch({ type: "loadingUser", payload: true });
          const currentUser = await getUser(user);
          dispatch({ type: "loadUser", payload: currentUser });
          dispatch({ type: "loadingUser", payload: false });
        } catch (err) {
          console.log(err);
        }
      }
      loadUser();
    },
    [user, dispatch]
  );

  return (
    <div className="start">
      <h2 className="center">Welcome to The JavaScript QUIZ!</h2>
      <h3 className="center">
        {numQuestions} question to test your JavaScript knowledge
      </h3>
      <div className="start-options">
        <SelectOption
          dispatch={dispatch}
          label="Num Questions"
          type="setQuestions"
          options={[
            {
              name: "10",
              value: 10,
            },
            {
              name: "20",
              value: 20,
            },
            {
              name: "30",
              value: 30,
            },
          ]}
        />
        <SelectOption
          dispatch={dispatch}
          label="Difficulty"
          type="setDifficulty"
          options={[
            {
              name: "Easy",
              value: 60,
            },
            {
              name: "Normal",
              value: 45,
            },
            {
              name: "Hard",
              value: 30,
            },
          ]}
        />
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start!!!
      </button>
    </div>
  );
}

export default StartScreen;
