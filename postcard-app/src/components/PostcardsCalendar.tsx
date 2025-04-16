import "./components-css/postcardsCalendar.css";
import { useMemo, useState } from "react";
import { Postcard, PostcardProps } from "./Postcard";
import { ExpandedPostcard } from "./ExpandedPostcard";

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

    const [expandedPostcard, setExpandedPostcard] = useState<PostcardProps | null>(null);
    const [originRect, setOriginRect] = useState<DOMRect | null>(null);
    const [animate, setAnimate] = useState(false);

    const postcardsAndDates = useMemo(() => {
        return postcards.reduce((acc: { [date: string]: PostcardProps[] }, postcard) => {
            const date = new Date(postcard.date);
            const dateString = date.toISOString().split("T")[0];

            if (!acc[dateString]) {
                acc[dateString] = [];
            }
            acc[dateString].push(postcard);
            return acc;
        }, {});
    }, [postcards]);

    const selectPostcard = (postcard: PostcardProps, rect: DOMRect, rotation: number) => {
        const dateString = new Date(postcard.date).toISOString().split("T")[0];
        const allPostcardsForThatDate = postcardsAndDates[dateString];

        if(allPostcardsForThatDate.length === 1) {
            setExpandedPostcard({...postcard, rotation});
        } else {
            setExpandedPostcard({...postcard, rotation, allPostcardsForThatDate} as any);
        }        

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
                    const dateString = date.toISOString().split("T")[0];
                    return (
                        <div key={index} className="day">
                        {postcardsAndDates[dateString] && !expandedPostcard ? (
                            postcardsAndDates[dateString].map((postcard, i) => (
                            <Postcard
                                key={i}
                                {...postcard}
                                onSelect={selectPostcard}
                                specialCss="calendar-postcard"
                                isFlippable={false}
                            />
                            ))
                        ) : (
                            <p><strong>{index + 1}</strong></p>
                        )}
                        </div>

                    );
                })}
            </div>
            {expandedPostcard && originRect ? <ExpandedPostcard postcard={expandedPostcard} originRect={originRect} animate={animate} onClose={closeExpanded} /> : null}
        </>
    );
}