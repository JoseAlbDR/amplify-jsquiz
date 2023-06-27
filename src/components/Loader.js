export default function Loader({ msg }) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>{msg}</p>
    </div>
  );
}
