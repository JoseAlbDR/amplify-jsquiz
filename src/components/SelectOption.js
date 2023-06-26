function SelectOption({ label, type, options, dispatch }) {
  return (
    <div>
      <div>
        <h4>{label}:</h4>
        <select
          className="btn"
          style={{ textAlign: "center" }}
          onChange={(e) => dispatch({ type: type, payload: e.target.value })}
        >
          {options.map((option) => (
            <option key={option.name} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectOption;
