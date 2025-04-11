import "./components-css/viewAllPostcards.css";
import { useState } from "react";
import { Postcard, PostcardProps } from "./Postcard";

type ViewAllPostcardsProps = {
    postcards: PostcardProps[];
};

export function ViewAllPostcards({ postcards }: ViewAllPostcardsProps) {
    const [activePostcardIndex, setActivePostcardIndex] = useState<number | null>(null);

  return (
    <div className="postcards-display">
        {postcards.map((postcard, index) => (
        <Postcard key={index} {...postcard} specialCss={activePostcardIndex === index ? "active-postcard" : "postcard-view-all"} onSelect={() => setActivePostcardIndex(index)} />
        ))}
    </div>
  );
}