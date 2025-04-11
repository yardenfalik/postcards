import "./components-css/postcard.css";
import { useState } from "react";

export type PostcardProps = {
    imageUrl: string; 
    title: string;
    description: string;
    date: string;
    location: string;
    postcardIndex?: number;
};

export type PostcardComponentProps = {
    onSelect: (key: number) => void;
    specialCss?: string;
};

export type FullPostcardProps = PostcardProps & PostcardComponentProps;

export function Postcard({ imageUrl, title, description, date, location, postcardIndex, onSelect, specialCss }: FullPostcardProps) {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
    setFlipped(!flipped);
    onSelect(postcardIndex? postcardIndex : 0);
    };

  return (
    <div className={"postcard-container " + specialCss} onClick={handleClick}>
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