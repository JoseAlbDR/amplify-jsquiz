function Stadistics({ userData }) {
  // console.log(userData);
  const correctPercentage = Math.round(
    (userData.correct / userData.total) * 100,
    2
  );
  const incorrectPercentage = Math.round(
    (userData.wrong / userData.total) * 100,
    2
  );

  return (
    <div>
      <p className="stadistics">
        Total questions anwered <strong>{userData.total}</strong>, total correct{" "}
        <strong>
          {userData.correct}({correctPercentage}%)
        </strong>
        , total incorrect{" "}
        <strong>
          {userData.wrong}({incorrectPercentage}%)
        </strong>
        , HighScore <strong>{userData.maxScore}</strong>
      </p>
    </div>
  );
}

export default Stadistics;
