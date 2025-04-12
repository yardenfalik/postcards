import { Postcard, PostcardProps } from "./Postcard";

type ExpandedPostcardProps = {
  postcard: PostcardProps;
  originRect: DOMRect;
  animate: boolean;
  onClose: () => void;
};

export function ExpandedPostcard({ postcard, originRect, animate, onClose }: ExpandedPostcardProps) {

  return (
    <>
      <div className="overlay" style={{ opacity: animate ? "1" : "0" }} onClick={onClose} />
      <div
        className="expanded-postcard"
        style={{
          position: "fixed",
          top: animate ? "50%" : originRect.top,
          left: animate ? "50%" : originRect.left,
          width: animate ? "95%" : originRect.width,
          transform: animate ? "translate(-50%, -50%) rotate(0deg)" : "rotate(10deg)",
        }}
      >
        <Postcard {...postcard} onSelect={() => {}} isFlippable={true} />
        <div
          className="postcard-calendar-controls"
          style={{
            visibility: animate ? "visible" : "hidden",
          }}
        >
          <a onClick={onClose}>Close</a>
          <a onClick={onClose}>Edit</a>
        </div>
      </div>
    </>
  );
}
