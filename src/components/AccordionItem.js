export default function Item({ num, title, children, onOpen, curOpen }) {
  const isOpen = num === curOpen;

  return (
    <div onClick={() => onOpen(num)} className={`item ${isOpen ? "open" : ""}`}>
      <p className="number"></p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
