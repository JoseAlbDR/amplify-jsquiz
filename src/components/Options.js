function Options({
  options,
  dispatch,
  answer,
  correctOption,
  reviewQuestions,
  wrongQuestionIndex,
}) {
  function handleAnswer(i) {
    dispatch({ type: "newAnswer", payload: i });
  }
  const answered = answer !== null;

  // Show Question options based on reviewQuestions state and answered variable
  return (
    <div className="options">
      {options.map((option, i) => (
        <button
          key={option}
          className={`btn btn-option
          ${i === answer ? "answer" : ""}
          ${i === wrongQuestionIndex ? "answer" : ""}
          
          ${
            reviewQuestions || answered
              ? i === correctOption
                ? "correct"
                : "wrong"
              : ""
          }
          ${i === wrongQuestionIndex ? "review-wrong" : ""}`}
          onClick={() => handleAnswer(i)}
          disabled={reviewQuestions || answered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
