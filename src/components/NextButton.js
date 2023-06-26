function NextButton({ dispatch, children, userName = "" }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: children === "Next" ? "nextQuestion" : "finish",
          payload: userName,
        })
      }
    >
      {children}
    </button>
  );
}

export default NextButton;
