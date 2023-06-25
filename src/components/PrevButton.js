function NextButton({ dispatch, children }) {
  return (
    <button className="btn" onClick={() => dispatch({ type: "prevQuestion" })}>
      {children}
    </button>
  );
}

export default NextButton;
