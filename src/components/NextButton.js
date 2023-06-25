function NextButton({ dispatch, children }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: children === "Next" ? "nextQuestion" : "finish" })
      }
    >
      {children}
    </button>
  );
}

export default NextButton;
