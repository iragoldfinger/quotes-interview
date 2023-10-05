import React, { useState, useEffect } from "react";
import "../App.css";

const RANDOM_QUOTE_API = "http://safetybelt.pythonanywhere.com/quotes/random";
const MAX_RETRIES = 5;

interface QuoteData {
    quote: string;
    author: string;
}

const QuoteComponent: React.FC = () => {
    const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);

    const fetchQuote = async (retries: number = MAX_RETRIES): Promise<void> => {
        setAnimationTrigger(true);
        try {
            const response = await fetch(RANDOM_QUOTE_API);
            if (!response.ok) throw new Error("Failed to fetch quote");
            const data: QuoteData = await response.json();
            setQuoteData(data);
            setError(null);
        } catch (err) {
            if (retries > 1) {
                fetchQuote(retries - 1);
            } else {
                setError("Failed to retrieve quote. Please try again.");
                setQuoteData(null);
            }
        }
    };

    const randomColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };

    useEffect(() => {
        const wipeEffect = document.querySelector(".wipe-effect") as HTMLElement;
        if (animationTrigger && wipeEffect) {
            const nextColor = randomColor();
            wipeEffect.style.opacity = "1";
            wipeEffect.style.transform =
                "translate(100%, 0) scale(100, 100) rotate(-45deg)";
            wipeEffect.style.backgroundColor = nextColor;

            const timer = setTimeout(() => {
                document.body.style.backgroundColor = nextColor;
                wipeEffect.style.opacity = "0";
                wipeEffect.style.transform = "translate(-20%, 120%) rotate(-45deg)";
                setAnimationTrigger(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [animationTrigger]);

    return (
        <>
            <div id="quoteCard">
                {quoteData && (
                    <div>
                        <p>{quoteData.quote}</p>
                        <p>- {quoteData.author}</p>
                    </div>
                )}
                <button onClick={() => fetchQuote()}>Get a quote!</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    );
};

export default QuoteComponent;
