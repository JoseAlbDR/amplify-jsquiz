function Stadistics({ userData }) {
  // console.log(userData);
  return (
    <div>
      <p className="stadistics">
        Total questions anwered <strong>{userData.total}</strong>, total correct{" "}
        <strong>{userData.correct}</strong>, total incorrect{" "}
        <strong>{userData.wrong}</strong>, MaxScore{" "}
        <strong>{userData.maxScore}</strong>
      </p>
    </div>
  );
}

export default Stadistics;
