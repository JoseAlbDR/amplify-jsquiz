import SelectOption from "./SelectOption";

function StartScreen({ numQuestions, dispatch }) {
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
              value: 45,
            },
            {
              name: "Normal",
              value: 30,
            },
            {
              name: "Hard",
              value: 15,
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
