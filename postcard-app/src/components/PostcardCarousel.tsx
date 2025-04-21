import "./components-css/postcardCarousel.css";
import { useEffect, useRef, useState } from "react";
import { PostcardProps, Postcard } from "./Postcard";

type PostcardCarouselProps = {
    postcards: PostcardProps[];
    initialIndex: number;
    onClose: () => void;
};

export function PostcardCarousel({postcards, initialIndex, onClose}: PostcardCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    
    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    const showNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % postcards.length);
    }

    const showPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + postcards.length) % postcards.length);
    }


    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    }

    const handleTouchEnd = () => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const distance = touchEndX.current - touchStartX.current;
            if (distance > 50) {
                showPrev();
            } else if (distance < -50) {
                showNext();
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    }

    return (
        <>
            <div className="postcard-carousel" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <div className="carousel-track"  style={{ "--index": currentIndex } as React.CSSProperties}>
                    {postcards.map((postcard, index) => (
                        <div key={index} className={`carousel-slide ${index === currentIndex ? "center" : "peek"}`}><Postcard {...postcard} onSelect={() => {}} isFlippable={true}></Postcard></div>
                    ))}
                </div>
                <a onClick={showNext} className="arrowRightBtn"></a>
                <a onClick={showPrev} className="arrowLeftBtn"></a>
            </div>
            <div className="postcard-carousel-controls">
                <a onClick={onClose}>Close</a>
                <a onClick={onClose}>Edit</a>
            </div>
        </>
    );
}