import { useState } from "react";
import Item from "./Item";

export default function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  function handleIsOpen(num) {
    curOpen === num ? setCurOpen(null) : setCurOpen(num);
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
          {el.text}
        </Item>
      ))}
    </div>
  );
}