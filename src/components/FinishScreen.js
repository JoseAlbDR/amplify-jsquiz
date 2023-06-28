import { getUser } from "../script/userQueries";
import { useEffect } from "react";
function FinishScreen({
  score,
  maxScore,
  dispatch,
  highScore,
  failedQuestions,
  user,
  loadingUser,
}) {
  useEffect(
    function () {
      async function loadUser() {
        try {
          dispatch({ type: "loadingUser", payload: true });
          const currentUser = await getUser(user);
          setTimeout(function () {
            dispatch({ type: "loadUser", payload: currentUser });
          }, 1000);
          setTimeout(function () {
            dispatch({ type: "loadingUser", payload: false });
          }, 1500);
          // dispatch({ type: "loadingUser", payload: false });
        } catch (err) {
          console.log(err);
        }
      }
      loadUser();
    },
    [user, dispatch]
  );

  const percentaje = (score / maxScore) * 100;
  let emoji;

  if (percentaje === 100) emoji = "⭐";
  if (percentaje < 100 && percentaje >= 80) emoji = "💪";
  if (percentaje < 80 && percentaje >= 60) emoji = "🎉";
  if (percentaje < 60 && percentaje >= 40) emoji = "👍";
  if (percentaje < 40 && percentaje >= 20) emoji = "👌";
  if (percentaje < 20 && percentaje >= 0) emoji = "🤦‍♂️";
  if (percentaje === 0) emoji = "🤢";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        Your score <strong>{score}</strong> out of {maxScore} (
        {Math.ceil(percentaje)}%)
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
      <div className="finish-buttons">
        {/* Review Button */}
        <button
          disabled={failedQuestions.length === 0}
          className="btn"
          onClick={() => dispatch({ type: "review" })}
        >
          Review Answers
        </button>
        {/* Restart Button */}
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Reset Quiz
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
