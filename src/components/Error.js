function Error({ msg }) {
  return (
    <p className="error">
      <span>💥</span> {msg || "There was an error fecthing questions."}
    </p>
  );
}

export default Error;
