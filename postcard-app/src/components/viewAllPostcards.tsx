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

  const selectPostcard = (postcard: PostcardProps, rect: DOMRect) => {
      setExpandedPostcard(postcard);
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

    const [isColapsed, setIsCollapsed] = useState(true);
    const handleExpend = () => {
      setIsCollapsed(false);
    };

  return (
    <>
      <div className={isColapsed ?  "postcards-display-collapsed " + specialCss : "postcards-display " + specialCss} onClick={handleExpend}>
          {postcards.length != 0 ? postcards.map((postcard, index) => (
            <div className={isColapsed ? "postcard-view-all-collapsed" : "postcard-view-all"} style={{
              transform: `rotate(${rotations[index]}deg)`,
              transition: "transform 0.3s ease",
            }}>
              <Postcard key={index} {...postcard} onSelect={selectPostcard} isFlippable={false} />
            </div>
          )) : <p className="no-postcards">No postcards yet</p>}
      </div>
      {expandedPostcard && originRect && !isColapsed ? <ExpandedPostcard postcard={expandedPostcard} originRect={originRect} animate={animate} onClose={closeExpanded} /> : null}
    </>
  );
}