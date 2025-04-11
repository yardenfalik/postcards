import "./components-css/postcardsCalendar.css";
import { useState } from "react";
import { Postcard, PostcardProps } from "./Postcard";

type PostcardsCalendarProps = {
    postcards: PostcardProps[];
};

export function PostcardsCalendar({ postcards }: PostcardsCalendarProps) {
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
    const [selectedPostcardIndex, setSelectedPostcardIndex] = useState<number | null>(null);
    const selectPostcard = (index: number) => {
        setSelectedPostcardIndex(index);
    };

    return (
        <>
            
            <div className="calendar">
                {Array.from({ length: numberOfDays }, (_, index) => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
                    const postcardForDate = postcards.find(postcard => isSameDay(new Date(postcard.date), date));
                    return (
                        <div key={index} className="day">
                            {postcardForDate ?  <Postcard key={index} {...postcardForDate} onSelect={selectPostcard} specialCss={selectedPostcardIndex === postcardForDate.postcardIndex ? "active-postcard-calendar" : "calendar-postcard"} /> : <p key={index}><strong>{index + 1}</strong></p>}
                        </div>
                    );
                })}
            </div>
            {selectedPostcardIndex ? 
                <div className="controls">
                    <a onClick={() => setSelectedPostcardIndex(null)}>Close</a>
                    <a onClick={() => setSelectedPostcardIndex(null)}>Edit</a>
                </div>    
                : null}
        </>
    );
}