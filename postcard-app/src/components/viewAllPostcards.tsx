import "./components-css/viewAllPostcards.css";
import { useState } from "react";
import { Postcard, PostcardProps } from "./Postcard";

type ViewAllPostcardsProps = {
    postcards: PostcardProps[];
    specialCss?: string;
};

function getRandomDegree() {
    return Math.floor(Math.random() * 21) - 10;
}

export function ViewAllPostcards({ postcards, specialCss }: ViewAllPostcardsProps) {

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

  return (
    <>
      <div className={"postcards-display " + specialCss}>
          {postcards.map((postcard, index) => (
            <div style={{
              transform: `rotate(${getRandomDegree()}deg)`,
              transition: "transform 0.3s ease",
              height: "100%",
              width: "100%",
            }}>
              <Postcard key={index} {...postcard} onSelect={selectPostcard} isFlippable={false} />
            </div>
          ))}
      </div>
      {expandedPostcard && originRect && (
                <>
                    <div className="overlay" style={{opacity: animate ? "1" : "0"}} onClick={closeExpanded} />
                    <div
                        className="expanded-postcard"
                        style={{
                            position: "fixed",
                            top: animate ? "50%" : originRect.top,
                            left: animate ? "50%" : originRect.left,
                            width: animate ? "95%" : originRect.width,
                            transform: animate ? "translate(-50%, -50%) rotate(0deg)" : "rotate(10deg)",
                        }}>
                        <Postcard {...expandedPostcard} onSelect={() => {}} isFlippable={true}/>
                        <div 
                        className="postcard-calendar-controls" 
                        style={{
                                visibility: animate ? "visible" : "hidden",
                            }}>
                            <a onClick={closeExpanded}>Close</a>
                            <a onClick={closeExpanded}>Edit</a>
                        </div>  
                    </div>
                </>
            )}
    </>
  );
}