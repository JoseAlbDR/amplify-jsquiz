import Item from "./AccordionItem";

// Show/Hide Answer Accordion Component
export default function Accordion({ data, curOpen, dispatch }) {
  function handleIsOpen(num) {
    dispatch({ type: "openAccordion", payload: num });
  }

  return (
    <div className="accordion">
      {data.map((el, index) => (
        <Item
          key={index}
          num={index}
          title={el.title}
          onOpen={handleIsOpen}
          curOpen={curOpen}
        >
          <pre>
            <code className="code">{el.text}</code>
          </pre>
        </Item>
      ))}
    </div>
  );
}
