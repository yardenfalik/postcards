import "./components-css/postcard.css";
import {  useRef, useState } from "react";

export type PostcardProps = {
    imageUrl: string; 
    title: string;
    description: string;
    date: string;
    location: string;
    postcardIndex?: number;
    rotation?: number;
};

export type PostcardComponentProps = {
    onSelect: (postcard: PostcardProps, rect: DOMRect, rotation: number) => void;
    specialCss?: string;
    isFlippable?: boolean;
};

export type FullPostcardProps = PostcardProps & PostcardComponentProps;

export function Postcard({ imageUrl, title, description, date, location, postcardIndex, onSelect, specialCss, isFlippable, rotation }: FullPostcardProps) {
    const postcardRef = useRef<HTMLDivElement>(null);
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        isFlippable ? setFlipped(!flipped) : setFlipped(false);
        if(postcardRef.current) {
            const rect = postcardRef.current.getBoundingClientRect();
            onSelect({ imageUrl, title, description, date, location, postcardIndex }, rect, rotation ?? 0);
        }
    };

  return (
    <div ref={postcardRef} className={"postcard-container " + specialCss} onClick={handleClick}>
        <div className={`postcard ${flipped ? "flipped" : ""}`}>
            <div className="postcard-front" id="postcard-front">
                <img src={imageUrl} alt="" />
            </div>
            <div className="postcard-back hidden" id="postcard-back">
                <div className="postcard-text">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <div className="postcard-details">
                    <p>{date}</p>
                    <p>📍 {location}</p>
                </div>
            </div>
        </div>
    </div>
  )
}