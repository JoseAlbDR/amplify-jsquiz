function Progress({
  currQuestion,
  numQuestions,
  score,
  maxScore,
  answer,
  reviewQuestions,
}) {
  return (
    <div className="progress">
      <progress
        max={numQuestions}
        value={
          reviewQuestions ? currQuestion + +(answer !== null) : currQuestion + 1
        }
      ></progress>
      <p>
        Question <strong>{currQuestion + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{score}</strong>
        {!reviewQuestions && ` /${maxScore}`} points
      </p>
    </div>
  );
}

export default Progress;
