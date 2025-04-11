import "./components-css/postcardsCalendar.css";
import { useState } from "react";
import { Postcard, PostcardProps } from "./Postcard";

type PostcardsCalendarProps = {
    postcards: PostcardProps[];
    specialCss?: string;
};

export function PostcardsCalendar({ postcards, specialCss }: PostcardsCalendarProps) {
    const currentDate = new Date();

    function daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }

    const numberOfDays = daysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());

    const isSameDay = (date1: Date, date2: Date) => {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    };
    
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
            <div className={"calendar " + specialCss}>
                {Array.from({ length: numberOfDays }, (_, index) => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
                    const postcardForDate = postcards.find(postcard => isSameDay(new Date(postcard.date), date));
                    return (
                        <div key={index} className="day">
                                {postcardForDate && !expandedPostcard ?  <Postcard key={index} {...postcardForDate} onSelect={selectPostcard} specialCss={"calendar-postcard"} isFlippable={false} /> : <p key={index}><strong>{index + 1}</strong></p>}
                        </div>
                    );
                })}
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