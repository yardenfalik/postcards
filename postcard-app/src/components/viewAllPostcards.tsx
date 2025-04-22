import "./components-css/viewAllPostcards.css";
import { useState, useMemo } from "react";
import { Postcard, PostcardProps } from "./Postcard";
import { ExpandedPostcard } from "./ExpandedPostcard";

type ViewAllPostcardsProps = {
    postcards: PostcardProps[];
    specialCss?: string;
};

function getRandomDegree() {
    return Math.floor(Math.random() * 21) - 10;
}

export function ViewAllPostcards({ postcards, specialCss }: ViewAllPostcardsProps) {
  const rotations = useMemo(() => {
    return postcards.map(() => getRandomDegree());
  }, [postcards]);

  const [expandedPostcard, setExpandedPostcard] = useState<PostcardProps | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [animate, setAnimate] = useState(false);

  const selectPostcard = (postcard: PostcardProps, rect: DOMRect, rotation: number) => {
      setExpandedPostcard({...postcard, rotation});
      setOriginRect(rect);
      setAnimate(false);

      setTimeout(() => {
          setAnimate(true);
      }, 50);
  };

  const closeExpanded = () => {
      setAnimate(false);
    
      setTimeout(() => {
        setExpandedPostcard(null);
        setOriginRect(null);
      }, 1000);
    };

  return (
    <>
      <div className={`postcards-display ${specialCss}`}>
          {postcards.length != 0 ? postcards.map((postcard, index) => (
            <div key={index} className="postcard-view-all" style={{
              transform: `rotate(${rotations[index]}deg)`}}>
              {!animate && !(expandedPostcard?.postcardIndex == index + 1) ? <Postcard key={index} {...postcard} rotation={rotations[index]} onSelect={selectPostcard} isFlippable={false} /> : null}
            </div>
          )) : <p className="no-postcards">No postcards yet</p>}
      </div>
      {expandedPostcard && originRect ? <ExpandedPostcard postcard={expandedPostcard} originRect={originRect} animate={animate} onClose={closeExpanded} /> : null}
    </>
  );
}